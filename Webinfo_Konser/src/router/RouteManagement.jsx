import React, { Suspense, useEffect } from "react";
import LoadingComponent from "../components/layouts/loading/LoadingComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePages from "../pages/homePage/HomePages";
import LoginPage from "../pages/loginPages/LoginPage";
import LayoutComponent from "../components/layouts/LayoutComponent";

const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Suspense fallback={<LoadingComponent />}>
      {!token ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      ) : (
        <LayoutComponent>
          <Routes>
            <Route path="/home" element={<HomePages />} />
          </Routes>
        </LayoutComponent>
      )}
    </Suspense>
  );
};

export default RouteManagement;
