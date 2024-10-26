import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/shared/sidebar";
import Home from "./pages/home/home";
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

function App() {
    return (
        <AuthProvider>
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <Routes>
                        {/* Route Login, accessible uniquement pour les utilisateurs non connectés */}
                        <Route path="/login" element={<Login />} />

                        {/* Routes protégées par PrivateRoute */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
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
                        />

                        {/* Route catch-all pour les routes non trouvées */}
                        <Route
                            path="*"
                            element={<main>404 Page not found</main>}
                        />
                    </Routes>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
