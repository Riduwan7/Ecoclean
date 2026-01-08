import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import ProtectedRoute from "./components/ProtuctedRoute.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Home from "./Home/home.jsx";
import Login from "./pages/Auth/login.jsx";
import Register from "./pages/Auth/register.jsx";
import AboutUs from "./Home/AboutUs.jsx";
import Features from "./Home/Features.jsx";
import Contact from "./Home/ContactUs.jsx";

import UserDashboard from "./pages/User/UserDashboard.jsx";
import RequestPickup from "./pages/User/RequestPickup.jsx";
import MyPickups from "./pages/User/MyPickups.jsx";
import Complaints from "./pages/User/Complaints.jsx";
import AddReview from "./pages/User/AddReview.jsx";

import StaffDashboard from "./pages/Staff/StaffDashboard.jsx";
import StaffPickups from "./pages/Staff/StaffPickups.jsx";

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import ManageComplaints from "./pages/Admin/ManageComplaints.jsx";
import ManagePickups from "./pages/Admin/ManagePickups.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import ManageReviews from "./pages/Admin/ManageReviews.jsx";
import AdminChat from "./pages/Admin/AdminChat.jsx";

function App() {
  return (
    <Router>
      <SocketProvider>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<>  <Home /> </>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />

            <Route element={<ProtectedRoute role="user" />}>
              <Route path="/user/dashboard" element={<> <UserDashboard /> <Footer /> </>} />
              <Route path="/user/request-pickup" element={<RequestPickup />} />
              <Route path="/user/my-pickups" element={<MyPickups />} />
              <Route path="/user/complaints" element={<Complaints />} />
              <Route path="/user/add-review" element={<AddReview />} />
            </Route>

            <Route element={<ProtectedRoute role="staff" />}>
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/pickups" element={<StaffPickups />} />
            </Route>

            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin" element={<AdminLayout />} >

                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="pickups" element={<ManagePickups />} />
                <Route path="complaints" element={<ManageComplaints />} />
                <Route path="reviews" element={<ManageReviews />} />
                <Route path="messages" element={<AdminChat />} />

              </Route>
            </Route>

          </Routes>
        </AuthProvider>
      </SocketProvider>
    </Router>
  );
}

export default App;
