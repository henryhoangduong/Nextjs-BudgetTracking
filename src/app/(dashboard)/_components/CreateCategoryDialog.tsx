import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schema/categories";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionType } from "@/lib/types";
import { AlertDialog,AlertDialogTrigger,AlertDialogContent,AlertDialogTitle,AlertDialogHeader ,AlertDialogDescription} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
interface Props{
    type:TransactionType
}
const CreateCategoryDialog = ({type}:Props) => {
  const [open, setOpen] = useState(true);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {},
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create new
        </Button>
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>
                      Create <span className={cn(
                          "m-1",
                          type=="income"?"text-emerald-500":"text-red-500" 
                      )}>
                          {type}
                      </span>
                  </DialogTitle>
                  <DialogDescription>
                      Categories are used to group your transactions
                  </DialogDescription>
              </DialogHeader>
          </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
