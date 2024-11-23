import SaveAndCancelBtns from "@/components/shared/saveAndCancelBtns";
import useStore from "../store";
import { z } from "zod";
import toast from "react-hot-toast";
import { apiInstance } from "@/lib/axios";
import { useState } from "react";
import { wait } from "@/lib/utils";

export default function Buttons() {
    const data = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const handleSave = async () => {
        const payload = {
            name: data.name,
            phone: data.phone,
            salary: data.salary,
            password: data.password,
            
        };
        console.log("payload is ", payload);
        const { error, success } = DeliveryManSchema.safeParse(payload);
        error?.errors.forEach((err) =>
            toast.error(`${err.path.join(" / ")} ${err.message}`)
        );

        if (!success) {
            return;
        }

        toast.loading("Creating your product");
        setIsLoading(true);
        apiInstance
            .post("/auth/registerDileveryMan", payload)
            .then(() => {
                toast.dismiss();
                toast.success("deliveryman created successfully");
                data.reset();
                wait(100).then(() => window.location.reload());
            })
            .catch(() => {
                toast.dismiss();
                toast.error("Error while creating you deliveryman");
            })
            .finally(() => setIsLoading(false));
    };
    return (
        <SaveAndCancelBtns
            onSaveClick={handleSave}
            disabled={isLoading}
            className="ml-auto"
        />
    );
}

// Zod schema for product validation
const DeliveryManSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    password: z.string().min(1),
    salary: z.number().default(0),
    
});
