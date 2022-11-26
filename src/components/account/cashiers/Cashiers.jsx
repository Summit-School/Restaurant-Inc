import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdateCashier from "./UpdateCashier";
import DeleteCashier from "./DeleteCashier";
import { getStaffByType } from "../../../api/firebase/staff.api.ts";

const Cashiers = () => {
  const [updateCashier, setUpdateCashier] = useState("");
  const [deleteCashier, setDeleteCashier] = useState("");
  const [cashiers, setCashiers] = useState([]);

  useEffect(() => {
    getStaffByType("CASHIER", (response) => {
      setCashiers(response);
    });
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">CASHIERS</div>
      {cashiers.length > 0
        ? cashiers.map((cashier, index) => (
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
                  {cashier.name}
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
                    <div className="data-value">{cashier.name}</div>
                  </div>
                  <div className="phone-number">
                    <div className="data-key">
                      <BsFillTelephoneFill />
                      <span>Phone Number:</span>
                    </div>
                    <div className="data-value">{cashier.phone}</div>
                  </div>
                  <div className="password">
                    <div className="data-key">
                      <RiLockPasswordFill />
                      <span>Password:</span>
                    </div>
                    <div className="data-value">{cashier.password}</div>
                  </div>
                  <div className="action-btns">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setUpdateCashier({ ...cashier, type: "CASHIER" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        setDeleteCashier({ ...cashier, type: "CASHIER" })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "No Cashiers In The System"}
      <UpdateCashier
        cashier={updateCashier}
        show={!!updateCashier}
        onHide={() => setUpdateCashier(false)}
      />
      <DeleteCashier
        cashier={deleteCashier}
        show={!!deleteCashier}
        onHide={() => setDeleteCashier(false)}
      />
    </div>
  );
};

export default Cashiers;
