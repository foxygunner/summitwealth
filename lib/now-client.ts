import axios from "axios";

import { env } from "@/env.mjs";

const nowPaymentClient = axios.create({
  baseURL: `https://api.nowpayments.io/v1`,
  timeout: 20000,
  withCredentials: true,
});

export const config = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": env.NOW_PAYMENT_API_KEY,
    "Access-Control-Allow-Origin": "*",
  },
  maxBodyLength: Infinity,
};

export default nowPaymentClient;
