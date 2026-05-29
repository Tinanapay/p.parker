import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/admin.css";
import AdminDashboard from "./admindashboard.jsx";
import Report from "../assets/components/report.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const [openRevenue, setOpenRevenue] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>

      {/* HEADER */}
      <div className="header">
        <div className="header-text">
          <h1>ADMIN DASHBOARD</h1>
        </div>

        <div className="header-actions">

          <button
            className="revenue-button"
            onClick={() => setOpenRevenue(true)}
          >
            Report
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>

      {/* REPORT MODAL */}
      <Report
        isOpen={openRevenue}
        onClose={() => setOpenRevenue(false)}
      />

      {/* LOGOUT CONFIRM */}
      {showLogoutConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <h3>Confirm Logout</h3>
            <h3>Are you sure you want to log out?</h3>

            <div className="confirm-buttons">

              <button onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>

              <button onClick={confirmLogout}>
                Yes, Logout
              </button>

            </div>

          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <AdminDashboard />

    </div>
  );
}

export default Dashboard;