import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/home";
import { Button } from "./components/ui/button";
import Login from "./pages/login/login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="*"
                element={
                    <main className="h-[100vh] flex-col flex items-center justify-center text-2xl font-medium">
                        Not found
                        <Link to={"/"} className="mt-3">
                            <Button>Home page</Button>
                        </Link>
                    </main>
                }></Route>
        </Routes>
    );
}

export default App;
