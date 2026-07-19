

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "./components/common/ScrollToTop";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminLayout from "./components/admin/AdminLayout";

// Pages
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Subscribers from "./pages/admin/Subscribers";
import Contacts from "./pages/admin/Contacts";
import Visitors from "./pages/admin/Visitors";
import Login from "./pages/auth/Login";
import Unauthorized from "./pages/auth/Unauthorized";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";

// Bootstrap Grid CSS only
import "bootstrap/dist/css/bootstrap-grid.min.css";
// Global CSS
import "./assets/css/style.css";
import ThemeProvider from "./context/ThemeProvider";
import CodeRainLoader from "./components/CodeRainLoader";
import data from "./data/portfolio.json";
import { Helmet } from "react-helmet-async";
import PWAInstallPrompt from "./components/pwa/PWAInstallPrompt";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { INSPECT_WARNING_MESSAGE } from "./constants/messages";
import { infoToast } from "./utils/toast";
import VisitorTracker from "./components/VisitorTracker";

// ✅ Wrapper component to conditionally show Header
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/login';
  const isUnauthorizedRoute = location.pathname === '/unauthorized';
  
  // ✅ Hide Header on admin, login, and unauthorized pages
  const hideHeader = isAdminRoute || isLoginRoute || isUnauthorizedRoute;

  return (
    <>
      <ScrollToTop />
      <VisitorTracker />
      <CodeRainLoader />
      
      {/* ✅ Header - Hidden on admin/login/unauthorized pages */}
      {!hideHeader && <Header />}
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="visitors" element={<Visitors />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* ✅ Footer - Hidden on admin/login/unauthorized pages */}
      {!hideHeader && <Footer />}
      
      <PWAInstallPrompt />
    </>
  );
};

function App() {
  const { website, seo } = data;

  // useEffect(() => {
  //   const showWarning = () => {
  //     infoToast(INSPECT_WARNING_MESSAGE);
  //   };

  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //     showWarning();
  //   };

  //   const handleKeyDown = (e) => {
  //     const key = e.key.toUpperCase();

  //     if (
  //       key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(key)) ||
  //       (e.ctrlKey && key === "U")
  //     ) {
  //       e.preventDefault();
  //       showWarning();
  //     }
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnFocusLoss={false}
      />
      
      <Helmet>
        <title>{seo?.title || website?.title || "Portfolio"}</title>
        <meta
          name="description"
          content={seo?.description || website?.description || ""}
        />
        <meta
          name="keywords"
          content={seo?.keywords || website?.keywords || ""}
        />
        <meta name="author" content={seo?.author || website?.author || ""} />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={seo?.title || website?.title} />
        <meta
          property="og:description"
          content={seo?.description || website?.description}
        />
        <meta property="og:image" content={seo?.ogImage || "/og-image.jpg"} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo?.title || website?.title} />
        <meta
          name="twitter:description"
          content={seo?.description || website?.description}
        />
        <meta name="twitter:image" content={seo?.ogImage || "/og-image.jpg"} />

        {/* Theme Color (for mobile browsers) */}
        <meta name="theme-color" content="#0d6efd" />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/svg+xml"
          href={website?.favicon || "/favicon.svg"}
        />
        <link
          rel="apple-touch-icon"
          href={website?.favicon || "/favicon.svg"}
        />
      </Helmet>

      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;