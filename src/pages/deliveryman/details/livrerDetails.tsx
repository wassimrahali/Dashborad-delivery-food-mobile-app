import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { apiInstance } from "@/lib/axios";
import { Calendar, Clock, DollarSign, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
    Area,
    AreaChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
const orderStatusData = [
    { name: "Completed", value: 75 },
    { name: "Not Completed", value: 25 },
];

const orderColors = ["#6EE7B7", "#EF4444"];
const monthlyOrdersData = [
    { month: "Jan", orders: 70 },
    { month: "Feb", orders: 105 },
    { month: "Mar", orders: 95 },
    { month: "Apr", orders: 82 },
    { month: "May", orders: 105 },
    { month: "Jun", orders: 100 },
    { month: "Jul", orders: 78 },
    { month: "Aug", orders: 52 },
    { month: "Sep", orders: 60 },
    { month: "Oct", orders: 90 },
    { month: "Nov", orders: 45 },
    { month: "Dec", orders: 40 },
];
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
                const deliveryManResponse = await apiInstance.get(
                    `/auth/DileveryMan/${id}`
                );
                setDeliveryMan(deliveryManResponse.data);

                // Fetch stats (total revenue, total orders, etc.)
                const statsResponse = await apiInstance.get(
                    `/orders-summary/${id}`
                );
                const { totalPrice, acceptedOrders, refusedOrders } =
                    statsResponse.data;
                const totalOrders = acceptedOrders + refusedOrders;
                const completionRate =
                    totalOrders > 0 ? (acceptedOrders / totalOrders) * 100 : 0;

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
                <TopBar text="Delivery Man Details " />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-6 ">
                    <Card>
                        <CardHeader className="flex  flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${stats?.totalRevenue.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Earnings from orders
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Total Orders</CardTitle>
                            <PackageCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats?.totalOrders}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                All assigned orders
                            </p>
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
                            <p className="text-xs text-muted-foreground">
                                Completed orders
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex w-full px-7  gap-6">
                    {/* Delivery Man Information */}
                    <div className="w-2/3 border  rounded-xl">
                        <div className="container p-6   rounded-lg">
                            <div className="grid grid-cols-1 gap-4">
                                <InfoCard
                                    icon={<Calendar />}
                                    title="Name"
                                    value={deliveryMan?.name}
                                />
                                <InfoCard
                                    icon={<Calendar />}
                                    title="Joined At"
                                    value={new Date(
                                        deliveryMan?.createdAt!
                                    ).toLocaleDateString()}
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
                            <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2">
                                <CardTitle>Order Status</CardTitle>
                                <PackageCheck className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="pb-5 rounded-xl  relative">
                                <ChartContainer
                                    config={{}}
                                    className="p-0  w-96 h-72 ">
                                    <PieChart>
                                        <Pie
                                            data={orderStatusData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius="70%"
                                            fill="#8884d8"
                                            dataKey="value">
                                            {orderStatusData.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        orderColors[
                                                            index %
                                                                orderColors.length
                                                        ]
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
                <div className="px-8">
                    <Card className="mt-6 ">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Monthly Orders</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="h-72">
                            <ChartContainer
                                config={{}}
                                className="h-72 w-[95%]">
                                <AreaChart
                                    className="scale-x-110"
                                    data={monthlyOrdersData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}>
                                    <defs>
                                        <linearGradient
                                            id="orderGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1">
                                            <stop
                                                offset="5%"
                                                stopColor="#ef4444"
                                                stopOpacity={0.5}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#ef4444"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="month"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#ef4444"
                                        fillOpacity={1}
                                        fill="url(#orderGradient)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
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
    value: string | number | undefined;
}) => (
    <div className="border shadow-[0px_0px_10px] shadow-neutral-50  p-4 rounded-lg">
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
