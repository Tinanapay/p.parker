import { useEffect, useState } from "react";
import "../../styles/rev.css";
import vector from "../../assets/vector.svg";

function RevenueReport({ isOpen, onClose }) {
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 120;
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const start = (page - 1) * perPage;
  const paginated = transactions.slice(start, start + perPage);
  const totalPages = Math.ceil(transactions.length / perPage);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);

    const today = new Date().toLocaleDateString();

    const total = stored
      .filter(t => t.date === today)
      .reduce((sum, t) => sum + (t.price || 0), 0);

    setTodayRevenue(total);
  }, []);

const handleLogout = () => {
  setShowLogoutConfirm(true);
};

const confirmLogout = () => {
  localStorage.clear();
  navigate("/");
};

  useEffect(() => {
    if (isOpen) setPage(1);
  }, [isOpen]);

  if (!isOpen) return null;

return (
  <div className="modal-overlay" onClick={onClose}>
    <div className="report-modal1" onClick={(e) => e.stopPropagation()}>
  <div className="report-box">
    <div className="total">
      <p className="label">Today's Revenue</p>
      <h1>₱{todayRevenue}</h1>
    </div>

    <div className="transactions-box">
      <h3>Transactions</h3>
      {transactions.length === 0 ? (
        <p className="empty">No transactions yet</p>
      ) : (
        <table className="tx-table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
           {paginated.map((t, i) => (
              <tr key={i}>
                <td>#{t.slotId}</td>
                <td>{t.timeIn}</td>
                <td>{t.timeOut}</td>
                <td>{t.date}</td>
                <td className="amount-cell">₱{t.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
  <button
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
  >
    Prev
  </button>

  <span>
    Page {page} / {totalPages || 1}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage((p) => p + 1)}
  >
    Next
  </button>
</div>
        </div>
      </div>
    </div>
  </div>
);

}


export default RevenueReport;