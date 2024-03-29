import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdateKitchen from "./UpdateKitchen";
import DeleteKitchen from "./DeleteKitchen";
import { getStaffByType } from "../../../api/firebase/staff.api.ts";

const Kitchen = () => {
  const [updateKitchen, setUpdateKitchen] = useState("");
  const [deleteKitchen, setDeleteKitchen] = useState("");
  const [kitchen, setKitchen] = useState([]);

  useEffect(() => {
    getStaffByType("KITCHEN", (response) => {
      setKitchen(response);
    });
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">KITCHEN STAFF</div>
      {kitchen.length > 0
        ? kitchen.map((staff, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseKitchen${index}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {staff.name}
                </button>
              </h2>
              <div
                id={`collapseKitchen${index}`}
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
                    <div className="data-value">{staff.name}</div>
                  </div>
                  <div className="phone-number">
                    <div className="data-key">
                      <BsFillTelephoneFill />
                      <span>Phone Number:</span>
                    </div>
                    <div className="data-value">{staff.phone}</div>
                  </div>
                  <div className="password">
                    <div className="data-key">
                      <RiLockPasswordFill />
                      <span>Password:</span>
                    </div>
                    <div className="data-value">{staff.password}</div>
                  </div>
                  <div className="action-btns">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setUpdateKitchen({ ...staff, type: "KITCHEN" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        setDeleteKitchen({ ...staff, type: "KITCHEN" })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "No kitchen Staff In The System"}
      <UpdateKitchen
        kitchen={updateKitchen}
        show={!!updateKitchen}
        onHide={() => setUpdateKitchen(false)}
      />
      <DeleteKitchen
        kitchen={deleteKitchen}
        show={!!deleteKitchen}
        onHide={() => setDeleteKitchen(false)}
      />
    </div>
  );
};

export default Kitchen;
