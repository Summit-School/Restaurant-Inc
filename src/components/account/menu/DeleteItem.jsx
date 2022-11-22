import Modal from "react-bootstrap/Modal";
import { DeleteMenuItem } from "../../../api/firebase/menu.api.ts";
import { toast } from "react-toastify";
import { useState } from "react";

const DeleteItem = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = () => {
    setLoading(true);
    try {
      const response = DeleteMenuItem(props.item.id);

      if (response) {
        toast.success("Item Deleted");
        setLoading(false);
        props.onHide();
      }
    } catch (error) {
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
        <p>Are you sure you want to delete this item</p>
        <div className="delete-actions">
          <button className="yes-btn" onClick={deleteItem}>
            {loading ? "Loading..." : "Yes"}
          </button>
          <button className="no-btn" onClick={props.onHide}>
            No
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteItem;
