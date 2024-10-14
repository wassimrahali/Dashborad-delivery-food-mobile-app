import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    text: string;
};
export default function TopBar(props: Props) {
    return (
        <div className="pb-5 z-50 bg-white sticky border-b top-0 flex items-center px-10 gap-2 pt-5">
            <h1 className="text-2xl upp font-semibold">{props.text}</h1>
            {props.children}
        </div>
    );
}
