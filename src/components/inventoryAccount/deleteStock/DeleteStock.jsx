import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { deleteInventory } from "../../../api/firebase/inventory.api.ts";
import { toast } from "react-toastify";

const ReleaseStock = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = () => {
    setLoading(true);
    try {
      const response = deleteInventory(props.stock.id);

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
      <Modal.Header className="change-password-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Delete {props.stock.itemName} From Inventory</h3>
        </Modal.Title>
      </Modal.Header>
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

export default ReleaseStock;
