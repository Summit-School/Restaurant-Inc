import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdateInventory from "./UpdateInventory";
import DeleteInventory from "./DeleteInventory";
import { getStaffByType } from "../../../api/firebase/staff.api.ts";

const Inventory = () => {
  const [updateInventory, setUpdateInventory] = useState("");
  const [deleteInventory, setDeleteInventory] = useState("");
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getStaffByType("INVENTORY", (response) => {
      setInventory(response);
    });
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">INVENTORY</div>
      {inventory.length > 0
        ? inventory.map((inventory, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseCashier${index}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {inventory.name}
                </button>
              </h2>
              <div
                id={`collapseCashier${index}`}
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="name">
                    <div className="data-key">
                      <FaUserAlt />
                      <span> Name:</span>
                    </div>
                    <div className="data-value">{inventory.name}</div>
                  </div>
                  <div className="phone-number">
                    <div className="data-key">
                      <BsFillTelephoneFill />
                      <span>Phone Number:</span>
                    </div>
                    <div className="data-value">{inventory.phone}</div>
                  </div>
                  <div className="password">
                    <div className="data-key">
                      <RiLockPasswordFill />
                      <span>Password:</span>
                    </div>
                    <div className="data-value">{inventory.password}</div>
                  </div>
                  <div className="action-btns">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setUpdateInventory({ ...inventory, type: "INVENTORY" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        setDeleteInventory({ ...inventory, type: "INVENTORY" })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "No Inventory Staff In The System"}
      <UpdateInventory
        inventory={updateInventory}
        show={!!updateInventory}
        onHide={() => setUpdateInventory(false)}
      />
      <DeleteInventory
        inventory={deleteInventory}
        show={!!deleteInventory}
        onHide={() => setDeleteInventory(false)}
      />
    </div>
  );
};

export default Inventory;
