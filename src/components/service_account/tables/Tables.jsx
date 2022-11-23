import "./Tables.css";
import { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const Tables = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [tableNumber, setTableNumber] = useState(0);

  const [tables, setTables] = useState([]);
  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      console.log(response);
      setTables(response);
    });
  }, []);
  return (
    <div>
      {tables
        ? tables.map((table, index) => (
            <button
              key={index}
              className="table-btn"
              onClick={() => {
                setTableNumber(table.id);
                setShowMenu(true);
              }}
            >
              {table.id}
            </button>
          ))
        : "<p>No tables Founds</p>"}
      <Menu
        show={showMenu}
        tablenumber={tableNumber}
        onHide={() => setShowMenu(false)}
      />
    </div>
  );
};

export default Tables;
