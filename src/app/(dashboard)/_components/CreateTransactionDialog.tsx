"use client";
import React from "react";
import { TransactionType } from "@/lib/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  trigger: ReactNode;
  type: TransactionType;
}
import {useForm} from "react-hook-form"
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transactions";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";

function CreateTransactionDialog({ trigger, type }: Props) {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),

        }
    })
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Create a new
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500",
              )}
            >
              {type}
            </span>
            transaction
          </AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...form}>
                  <form className="space-y-4"></form>
              </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default CreateTransactionDialog;
