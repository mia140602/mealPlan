import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectIsLogin } from "../features/user/userSlice";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  //   const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();

  const isLogin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      toast("Bạn chưa đăng nhập !", { type: "error" });
    }
  }, [isLogin]);

  return <Outlet />;
};

export default PrivateRoute;
