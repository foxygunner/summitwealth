import { Prisma } from "@prisma/client";
import { AxiosResponse } from "axios";

export type TransactionsPayload = Prisma.TransactionGetPayload<{
  include: {
    investment: {
      select: { id: true; tranche: { select: { name: true } } };
    };
  };
}>;

export type NowInvoiceResponse = AxiosResponse<{
  id: string;
  order_id: string;
  order_description: string;
  price_amount: string;
  price_currency: string;
  pay_currency: null;
  ipn_callback_url: string;
  invoice_url: string;
  success_url: string;
  cancel_url: string;
  created_at: string;
  updated_at: string;
}>;

export type PaymentStatus =
  | "waiting"
  | "confirming"
  | "confirmed"
  | "sending"
  | "partially_paid"
  | "finished"
  | "failed"
  | "refunded"
  | "expired ";

export const paymentsConfirmedStatus: PaymentStatus[] = [
  "confirmed",
  "finished",
];
export const paymentsCancelledStatus: PaymentStatus[] = [
  "expired ",
  "failed",
  "refunded",
];

type NowPayment = {
  payment_id: number;
  invoice_id: number;
  payment_status: PaymentStatus;
  pay_address: string;
  payin_extra_id: null;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid: number;
  payment_extra_ids?: number[];
  pay_currency: string;
  order_id: null | string;
  order_description: null | string;
  purchase_id: number;
  outcome_amount: number;
  outcome_currency: string;
  payout_hash: string;
  payin_hash: string;
  created_at: string;
  updated_at: string;
  type: string;
  parent_payment_id?: number;
  origin_type?: string;
};

export type NowPaymentList = {
  data: NowPayment[];
  limit: number;
  page: number;
  pagesCount: number;
  total: number;
};
