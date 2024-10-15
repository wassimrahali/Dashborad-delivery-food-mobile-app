import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
    onSaveClick?: () => void;
    onCancel?: () => void;
    className?: string;
    disabled?: boolean;
};
export default function SaveAndCancelBtns(props: Props) {
    return (
        <div className={cn("flex items-center gap-2", props.className)}>
            <>
                <Button
                    disabled={props.disabled}
                    onClick={props.onCancel}
                    variant={"outline"}
                    className="bg-neutral-200 h-[40px]">
                    Cancel
                </Button>
                <Button
                    disabled={props.disabled}
                    onClick={props.onSaveClick}
                    className="  h-[40px]">
                    Save changes
                </Button>
            </>
        </div>
    );
}
