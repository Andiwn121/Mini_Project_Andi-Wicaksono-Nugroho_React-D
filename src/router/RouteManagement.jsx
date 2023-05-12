import React, { Suspense, useEffect } from "react";
import LoadingComponent from "../components/layouts/loading/LoadingComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePages from "../pages/homePage/HomePages";
import LoginPage from "../pages/loginPages/LoginPage";
import LayoutComponent from "../components/layouts/LayoutComponent";
import KonserPage from "../pages/konserPage/KonserPage";
import ArtisPage from "../pages/artisPage/ArtisPage";
import DisplayPage from "../pages/displayPage/DisplayPage";
import DetailDisplayPage from "../pages/detailDisplayPage/DetailDisplayPage";
import LandingPage from "../pages/landingPage/LandingPage";

const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <Suspense fallback={<LoadingComponent />}>
      {!token ? (
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/display-user" element={<DisplayPage />} />
            <Route path="/display-user/:uuid" element={<DetailDisplayPage />} />
          </Routes>
        </LayoutComponent>
      ) : (
        <LayoutComponent>
          <Routes>
            <Route path="/home" element={<HomePages />} />
            <Route path="/data-konser" element={<KonserPage />} />
            <Route path="/data-artis" element={<ArtisPage />} />
            <Route path="/display-user" element={<DisplayPage />} />
            <Route path="/display-user/:uuid" element={<DetailDisplayPage />} />
          </Routes>
        </LayoutComponent>
      )}
    </Suspense>
  );
};

export default RouteManagement;
