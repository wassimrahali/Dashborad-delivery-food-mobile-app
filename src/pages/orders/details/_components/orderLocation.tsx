import { MapPin } from "lucide-react";

type Props = {
    location: string;
    className?: string;
};

export default function OrderLocation({ location }: Props) {
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
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                    className="w-full h-full border-0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                        coordinates.lng - 0.01
                    },${coordinates.lat - 0.01},${coordinates.lng + 0.01},${
                        coordinates.lat + 0.01
                    }&layer=mapnik&marker=${coordinates.lat},${
                        coordinates.lng
                    }`}
                    title="Location Map"
                />
            </div>
        </>
    );
}
