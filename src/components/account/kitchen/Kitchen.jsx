import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdateKitchen from "./UpdateKitchen";
import DeleteKitchen from "./DeleteKitchen";

const Kitchen = () => {
  const [updateKitchen, setUpdateKitchen] = useState(false);
  const [deleteKitchen, setDeleteKitchen] = useState(false);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Kitchen</div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Mike Dane
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
              <div className="data-value">Mike Dane</div>
            </div>
            <div className="phone-number">
              <div className="data-key">
                <BsFillTelephoneFill />
                <span>Phone Number:</span>
              </div>
              <div className="data-value">+237 672491296</div>
            </div>
            <div className="password">
              <div className="data-key">
                <RiLockPasswordFill />
                <span>Password:</span>
              </div>
              <div className="data-value">1234MyRestaurant</div>
            </div>
            <div className="action-btns">
              <button
                className="edit-btn"
                onClick={() => setUpdateKitchen(true)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => setDeleteKitchen(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateKitchen
        show={updateKitchen}
        onHide={() => setUpdateKitchen(false)}
      />
      <DeleteKitchen
        show={deleteKitchen}
        onHide={() => setDeleteKitchen(false)}
      />
    </div>
  );
};

export default Kitchen;
