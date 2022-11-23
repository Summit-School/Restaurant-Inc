import "./Waiters.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { deleteStaff } from "../../../api/firebase/auth.api.ts";
import { toast } from "react-toastify";

const DeleteWaiter = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteWaiter = async () => {
    setLoading(true);

    const staffData = {
      id: props.waiter.id,
      name: props.waiter.name,
      phone: props.waiter.phone,
      password: props.waiter.password,
    };

    try {
      const response = await deleteStaff(staffData, props.waiter.type);
      console.log(response);
      if (response) {
        toast.success("User Deleted");
        setLoading(false);
        props.onHide();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed");
      console.error(error);
    }
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center "
      // key={remount}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="change-password-body">
        <p>Are you sure you want to delete {props.waiter.name}</p>
        <div className="delete-actions">
          <button className="yes-btn" onClick={deleteWaiter}>
            {loading ? "Loading..." : "Yes"}
          </button>
          <button className="no-btn" onClick={() => props.onHide()}>
            No
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteWaiter;
