import {
    Home,
    Settings,
    ShoppingCart,
    Tags,
    Truck,
    Users2,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
    {
        Icon: Home,
        link: "/dashboard",
        title: "Dashboard",
    },
    {
        Icon: Truck,
        link: "/orders",
        title: "Orders",
        notifs: 3,
    },
    {
        Icon: ShoppingCart,
        link: "/products",
        title: "Products",
    },
    {
        Icon: Tags,
        link: "/categories",
        title: "Categories",
    },
    {
        Icon: Users2,
        link: "/drivers",
        title: "Drivers",
    },
    {
        Icon: Settings,
        link: "/settings",
        title: "Settings",
    },
] as const;
