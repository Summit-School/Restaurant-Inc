import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdateCounter from "./UpdateCounter";
import DeleteCounter from "./DeleteCounter";
import { getStaffByType } from "../../../api/firebase/staff.api.ts";

const Counter = () => {
  const [updateCounter, setUpdateCounter] = useState("");
  const [deleteCounter, setDeleteCounter] = useState("");
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    getStaffByType("COUNTER", (response) => {
      setCounters(response);
    });
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">COUNTER STAFF</div>
      {counters.length > 0
        ? counters.map((counter, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseOne${index}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {counter.name}
                </button>
              </h2>
              <div
                id={`collapseOne${index}`}
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
                    <div className="data-value">{counter.name}</div>
                  </div>
                  <div className="phone-number">
                    <div className="data-key">
                      <BsFillTelephoneFill />
                      <span>Phone Number:</span>
                    </div>
                    <div className="data-value">{counter.phone}</div>
                  </div>
                  <div className="password">
                    <div className="data-key">
                      <RiLockPasswordFill />
                      <span>Password:</span>
                    </div>
                    <div className="data-value">{counter.password}</div>
                  </div>
                  <div className="action-btns">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setUpdateCounter({ ...counter, type: "COUNTER" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        setDeleteCounter({ ...counter, type: "COUNTER" })
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
      <UpdateCounter
        counter={updateCounter}
        show={!!updateCounter}
        onHide={() => setUpdateCounter(false)}
      />
      <DeleteCounter
        counter={deleteCounter}
        show={!!deleteCounter}
        onHide={() => setDeleteCounter(false)}
      />
    </div>
  );
};

export default Counter;
