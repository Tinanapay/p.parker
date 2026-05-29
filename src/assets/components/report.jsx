import { useEffect, useState } from "react";
import "../../styles/rev.css";

/**
 * REPORT DASHBOARD COMPONENT
 * ---------------------------------------
 * This component displays:
 * 1. Occupancy Report (from parking slots data)
 * 2. Revenue Report (from transactions)
 * 3. Bookings Table (transaction history)
 *
 * - Currently uses localStorage as mock database
 */

function Report({ isOpen, onClose }) {


  
  // =========================
  // OCCUPANCY DATA
  // =========================
  // SOURCE: parking slots (mock localStorage)
  // API: /api/admin/parking-slots
  const [slots, setSlots] = useState([]);

  const [occupancy, setOccupancy] = useState({
    total: 0,
    occupied: 0,
    available: 0,
    maintenance: 0,
  });

  useEffect(() => {
    const fakeSlots =
      JSON.parse(localStorage.getItem("slots")) || [];

    setSlots(fakeSlots);

    setOccupancy({
      total: fakeSlots.length,
      occupied: fakeSlots.filter(s => s.status === "Occupied").length,
      available: fakeSlots.filter(s => s.status === "Available").length,
      maintenance: fakeSlots.filter(s => s.status === "Maintenance").length,
    });
  }, []);


  // =========================
  // BOOKINGS DATA
  // =========================
  // SOURCE: transactions (mock localStorage)
  // API: /api/admin/bookings
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fakeBookings =
      JSON.parse(localStorage.getItem("transactions")) || [];

    setBookings(fakeBookings);
  }, []);


  // =========================
  // REVENUE DATA
  // =========================
  // SOURCE: transactions (mock localStorage)
  // API: /api/reports/revenue
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("transactions")) || [];

    const total = stored.reduce(
      (sum, t) => sum + (t.price || 0),
      0
    );

    setRevenue(total);
  }, []);


  // =========================
  // PAGINATION (BOOKINGS TABLE)
  // =========================
  const [page, setPage] = useState(1);
  const perPage = 10;

  const start = (page - 1) * perPage;
  const paginated = bookings.slice(start, start + perPage);
  const totalPages = Math.ceil(bookings.length / perPage);

  useEffect(() => {
    if (isOpen) setPage(1);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="report-modal1"
        onClick={(e) => e.stopPropagation()}
      >


        {/* =========================
            OCCUPANCY REPORT UI
        ========================== */}
        <div className="report-box">
          <h3>Occupancy Report</h3>
          <p>Total Slots: {occupancy.total}</p>
          <p>Occupied: {occupancy.occupied}</p>
          <p>Available: {occupancy.available}</p>
          <p>Maintenance: {occupancy.maintenance}</p>
        </div>


        {/* =========================
            REVENUE REPORT UI
        ========================== */}
        <div className="report-box">
          <h3>Revenue Report</h3>
          <h1>₱{revenue}</h1>
        </div>

        {/* =========================
            BOOKINGS TABLE UI
        ========================== */}
        <div className="report-box">
          <h3>Bookings</h3>

          {bookings.length === 0 ? (
            <p>No bookings yet</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map((b, i) => (
                    <tr key={i}>
                      <td>#{b.slotId}</td>
                      <td>{b.date}</td>
                      <td>₱{b.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION CONTROLS */}
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Prev
                </button>

                <span>
                  Page {page} / {totalPages || 1}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Report;