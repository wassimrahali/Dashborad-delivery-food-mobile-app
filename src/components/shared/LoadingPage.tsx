import LoadingSpinner from "./LoadingSpinner";

export default function LoadingPage() {
    return (
        <div className="h-[100vh] flex items-center justify-center w-full ">
            <LoadingSpinner className="w-9 h-9" />
        </div>
    );
}
