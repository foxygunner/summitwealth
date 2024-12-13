import { Inngest, EventSchemas } from "inngest";

import { siteConfig } from "@/config/site";
import { TelegramEventType } from "@/lib/validations/notifications";

type ConfirmInvestment = {
  data: {
    wait?: "20 mins" | "5 mins";
    invoiceId: string;
  };
};

type EndInvestment = {
  data: {
    investmentId: string;
  };
};

type UserCreated = {
  data: {
    userId: string;
  };
};

type ClaimInvestmentReward = {
  data: {
    withdrawTxId: string;
  };
};

type TelegramEvent = {
  data: {
    message: string;
    type: TelegramEventType;
  };
};

type Events = {
  "investment/payment.confirm": ConfirmInvestment;
  "investment/plan.end": EndInvestment;
  "notifications/telegram.send": TelegramEvent;
  "investment/plan.claim": ClaimInvestmentReward;
  "auth/user.created": UserCreated;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "summit-wealth",
  schemas: new EventSchemas().fromRecord<Events>(),
});
