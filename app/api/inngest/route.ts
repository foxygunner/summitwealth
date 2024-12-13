import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import { confirmDeposit } from "@/inngest/functions/investment/payment";
import { telegramMessage } from "@/inngest/functions/notifications/telegram-message";
import { endInvestmentEvent } from "@/inngest/functions/investment/end";
import { claimInvestmentEvent } from "@/inngest/functions/investment/claim";
import { userCreatedEvent } from "@/inngest/functions/auth/user";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    confirmDeposit,
    telegramMessage,
    endInvestmentEvent,
    claimInvestmentEvent,
    userCreatedEvent,
  ],
});
