import React, { useState, useEffect } from "react";
import "../styles/admin.css";
import topview from "../assets/topview2.png";
import RevenueReport from "../assets/components/revenuereport";
import vector from "../assets/vector.svg";
import SlotDetailsModal from "../assets/components/SlotDetailsModal.jsx";

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [tick, setTick] = useState(0);
  const [pendingUpdate, setPendingUpdate] = useState(null);

  const [slots, setSlots] = useState([
    { id: 1, code: "001", status: "Available" , timeLeft: 10 },
    { id: 2, code: "002", status: "Occupied", timeLeft: 10 },
    { id: 3, code: "003", status: "Available" , timeLeft: 10 },
    { id: 4, code: "004", status: "Occupied" , timeLeft: 10 },
    { id: 5, code: "005", status: "Occupied" , timeLeft: 10 },
    { id: 6, code: "006", status: "Available" , timeLeft: 10 },
    { id: 7, code: "007", status: "Available" , timeLeft: 10 },
    { id: 8, code: "008", status: "Occupied" , timeLeft: 10 },
    { id: 9, code: "009", status: "Occupied", timeLeft: 10 },
    { id: 10, code: "010", status: "Available" , timeLeft: 10 },
    { id: 11, code: "011", status: "Occupied" , timeLeft: 10 },
    { id: 12, code: "012", status: "Occupied" , timeLeft: 10 },
    { id: 13, code: "013", status: "Available" , timeLeft: 10 },
    { id: 14, code: "014", status: "Occupied" , timeLeft: 10 },
    { id: 15, code: "015", status: "Occupied", timeLeft: 10  },
    { id: 16, code: "016", status: "Available" , timeLeft: 10 },
    { id: 17, code: "017", status: "Available" , timeLeft: 10 },
    { id: 18, code: "018", status: "Occupied" , timeLeft: 10 },
    { id: 19, code: "019", status: "Maintenance" , timeLeft: 10 },
    { id: 20, code: "020", status: "Occupied" , timeLeft: 10 },
    { id: 21, code: "021", status: "Occupied" , timeLeft: 10 },
    { id: 22, code: "022", status: "Occupied" , timeLeft: 10 },
    { id: 23, code: "023", status: "Available" , timeLeft: 10 },
    { id: 24, code: "024", status: "Occupied" , timeLeft: 10 },
    { id: 25, code: "025", status: "Occupied" , timeLeft: 10 },
    { id: 26, code: "026", status: "Available" , timeLeft: 10 },
    { id: 27, code: "027", status: "Available" , timeLeft: 10 },
    { id: 28, code: "028", status: "Available" , timeLeft: 10 },
    { id: 29, code: "029", status: "Available" , timeLeft: 10 },
    { id: 30, code: "030", status: "Available" , timeLeft: 10 },
    { id: 31, code: "031", status: "Available" , timeLeft: 10 },
    { id: 32, code: "032", status: "Available" , timeLeft: 10 },
  ]);

  const layout = [
    { type: "row", slots: [1, 2, 3, 4, null, 5, 6, 7, 8] },
    { type: "road" },
    { type: "row", slots: [9, 10, 11, 12, null, 13, 14, 15, 16] },
    { type: "road" },
    { type: "row", slots: [17, 18, 19, 20, null, 21, 22, 23, 24] },
    { type: "road" },
    { type: "row", slots: [25, 26, 27, 28, null, 29, 30, 31, 32] },
  ];

  // ---------------- TIMER ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSlots((prev) =>
      prev.map((s) =>
        s.status === "Occupied" && (s.timeLeft ?? 0) > 0
          ? { ...s, timeLeft: s.timeLeft - 1 }
          : s
      )
    );
  }, [tick]);

  // ---------------- BLINK LOGIC ----------------
  const isBlinking = (slot) => {
    return (
      slot.status === "Occupied" &&
      (slot.timeLeft ?? 0) <= 30 &&
      (slot.timeLeft ?? 0) > 0
    );
  };

  // ---------------- MODALS ----------------
  const openModal = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  // ---------------- STATUS UPDATE ----------------
  const updateStatus = (id, newStatus) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: newStatus } : s
      )
    );
  };

  const askUpdateStatus = (slot, newStatus) => {
    setPendingUpdate({ slot, newStatus });
  };

  const confirmUpdate = () => {
    updateStatus(pendingUpdate.slot.id, pendingUpdate.newStatus);
    setPendingUpdate(null);
  };

  return (
    <div className="parking-wrapper">

      <RevenueReport />

      <img src={vector} className="yellow" alt="yellow" />

      <div className="parking-lot">

        {layout.map((item, i) => {
          if (item.type === "road") {
            return <div key={i} className="road" />;
          }

          return (
            <div key={i} className="parking-row">

              {item.slots.map((id, j) => {
                if (!id) return <div key={j} className="gap" />;

                const slot = slots.find((s) => s.id === id);

                return (
                  <div
                    key={slot.id}
                    className={`slot ${slot.status} ${isBlinking(slot) ? "blink" : ""}`}
                    onClick={() => openModal(slot)}
                  >

                    <div className="slot-number">
                      Slot#{slot.code}
                    </div>

                    {slot.status === "Occupied" ? (
                      <img src={topview} className="topview2" />
                    ) : (
                      <h3>{slot.status}</h3>
                    )}

                    {/* DROPDOWN */}
                    <select
                      className={`meow ${slot.status.toLowerCase()}`}
                      value={slot.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        askUpdateStatus(slot, e.target.value)
                      }
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>

                  </div>
                );
              })}

            </div>
          );
        })}

      </div>

      {/* CONFIRM MODAL */}
      {pendingUpdate && (
        <div
          className="modal-overlay"
          onClick={() => setPendingUpdate(null)}
        >
          <div
            className="confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <h3>Confirm Change</h3>

            <p>
              Change Slot #{pendingUpdate.slot.code} to{" "}
              <b>{pendingUpdate.newStatus}</b>?
            </p>

            <div className="confirm-buttons">

              <button onClick={() => setPendingUpdate(null)}>
                Cancel
              </button>

              <button onClick={confirmUpdate}>
                Confirm
              </button>

            </div>

          </div>
        </div>
      )}

      <SlotDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        slot={selectedSlot}
      />

    </div>
  );
}

export default AdminDashboard;