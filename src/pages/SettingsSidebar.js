import React from "react";
import "../styles/SettingsSidebar.css"; // Import CSS for styling

const SettingsSidebar = ({ onClose }) => {
  return (
    <div className="settings-sidebar">
      <button className="close-btn" onClick={onClose}>✖</button>
      <h2>Settings</h2>
      <p>Customize your experience here.</p>
      {/* Add settings options */}
      <div>
        <label>
          <input type="checkbox" /> Dark Mode
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" /> Notifications
        </label>
      </div>
    </div>
  );
};

export default SettingsSidebar;
