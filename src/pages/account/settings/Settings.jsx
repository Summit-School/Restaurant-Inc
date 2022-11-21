import "./Settings.css";
import { useState } from "react";
import Layout from "../../../components/layout/Layout";

const Settings = () => {
  const [staffRole, setStaffRole] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffNumber, setStaffNumber] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const handleStaff = (e) => {
    e.preventDefault();
    const staffData = {
      role: staffRole,
      name: staffName,
      number: staffNumber,
      password: staffPassword,
    };
    console.log(staffData);
  };

  const handleTable = (e) => {
    e.preventDefault();
    const tableData = {
      number: tableNumber,
    };
    console.log(tableData);
  };

  return (
    <Layout>
      <div className="container settings-page-wrapper">
        <div className="add-staff">
          <p>Add Staff</p>
          <form>
            <select
              onChange={(e) => setStaffRole(e.target.value)}
              className="form-control mt-2"
            >
              <option>Select Category</option>
              <option value="waiter">Waiter</option>
              <option value="cashier">Cashier</option>
              <option value="kitchen">Kitchen</option>
              <option value="counter">Counter</option>
            </select>
            <input
              className="form-control"
              type="text"
              placeholder="Staff name"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
            />
            <input
              className="form-control"
              type="number"
              placeholder="Phone number"
              value={staffNumber}
              onChange={(e) => setStaffNumber(e.target.value)}
            />
            <input
              className="form-control"
              type="password"
              placeholder="*********"
              value={staffPassword}
              onChange={(e) => setStaffPassword(e.target.value)}
            />
            <button onClick={handleStaff}>Submit</button>
          </form>
        </div>
        <div className="add-table">
          <p>Add Table</p>
          <form>
            <input
              className="form-control"
              type="number"
              placeholder="Table number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <button onClick={handleTable}>Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
