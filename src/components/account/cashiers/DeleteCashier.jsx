import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { deleteStaff } from "../../../api/firebase/auth.api.ts";
import { toast } from "react-toastify";

const DeleteCashier = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteCashier = async () => {
    setLoading(true);

    const staffData = {
      id: props.cashier.id,
      name: props.cashier.name,
      phone: props.cashier.phone,
      password: props.cashier.password,
    };

    try {
      const response = await deleteStaff(staffData, props.cashier.type);
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
        <p>Are you sure you want to delete {props.cashier.name}</p>
        <div className="delete-actions">
          <button className="yes-btn" onClick={deleteCashier}>
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

export default DeleteCashier;
