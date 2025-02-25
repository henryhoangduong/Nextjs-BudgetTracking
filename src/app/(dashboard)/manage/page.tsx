"use client";

import { CurrencyComobox } from "@/components/CurrencyComobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Page = () => {
  return (
    <div className="">
      {/* HEADER */}
      <div className="bg-card border-b px-6">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold"> Manage</p>
            <p className="text-muted-foreground">
              {" "}
              Manage your account settings and categories
            </p>
          </div>
        </div>
      </div>
      {/* END HEADER */}
      <div className="container flex flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              {" "}
              Set your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComobox />
            <CategoryList type="income" />
            <CategoryList type="expense" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;

const CategoryList=({type}:{type:string}) => {
    return (
        <></>
    )
}