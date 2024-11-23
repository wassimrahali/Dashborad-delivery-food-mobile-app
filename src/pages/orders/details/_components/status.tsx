import { cn } from "@/lib/utils";
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    PackageCheck,
    RotateCcw,
    Truck,
} from "lucide-react";

type Props = {
    status:
        | "NOT_VALIDATED"
        | "VALIDATED"
        | "READY"
        | "ON_ROAD"
        | "DELIVERED"
        | "RETURNED"
        | "PENDING";
};

export default function StatusComp({ status }: Props) {
    const statusConfig = {
        NOT_VALIDATED: {
            icon: AlertCircle,
            color: "text-red-500",
            bgColor: "bg-red-100",
            borderColor: "border-red-200",
            label: "Not Validated",
        },
        VALIDATED: {
            icon: CheckCircle2,
            color: "text-green-500",
            bgColor: "bg-green-100",
            borderColor: "border-green-200",
            label: "Validated",
        },
        READY: {
            icon: Clock,
            color: "text-blue-500",
            bgColor: "bg-blue-100",
            borderColor: "border-blue-200",
            label: "Ready",
        },
        ON_ROAD: {
            icon: Truck,
            color: "text-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            label: "On Road",
        },
        PENDING: {
            icon: Clock,
            color: "text-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            label: "Pending",
        },
        DELIVERED: {
            icon: PackageCheck,
            color: "text-emerald-500",
            bgColor: "bg-emerald-100",
            borderColor: "border-emerald-200",
            label: "Delivered",
        },
        RETURNED: {
            icon: RotateCcw,
            color: "text-gray-500",
            bgColor: "bg-gray-100",
            borderColor: "border-gray-200",
            label: "Returned",
        },
    };

    const config = statusConfig[status];
    if (!config) {
        return null;
    }
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-full border gap-2",
                config.bgColor,
                config.borderColor
            )}>
            <Icon className={cn("w-4 h-4", config.color)} />
            <span className={cn("text-sm font-semibold py-1", config.color)}>
                {config.label}
            </span>
        </div>
    );
}
