import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Clock, DollarSign, PackageCheck, Users } from "lucide-react";
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
import TopBar from "@/components/shared/topBar";

const orderStatusData = [
    { name: "Completed", value: 75 },
    { name: "Not Completed", value: 25 },
];

const orderColors = ["#6EE7B7", "#EF4444"];

const weeklyOrdersData = [
    { day: "Mon", orders: 15 },
    { day: "Tue", orders: 22 },
    { day: "Wed", orders: 18 },
    { day: "Thu", orders: 25 },
    { day: "Fri", orders: 30 },
    { day: "Sat", orders: 20 },
    { day: "Sun", orders: 10 },
];

const newUsersData = [
    { day: "Mon", users: 5 },
    { day: "Tue", users: 8 },
    { day: "Wed", users: 6 },
    { day: "Thu", users: 10 },
    { day: "Fri", users: 12 },
    { day: "Sat", users: 7 },
    { day: "Sun", users: 4 },
];

const monthlyRevenueData = [
    { month: "Jan", revenue: 1500 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2200 },
    { month: "Apr", revenue: 4200 },
];

export default function Dashboard() {
    // Calculate key metrics
    const totalRevenue = monthlyRevenueData.reduce(
        (sum, item) => sum + item.revenue,
        0
    );
    const totalOrders = weeklyOrdersData.reduce(
        (sum, item) => sum + item.orders,
        0
    );
    const totalNewUsers = newUsersData.reduce(
        (sum, item) => sum + item.users,
        0
    );
    const completionRate = orderStatusData[0].value;

    return (
        <main className="p-6 space-y-6">
            <TopBar text="Dashboard" />

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalRevenue.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Total Orders</CardTitle>
                        <PackageCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">
                            +15.3% from last week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>New Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalNewUsers}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +12.4% from last week
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
                            {completionRate}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Completed orders
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Status */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Order Status</CardTitle>
                        <PackageCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}}>
                            <PieChart>
                                <Pie
                                    data={orderStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius="90%"
                                    fill="#8884d8"
                                    dataKey="value">
                                    {orderStatusData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                orderColors[
                                                    index % orderColors.length
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
                {/* New Users */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>New Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}}>
                            <AreaChart data={newUsersData}>
                                <defs>
                                    <linearGradient
                                        id="userGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="#6EE7B7"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#6EE7B7"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#6EE7B7"
                                    fillOpacity={1}
                                    fill="url(#userGradient)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Weekly Orders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Weekly Orders</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}}>
                            <BarChart
                                className=" scale-x-110"
                                data={weeklyOrdersData}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    barSize={40}
                                    dataKey="orders"
                                    fill="#2196F3"
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Monthly Revenue */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Monthly Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}}>
                            <AreaChart data={monthlyRevenueData}>
                                <defs>
                                    <linearGradient
                                        id="revenueGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="#FF9800"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#FF9800"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#FF9800"
                                    fillOpacity={1}
                                    fill="url(#revenueGradient)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
