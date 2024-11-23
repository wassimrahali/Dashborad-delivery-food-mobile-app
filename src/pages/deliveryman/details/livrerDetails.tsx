import LoadingPage from "@/components/shared/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopBar from "@/components/shared/topBar";
import { ChartContainer } from "@/components/ui/chart";
import { DollarSign, Clock, PackageCheck,  Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { apiInstance } from "@/lib/axios";
import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
    Area,
    AreaChart,
    CartesianGrid,
} from "recharts";
const orderStatusData = [
    { name: "Completed", value: 75 },
    { name: "Not Completed", value: 25 },
];

const orderColors = ["#6EE7B7", "#EF4444"];

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
        <main className="flex p-6 space-y-6">
            <div className="w-full">
                <TopBar  text="Delivery Man Details " />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-6 ">
                    <Card >
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

                <div className="flex w-full gap-6">
    {/* Delivery Man Information */}
    <div className="w-2/3">
        <div className="container p-6 bg-white border rounded-lg">
            <div className="grid grid-cols-3 gap-4">
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
                <InfoCard
                    icon={<Calendar />}
                    title="Phone number"
                    value={deliveryMan?.phone}
                />
            </div>
        </div>
    </div>

    {/* Order Status Chart */}
    <div className="w-1/3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Order Status</CardTitle>
                <PackageCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}}>
                    <PieChart width={200} height={200}>
                        <Pie
                            data={orderStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius="70%" // Reduced radius for smaller chart
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {orderStatusData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        orderColors[index % orderColors.length]
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
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
