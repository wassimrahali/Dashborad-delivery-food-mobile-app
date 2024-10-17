"use client";
import { Trash2 } from "lucide-react";

import LoadingButton from "@/components/shared/LoadingButton";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { apiInstance } from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    id: number;
};

export default function DeleteProductBtn({ id }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        apiInstance
            .delete(`/products/${id}`)
            .then(() => {
                toast.success("Produit est supprimer");
                setIsOpen(false);
                setIsLoading(false);
            })
            .catch(() => toast.error("Produit non supprimer"));
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTrigger onClick={() => setIsOpen(true)}>
                <span className="w-8 hover:cursor-pointer hover:scale-105 active:scale-100 transition-transform text-white h-8  bg-red-500   items-center justify-center flex rounded-md">
                    <Trash2 className="scale-90 " />
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        T Etes-vous absolument sûr ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action ne peut pas être annulée. Cela sera
                        définitivement supprimer cette produit
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isLoading}
                        onClick={() => !isLoading && setIsOpen(false)}
                        className="font-semibold ">
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                        asChild
                        className="bg-red-500 text-sm font-semibold ">
                        <LoadingButton
                            onClick={handleConfirm}
                            isLoading={isLoading}>
                            Supprimer
                        </LoadingButton>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
