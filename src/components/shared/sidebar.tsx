import React, { memo, useState } from "react";
import { ChevronDown, ChevronsRight, LogOutIcon } from "lucide-react";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-items";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type PossibleItems = (typeof SIDEBAR_ITEMS)[number]["title"];

export const Sidebar = (props: { selected?: PossibleItems }) => {
    const pathname = useLocation().pathname;
    const routesWithSidebar = [
        "/products",
        "/dashboard",
        "/categories",
        "/orders",
        "/drivers",
        "/settings",
    ];
    const isSidebarVisible = routesWithSidebar.some((item) =>
        pathname.toLowerCase().startsWith(item.toLowerCase())
    );
    if (!isSidebarVisible) {
        return null;
    }
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState(props.selected ?? "Dashboard");

    return (
        <motion.nav
            layout
            className="sticky top-0 h-screen shrink-0 border-r border-zinc-300/80 bg-white p-2"
            style={{
                width: open ? "225px" : "fit-content",
            }}>
            <TitleSection open={open} />

            <div className="space-y-1 mt-8">
                {SIDEBAR_ITEMS.map((item) => (
                    <Option
                        key={item.title}
                        link={item.link}
                        Icon={item.Icon}
                        title={item.title}
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                    />
                ))}
            </div>
            <Logout open={open} />
            <ToggleClose open={open} setOpen={setOpen} />
        </motion.nav>
    );
};

const Option = memo(
    ({
        Icon,
        title,
        selected,
        setSelected,
        open,
        notifs = undefined,
        link,
    }: any) => {
        const navigate = useNavigate();
        const handleClick = () => {
            setSelected(title);
            navigate(link);
        };

        return (
            <motion.button
                layout
                onClick={handleClick}
                className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                    selected === title
                        ? "bg-mainColor/30  text-zinc-700"
                        : "text-zinc-800 hover:bg-mainColor/10"
                }`}>
                <motion.div
                    layout
                    className="grid h-full w-10 place-content-center text-lg">
                    <Icon />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className={cn("text-sm font-medium", {
                            "font-bold": selected === title,
                        })}>
                        {title}
                    </motion.span>
                )}

                {notifs && open && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        style={{ y: "-50%" }}
                        transition={{ delay: 0.5 }}
                        className="absolute right-2 top-1/2 size-4 rounded bg-black text-xs text-white">
                        {notifs}
                    </motion.span>
                )}
            </motion.button>
        );
    }
);

const TitleSection = ({ open }: { open: boolean }) => {
    return (
        <div className="mb-3 border-b border-zinc-300/80 pb-3">
            <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-zinc-100">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}>
                            <span className="block text-xs font-semibold">
                                Foulen lfleni
                            </span>
                            <span className="block text-xs text-zinc-500">
                                Admin
                            </span>
                        </motion.div>
                    )}
                </div>
                {open && <ChevronDown className="mr-2 opacity-50" />}
            </div>
        </div>
    );
};

const Logo = () => {
    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md bg-mainColor">
            <svg
                width="24"
                height="auto"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-zinc-50">
                <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    stopColor="#000000"></path>
                <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    stopColor="#000000"></path>
            </svg>
        </motion.div>
    );
};

const ToggleClose = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <motion.button
            layout
            onClick={() => setOpen((pv) => !pv)}
            className="absolute bottom-0 left-0 right-0 border-t border-zinc-300/80 transition-colors hover:bg-mainColor/10">
            <div className="flex items-center p-2">
                <motion.div
                    layout
                    className="grid size-10 place-content-center text-lg">
                    <ChevronsRight
                        className={`transition-transform opacity-70 ${
                            open ? "rotate-180" : ""
                        }`}
                    />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ delay: 0.125 }}
                        viewport={{
                            once: true,
                        }}
                        className="text-xs font-medium">
                        Close
                    </motion.span>
                )}
            </div>
        </motion.button>
    );
};
const Logout = memo(({ open }: { open: boolean }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <motion.button
            layout
            onClick={handleClick}
            className={` flex h-14 w-full mt-auto absolute left-0 bottom-14 border-t pl-3 hover:bg-mainColor/10 items-center rounded-md transition-colors `}>
            <motion.div
                layout
                className="grid h-full w-10 place-content-center text-lg">
                <LogOutIcon className="w-6 scale-90 h-6" />
            </motion.div>
            {open && (
                <motion.span
                    layout
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className={cn("text-sm font-medium")}>
                    Logout
                </motion.span>
            )}
        </motion.button>
    );
});

Logout.displayName = "Logout";
