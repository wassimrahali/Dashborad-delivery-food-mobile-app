import LoadingPage from "@/components/shared/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopBar from "@/components/shared/topBar";
import { DollarSign, Clock, PackageCheck,  Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { apiInstance } from "@/lib/axios";

export default function LivrerDetails() {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    // State for delivery man details and statistics
    const [deliveryMan, setDeliveryMan] = useState<DeliveryMan | null>(null);
    const [stats, setStats] = useState<{
        totalRevenue: number;
        totalOrders: number;
        completionRate: number;
    } | null>(null);

    // Fetch delivery man data and stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch delivery man details
                const deliveryManResponse = await apiInstance.get(`/auth/DileveryMan/${id}`);
                setDeliveryMan(deliveryManResponse.data);

                // Fetch stats (total revenue, total orders, etc.)
                const statsResponse = await apiInstance.get(`/orders-summary/${id}`);
                const { totalPrice, acceptedOrders, refusedOrders } = statsResponse.data;
                const totalOrders = acceptedOrders + refusedOrders;
                const completionRate = totalOrders > 0 ? (acceptedOrders / totalOrders) * 100 : 0;

                setStats({
                    totalRevenue: totalPrice,
                    totalOrders,
                    completionRate,
                });
            } catch (error) {
                toast.error("Failed to fetch delivery man details or stats.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <main className="flex">
            <div className="w-full">
                <TopBar text="Delivery Man Details" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${stats?.totalRevenue.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">Earnings from orders</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Total Orders</CardTitle>
                            <PackageCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalOrders}</div>
                            <p className="text-xs text-muted-foreground">All assigned orders</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Order Completion</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats?.completionRate.toFixed(2)}%
                            </div>
                            <p className="text-xs text-muted-foreground">Completed orders</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="p-10">
                    <div className="container p-10 mx-auto w-full bg-white border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Delivery Man Details */}
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoCard
                                        icon={<Calendar />}
                                        title="Name"
                                        value={deliveryMan?.name}
                                    />
                                    <InfoCard
                                        icon={<Calendar />}
                                        title="Joined At"
                                        value={new Date(deliveryMan?.createdAt!).toLocaleDateString()}
                                    />
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-semibold mb-2">Phone Number:</h3>
                                    <p className="text-gray-600">{deliveryMan?.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const InfoCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | number | undefined }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center mb-2">
            {icon}
            <h3 className="ml-2 font-semibold">{title}</h3>
        </div>
        <p className="text-lg">{value}</p>
    </div>
);

export type DeliveryMan = {
    id: number;
    phone: string;
    name: string;
    password: string;
    salary: string;
    createdAt: string;
};
