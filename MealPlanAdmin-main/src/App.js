import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutDefault from "./layouts/LayoutDefault";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

// toast css
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import { useDispatch } from "react-redux";
import { updateFromLocalStorage } from "./features/user/userSlice";
import { useLayoutEffect } from "react";
import PrivateRoute from "./layouts/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const data = localStorage.getItem("admin");
    if (data) {
      dispatch(updateFromLocalStorage(JSON.parse(data)));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<LayoutDefault />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
    </BrowserRouter>
  );
}

export default App;
