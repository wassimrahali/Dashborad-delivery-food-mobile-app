import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { useState } from "react";

type Props = {
    location: string;
    className?: string;
};

export default function OrderLocation({ location, className }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const isCoordinates = (loc: string): boolean => {
        const coordRegex = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/;
        return coordRegex.test(loc);
    };

    const parseCoordinates = (
        loc: string
    ): { lat: number; lng: number } | null => {
        if (!isCoordinates(loc)) return null;
        const [lat, lng] = loc
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
        return { lat, lng };
    };

    const coordinates = parseCoordinates(location);

    if (!coordinates) {
        return (
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black" />
                <span className="text-sm font-medium">{location}</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "mx-auto text-black hover:text-black hover:bg-black/10",
                                className
                            )}>
                            <MapPin className="w-4 h-4 mr-1" />
                            View Map
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Location Map</DialogTitle>
                        </DialogHeader>
                        <div className="h-96 bg-gray-100 rounded-lg overflow-hidden">
                            <iframe
                                className="w-full h-full border-0"
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                                    coordinates.lng - 0.01
                                },${coordinates.lat - 0.01},${
                                    coordinates.lng + 0.01
                                },${
                                    coordinates.lat + 0.01
                                }&layer=mapnik&marker=${coordinates.lat},${
                                    coordinates.lng
                                }`}
                                title="Location Map"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
