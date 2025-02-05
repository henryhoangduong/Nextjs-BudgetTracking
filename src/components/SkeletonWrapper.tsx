import React, { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const SkeletonWrapper = ({
  children,
  loading,
  fullWidth = true,
}: {
  children: ReactNode;
  loading: boolean;
  fullWidth?: boolean;
}) => {
  if (!loading) return children;
  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-0">{children} </div>
    </Skeleton>
  );
};

export default SkeletonWrapper;
