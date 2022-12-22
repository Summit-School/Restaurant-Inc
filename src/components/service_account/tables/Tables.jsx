import "./Tables.css";
import { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const Tables = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [table, setTable] = useState({});

  const [tables, setTables] = useState([]);
  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      // console.log(response);
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
                setTable(table);
                setShowMenu(true);
              }}
            >
              {table.floor
                ? "Table" + table.number + " (" + table.floor + ")"
                : table.number}
            </button>
          ))
        : "<p>No tables Founds</p>"}
      <Menu show={showMenu} table={table} onHide={() => setShowMenu(false)} />
    </div>
  );
};

export default Tables;
