import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";

export const userCreatedEvent = inngest.createFunction(
  { id: "new-user-created" },
  { event: "auth/user.created" },
  async ({ event, step }) => {
    const { userId } = event.data;

    // get user
    const createdUser = await step.run("get-created-user", async () => {
      return prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    });

    // return if no user
    if (!createdUser) {
      return { message: "Invalid User Id" };
    }

    // if referredBy field
    if (!!createdUser.referredById) {
      // get referrer
      const userReferrer = await step.run("get-user-referrer", async () => {
        return prisma.user.findUnique({
          where: {
            id: createdUser.referredById ?? "",
          },
        });
      });

      // if not found update user referredBy to null
      if (!userReferrer) {
        await step.run("update-referredById-to-null", async () => {
          return prisma.user.update({
            where: {
              id: createdUser.id,
            },
            data: { referredById: null },
          });
        });
      } else {
        // upsert referral table using referrer and user
        await step.run("upsert-referral-for-referrer-and-user", async () => {
          return prisma.referral.upsert({
            where: {
              referredId: createdUser.id,
              referrerId: userReferrer.id,
            },
            create: {
              referredId: createdUser.id,
              referrerId: userReferrer.id,
            },
            update: {},
          });
        });
      }
    }

    // send TG Admin message for new user
    const message = `<b>New User Registration</b>

<b>Name:</b> ${createdUser.name}
<b>Email:</b> ${createdUser.email}

A new user has registered on the platform. Please review their details and ensure they have a smooth onboarding experience.

Thank you for your attention!

`;

    await step.sendEvent("send-new-user-notification", {
      name: "notifications/telegram.send",
      data: { message, type: "DEV_MODE" },
    });
    // send welcome email to user

    // return

    return { message: `New user: ${createdUser.name} created!!!` };
  }
);
