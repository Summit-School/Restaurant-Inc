import "./Settings.css";
import { useState } from "react";
import Layout from "../../../components/layout/Layout";
import { createStaff } from "../../../api/firebase/auth.api.ts";
import { createTable } from "../../../api/firebase/admin.api.ts";
import { toast } from "react-toastify";

const Settings = () => {
  const [staffRole, setStaffRole] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffNumber, setStaffNumber] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [staffLoading, setStaffLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const handleStaff = async (e) => {
    e.preventDefault();
    setStaffLoading(true);
    const staffData = {
      name: staffName,
      phone: staffNumber,
      password: staffPassword,
    };

    try {
      const response = await createStaff(staffData, staffRole);
      if (response) {
        toast.success("Staff Added");
        setStaffName("");
        setStaffNumber("");
        setStaffPassword("");
        setStaffLoading(false);
      }
    } catch (error) {
      setStaffLoading(false);
      toast.error("Failed");
      console.error(error);
    }
  };

  const handleTable = async (e) => {
    e.preventDefault();
    setTableLoading(true);
    const tableData = {
      number: tableNumber,
    };

    try {
      const response = await createTable(tableData);
      if (response) {
        toast.success("Table Added");
        setTableLoading(false);
      }
    } catch (error) {
      setTableLoading(false);
      toast.error("Failed");
      console.error(error);
    }
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
              <option value="SERVICE">Waiter</option>
              <option value="CASHIER">Cashier</option>
              <option value="KITCHEN">Kitchen</option>
              <option value="COUNTER">Counter</option>
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
            <button onClick={handleStaff}>
              {staffLoading ? "Loading..." : "Submit"}
            </button>
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
            <button onClick={handleTable}>
              {tableLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
