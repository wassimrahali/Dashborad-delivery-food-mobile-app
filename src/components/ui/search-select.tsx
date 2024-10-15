import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
} from "@/components/ui/popover";
import { Command as CommandPrimitive } from "cmdk";
import { useEffect, useState } from "react";

type Props = {
    onSelectedValueChange: (params: { id: any; name: string } | null) => void;
    items: { id: any; name: string }[];
    isLoading?: boolean;
    emptyMessage?: string;
    placeholder?: string;
};

export function SearchSelect({
    onSelectedValueChange,
    items,
    isLoading,
    emptyMessage = "No elements.",
    placeholder = "Searching...",
}: Props) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [visibleItems, setVisibleItems] = useState(items);
    useEffect(() => {
        setVisibleItems(items);
    }, [items]);

    const reset = () => {
        onSelectedValueChange(null);
        setSearchValue("");
    };

    const onValueChange = (value: string) => {
        setSearchValue(value);
        if (value === "") {
            return setVisibleItems(items);
        }
        setVisibleItems(
            items.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.relatedTarget?.hasAttribute("cmdk-list")) {
            reset();
        }
    };

    const onSelectItem = (params: { name: string; id: any }) => {
        onSelectedValueChange(params);
        setSearchValue("");
        setVisibleItems(items);
        setOpen(false);
    };

    return (
        <div className="flex items-center">
            <Popover open={open} onOpenChange={setOpen}>
                <Command shouldFilter={false}>
                    <PopoverAnchor asChild>
                        <CommandPrimitive.Input
                            asChild
                            value={searchValue}
                            onValueChange={onValueChange}
                            onKeyDown={(e) => setOpen(e.key !== "Escape")}
                            onMouseDown={() =>
                                setOpen((open) => !!searchValue || !open)
                            }
                            onFocus={() => setOpen(true)}
                            onBlur={onInputBlur}>
                            <Input placeholder={placeholder} />
                        </CommandPrimitive.Input>
                    </PopoverAnchor>
                    {!open && (
                        <CommandList aria-hidden="true" className="hidden" />
                    )}
                    <PopoverContent
                        asChild
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onInteractOutside={(e) => {
                            if (
                                e.target instanceof Element &&
                                e.target.hasAttribute("cmdk-input")
                            ) {
                                e.preventDefault();
                            }
                        }}
                        className="w-[--radix-popover-trigger-width] p-0">
                        <CommandList>
                            {isLoading && (
                                <CommandPrimitive.Loading>
                                    <div className="p-1">loading...</div>
                                </CommandPrimitive.Loading>
                            )}
                            {visibleItems.length > 0 && !isLoading ? (
                                <CommandGroup>
                                    {visibleItems.map((option) => (
                                        <CommandItem
                                            key={option.id + option.name}
                                            value={option.id}
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            className="text-black  pl-3 hover:cursor-pointer opacity-80 font-medium"
                                            onSelect={(name) =>
                                                onSelectItem({
                                                    name,
                                                    id: option.id,
                                                })
                                            }>
                                            {option.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ) : null}
                            {!isLoading ? (
                                <CommandEmpty>
                                    {emptyMessage ?? "No items."}
                                </CommandEmpty>
                            ) : null}
                        </CommandList>
                    </PopoverContent>
                </Command>
            </Popover>
        </div>
    );
}
