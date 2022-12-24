import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { deleteStaff } from "../../../api/firebase/auth.api.ts";
import { toast } from "react-toastify";

const DeleteKitchen = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteKitchen = async () => {
    setLoading(true);

    const staffData = {
      id: props.kitchen.id,
      name: props.kitchen.name,
      phone: props.kitchen.phone,
      password: props.kitchen.password,
    };

    try {
      const response = await deleteStaff(staffData, props.kitchen.type);
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
      <Modal.Header
        className="change-password-header"
        closeButton
      ></Modal.Header>
      <Modal.Body className="change-password-body">
        <p>Are you sure you want to delete {props.kitchen.name}</p>
        <div className="delete-actions">
          <button className="yes-btn" onClick={deleteKitchen}>
            {" "}
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

export default DeleteKitchen;
