import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { apiInstance } from "@/lib/axios";
import {
    Calendar,
    DollarSign,
    MapPin,
    Package,
    Phone,
    Truck,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatusComp from "./_components/status";

enum Status {
    NOT_VALIDATED = "NOT_VALIDATED",
    VALIDATED = "VALIDATED",
    READY = "READY",
    ON_ROAD = "ON_ROAD",
    DELIVERED = "DELIVERED",
    RETURNED = "RETURNED",
}

export default function OrderDetails() {
    const params = useParams();
    const id = params.id;
    const [order, setOrder] = useState<Order>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiInstance
            .get(`/orders/${id}`)
            .then(({ data }) => {
                setOrder(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case Status.NOT_VALIDATED:
                return "bg-gray-100 text-gray-800";
            case Status.VALIDATED:
                return "bg-blue-100 text-blue-800";
            case Status.READY:
                return "bg-yellow-100 text-yellow-800";
            case Status.ON_ROAD:
                return "bg-purple-100 text-purple-800";
            case Status.DELIVERED:
                return "bg-green-100 text-green-800";
            case Status.RETURNED:
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case Status.NOT_VALIDATED:
                return "⏳";
            case Status.VALIDATED:
                return "✓";
            case Status.READY:
                return "📦";
            case Status.ON_ROAD:
                return "🚚";
            case Status.DELIVERED:
                return "✅";
            case Status.RETURNED:
                return "↩️";
            default:
                return "•";
        }
    };

    return (
        <main className="flex">
            <div className="w-full">
                <TopBar text="Order Details" />
                <section className="p-10 w-full">
                    <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">
                                    Order #{order.id}
                                </h1>
                                <StatusComp status={order.status as any} />
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                                {order.totalPrice} DT
                            </div>
                        </div>
                        {/* Status Timeline */}
                        <div className="mb-8">
                            <div className="grid grid-cols-6   w-full">
                                {Object.values(Status).map(
                                    (status: any, index) => (
                                        <div
                                            key={status}
                                            className="flex flex-col font-semibold items-center flex-1">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                                                    Object.values(
                                                        Status
                                                    ).indexOf(
                                                        order.status as any
                                                    ) >= index
                                                        ? getStatusColor(status)
                                                        : "bg-gray-100 text-gray-400"
                                                }`}>
                                                {getStatusIcon(status)}
                                            </div>
                                            <div className="text-xs text-center">
                                                {status.replace(/_/g, " ")}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="relative mt-2">
                                <div className="absolute h-1 bg-gray-200 w-full top-0"></div>
                                <div
                                    className="absolute h-1 bg-blue-500 top-0 transition-all duration-500"
                                    style={{
                                        width: `${
                                            (Object.values(Status).indexOf(
                                                order.status as any
                                            ) /
                                                (Object.values(Status).length -
                                                    1)) *
                                            100
                                        }%`,
                                    }}></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Customer Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">
                                    Customer Details
                                </h2>
                                <InfoCard
                                    icon={<User className="text-blue-500" />}
                                    title="Name"
                                    value={order.customer.name}
                                />
                                <InfoCard
                                    icon={<Phone className="text-blue-500" />}
                                    title="Phone"
                                    value={order.customer.phone}
                                />
                                <InfoCard
                                    icon={<MapPin className="text-blue-500" />}
                                    title="Delivery Location"
                                    value={order.location}
                                />
                            </div>

                            {/* Delivery Man Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">
                                    Delivery Details
                                </h2>
                                {order.deliveryMan ? (
                                    <>
                                        <InfoCard
                                            icon={
                                                <Truck className="text-green-500" />
                                            }
                                            title="Delivery Person"
                                            value={order.deliveryMan.name}
                                        />
                                        <InfoCard
                                            icon={
                                                <Phone className="text-green-500" />
                                            }
                                            title="Contact"
                                            value={order.deliveryMan.phone}
                                        />
                                    </>
                                ) : (
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <p className="text-yellow-700">
                                            No delivery person assigned yet
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* Order Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">
                                    Order Information
                                </h2>
                                <InfoCard
                                    icon={
                                        <Calendar className="text-purple-500" />
                                    }
                                    title="Order Date"
                                    value={new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                />
                                <InfoCard
                                    icon={
                                        <Package className="text-purple-500" />
                                    }
                                    title="Total Items"
                                    value={order.orderItems.length.toString()}
                                />
                                <InfoCard
                                    icon={
                                        <DollarSign className="text-purple-500" />
                                    }
                                    title="Total Amount"
                                    value={`$${order.totalPrice}`}
                                />
                            </div>
                        </div>
                        {/* Order Items */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Order Items
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 text-left">
                                                Product
                                            </th>
                                            <th className="py-3 px-4 text-center">
                                                Price
                                            </th>
                                            <th className="py-3 px-4 text-center">
                                                Quantity
                                            </th>
                                            <th className="py-3 px-4 text-center">
                                                Subtotal
                                            </th>
                                            <th className="py-3 px-4 text-center">
                                                Preparation Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderItems.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .mainImage
                                                            }
                                                            alt={
                                                                item.product
                                                                    .name
                                                            }
                                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                                        />
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-500 line-clamp-1">
                                                                {
                                                                    item.product
                                                                        .description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    ${item.product.price}
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                        {item.quantity}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-center font-medium">
                                                    $
                                                    {(
                                                        parseFloat(
                                                            item.product.price
                                                        ) * item.quantity
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="py-4 px-4 text-center text-gray-600">
                                                    {
                                                        item.product
                                                            .preparationDuration
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

const InfoCard = ({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) => (
    <div className="bg-gray-50 hover: shadow-[0p_0px_5px] shadow-neutral-300 border border-gray-200 p-4 rounded-lg">
        <div className="flex items-center mb-2">
            {icon}
            <h3 className="ml-2 font-medium text-gray-700">{title}</h3>
        </div>
        <p className="text-gray-900">{value}</p>
    </div>
);
export type Order = {
    id: number;
    totalPrice: string;
    status: string;
    location: string;
    customerId: number;
    deliveryManId: number;
    createdAt: string;
    customer: {
        id: number;
        phone: string;
        name: string;
        email: string;
        password: string;
        resetCode: any;
        resetCodeExpiry: any;
        createdAt: string;
    };
    deliveryMan: {
        id: number;
        phone: string;
        name: string;
        password: string;
        salary: string;
        createdAt: string;
    };
    orderItems: Array<{
        id: number;
        quantity: number;
        productId: number;
        orderId: number;
        createdAt: string;
        product: {
            id: number;
            name: string;
            mainImage: string;
            price: string;
            otherImages: Array<any>;
            description: string;
            preparationDuration: string;
            rating: string;
            createdAt: string;
            sizes: Array<any>;
            categoryId: number;
        };
    }>;
};
