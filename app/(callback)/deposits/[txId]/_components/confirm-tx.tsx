"use client";

import { useEffect } from "react";

import { confirmTransaction } from "@/actions/transactions/confirm-transaction";

const ConfirmTx = ({ invoiceId }: { invoiceId: string }) => {
  useEffect(() => {
    const confirm = async () => {
      await confirmTransaction(invoiceId);
    };

    confirm();
  }, []);

  return <div></div>;
};

export default ConfirmTx;
