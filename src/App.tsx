import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/shared/sidebar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import AddProduct from "./pages/proudcts/add/add";
import AllProducts from "./pages/proudcts/all/all";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/" element={<AllProducts />} />
            <Route
                path="*"
                element={
                    <main>
                        <Sidebar />
                    </main>
                }></Route>
        </Routes>
    );
}

export default App;
