import "./Settings.css";
import { useState } from "react";
import Layout from "../../../components/layout/Layout";
import { createStaff } from "../../../api/firebase/auth.api.ts";
import { toast } from "react-toastify";

const Settings = () => {
  const [staffRole, setStaffRole] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffNumber, setStaffNumber] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed");
      console.error(error);
    }
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
              {loading ? "Loading..." : "Submit"}
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
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
