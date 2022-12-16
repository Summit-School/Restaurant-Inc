import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { editToInventory } from "../../../api/firebase/inventory.api.ts";
import { toast } from "react-toastify";

const ReleaseStock = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemLoading, setItemLoading] = useState(false);

  const releaseItemFromStore = async (e) => {
    e.preventDefault();
    setItemLoading(true);

    try {
      const response = await editToInventory(props.stock.id, itemQuantity);
      if (response) {
        toast.success("Item Edited");
        setItemQuantity(0);
        setItemLoading(false);
      }
    } catch (error) {
      setItemLoading(false);
      console.error(error);
      toast.error("Failed");
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
          <h3>Edit {props.stock.itemName} In Inventory</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <form className="">
          <div className="item-quantity">
            <input
              type="number"
              className="form-control"
              placeholder="Quantity (Bags/Creates)"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button
          className="modal-btn form-control-sm"
          onClick={releaseItemFromStore}
        >
          {itemLoading ? "Loading..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReleaseStock;
