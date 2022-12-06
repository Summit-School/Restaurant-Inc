import { useState } from "react";
import { createTable } from "../../../api/firebase/admin.api.ts";
import { toast } from "react-toastify";

const AddTable = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [tableLoading, setTableLoading] = useState(false);

  const handleTable = async (e) => {
    e.preventDefault();
    setTableLoading(true);

    try {
      console.log(floorNumber, tableNumber);
      const response = await createTable(tableNumber, floorNumber);
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
    <div>
      <p>Add Table</p>
      <form>
        <input
          className="form-control"
          type="number"
          placeholder="Floor number (optional)"
          value={floorNumber}
          onChange={(e) => setFloorNumber(e.target.value)}
        />
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
  );
};

export default AddTable;
