import { formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { TransactionsPayload } from "@/lib/validations/transaction";
import { getStatusIcon } from "@/lib/utils/transactions";

export const columns: ColumnDef<TransactionsPayload>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status, type } = row.original;

      return (
        <Badge
          variant={
            status === "CONFIRMED"
              ? "success"
              : status === "PENDING"
              ? "warning"
              : "destructive"
          }
        >
          {getStatusIcon(status)} <span className="ml-2">{status}</span>
          {type === "DEPOSIT" && <span className="md:hidden">📥</span>}
          {type === "WITHDRAWAL" && <span className="md:hidden">📤</span>}
          {type === "CLAIM_REWARD" && <span className="md:hidden">🔄</span>}
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hidden md:flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { type } = row.original;
      return (
        <div className="hidden md:flex items-center">
          {type === "DEPOSIT" && <span className="mr-2">📥</span>}
          {type === "WITHDRAWAL" && <span className="mr-2">📤</span>}
          {type === "CLAIM_REWARD" && <span className="mr-2">🔄</span>}
          <span className="hidden md:inline">
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-[50px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4 hidden md:inline-block" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "investment.id",
    header: () => {
      return <div className="hidden md:inline-block">Investment</div>;
    },
    cell: ({ row }) => {
      const investmentName = row.original.investment.tranche.name;
      const investmentId = row.original.investmentId;
      return (
        <Link
          href={`/dashboard/investments/${investmentId}`}
          className="text-muted-foreground hover:underline hidden md:inline-block"
        >
          {investmentName}
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hidden md:flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return (
        <div className="hidden md:flex">
          {formatDistanceToNow(date, { addSuffix: true })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;
      const showPaymentLink =
        transaction.status === "PENDING" && transaction.type === "DEPOSIT";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
            >
              Copy transaction ID
            </DropdownMenuItem> */}
            <DropdownMenuItem className="md:hidden">
              <Link href={`/dashboard/investments/${transaction.investmentId}`}>
                View investment
              </Link>
            </DropdownMenuItem>
            {showPaymentLink && (
              <DropdownMenuItem>
                <Link
                  href={`https://nowpayments.io/payment/?iid=${transaction.txId}`}
                  target="_blank"
                >
                  Make Payment
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/transactions/${transaction.id}`}>
                View transaction details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
