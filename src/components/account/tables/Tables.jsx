import "./Tables.css";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  onSnapshotGetAllTables,
  deleteTable,
} from "../../../api/firebase/admin.api.ts";

const Tables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      setTables(response);
    });
  }, []);

  const deleteTableAction = async (table) => {
    try {
      const response = await deleteTable(table);
      if (response) {
        toast.success("Table Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {tables.length > 0
        ? tables.map((table, index) => (
            <div className="table-item" key={index}>
              <span className="table-name">
                {table.floor
                  ? "Table " + table.number + " (" + table.floor + ")"
                  : "Table " + table.number}
              </span>
              <span className="delete-icon">
                <AiFillDelete
                  size={25}
                  onClick={() => deleteTableAction(table)}
                />
              </span>
            </div>
          ))
        : "No Tables Found In The System"}
    </div>
  );
};

export default Tables;
