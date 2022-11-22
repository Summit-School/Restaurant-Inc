import "./Waiters.css";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdateWaiter from "./UpdateWaiter";
import DeleteWaiter from "./DeleteWaiter";
import { getStaffByType } from "../../../api/firebase/staff.api.ts";

const Waiters = () => {
  const [updateWaiter, setUpdateWaiter] = useState("");
  const [deleteWaiter, setDeleteWaiter] = useState(false);
  const [waiters, setWaiters] = useState([]);

  useEffect(() => {
    getStaffByType("SERVICE", (response) => {
      setWaiters(response);
      console.log(response);
    });
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">WAITERS</div>
      {waiters.length > 0
        ? waiters.map((waiter, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {waiter.name}
                </button>
              </h2>
              <div
                id="collapseOne"
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
                    <div className="data-value">{waiter.name}</div>
                  </div>
                  <div className="phone-number">
                    <div className="data-key">
                      <BsFillTelephoneFill />
                      <span>Phone Number:</span>
                    </div>
                    <div className="data-value">{waiter.phone}</div>
                  </div>
                  <div className="password">
                    <div className="data-key">
                      <RiLockPasswordFill />
                      <span>Password:</span>
                    </div>
                    <div className="data-value">{waiter.password}</div>
                  </div>
                  <div className="action-btns">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setUpdateWaiter({ ...waiter, type: "SERVICE" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteWaiter(true)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "No Waiters In The System"}
      <UpdateWaiter
        waiter={updateWaiter}
        show={!!updateWaiter}
        onHide={() => setUpdateWaiter(false)}
      />
      <DeleteWaiter show={deleteWaiter} onHide={() => setDeleteWaiter(false)} />
    </div>
  );
};

export default Waiters;
