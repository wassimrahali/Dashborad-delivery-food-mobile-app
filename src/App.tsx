import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/shared/sidebar";
import Login from "./pages/login/login";
import AddProduct from "./pages/proudcts/add/add";
import AllProducts from "./pages/proudcts/all/all";
import AllCategories from "./pages/categories/all/all";
import AddCategory from "./pages/categories/add/add";
import ProductDetails from "./pages/proudcts/deails/productDetails";
import CategoryDetails from "./pages/categories/details/CategoryDetails";
import UpdateProduct from "./pages/proudcts/update/UpdateProduct";
import UpdateCategory from "./pages/categories/update/update";
import { AuthProvider } from "./constants/AuthContext";
import PrivateRoute from "./pages/login/PrivateRoute";
import AllOrders from "./pages/orders/all/all";
import OrderDetails from "./pages/orders/details/OrderDetails";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/shared/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import AllDeliveryMan from "./pages/deliveryman/all/all";
import AddDeliveryMan from "./pages/deliveryman/add/add";
import LivrerDetails from "./pages/deliveryman/details/livrerDetails";

function App() {
    return (
        <AuthProvider>
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <Routes>
                        {/* Route Login, accessible uniquement pour les utilisateurs non connectés */}
                        <Route path="/login" element={<Login />} />
                        {/* add this line by Wass to correct the Notfound routes ....*/}
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<NotFound />} />

                        {/* Routes protégées par PrivateRoute */}

                        <Route
                            path="/products/add"
                            element={
                                <PrivateRoute>
                                    <AddProduct />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/products/"
                            element={
                                <PrivateRoute>
                                    <AllProducts />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/products/:id"
                            element={
                                <PrivateRoute>
                                    <ProductDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/products/update/:id"
                            element={
                                <PrivateRoute>
                                    <UpdateProduct />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/categories/add"
                            element={
                                <PrivateRoute>
                                    <AddCategory />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/categories/"
                            element={
                                <PrivateRoute>
                                    <AllCategories />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/categories/:id"
                            element={
                                <PrivateRoute>
                                    <CategoryDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/categories/update/:id"
                            element={
                                <PrivateRoute>
                                    <UpdateCategory />
                                </PrivateRoute>
                            }
                        />{/* deliveryman routes */}
                         <Route
                            path="/drivers/"
                            element={
                                <PrivateRoute>
                                    <AllDeliveryMan />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/drivers/add"
                            element={
                                <PrivateRoute>
                                    <AddDeliveryMan />
                                </PrivateRoute>
                            }
                        />
                        {/* order routes */}
                        <Route
                            path="/orders/add"
                            element={
                                <PrivateRoute>
                                    <AddCategory />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/drivers/:id"
                            element={
                                <PrivateRoute>
                                    <LivrerDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/orders/"
                            element={
                                <PrivateRoute>
                                    <AllOrders />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/orders/:id"
                            element={
                                <PrivateRoute>
                                    <OrderDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/orders/update/:id"
                            element={
                                <PrivateRoute>
                                    <UpdateCategory />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
            <Toaster
                containerClassName="font-semibold"
                position="top-center"
                reverseOrder={false}
            />{" "}
        </AuthProvider>
    );
}

export default App;
