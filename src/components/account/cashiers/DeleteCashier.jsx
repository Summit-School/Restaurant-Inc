import Modal from "react-bootstrap/Modal";
// import { Button } from "react-bootstrap";
// import { useState } from "react";

const DeleteCashier = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center "
      // key={remount}
    >
      <Modal.Header
        className="change-password-header"
        closeButton
      ></Modal.Header>
      <Modal.Body className="change-password-body">
        <p>Are you sure you want to delete username</p>
        <div className="delete-actions">
          <button className="yes-btn">Yes</button>
          <button className="no-btn">No</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCashier;
