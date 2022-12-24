import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { editToInventory } from "../../../api/firebase/inventory.api.ts";
import { toast } from "react-toastify";

const ReleaseStock = (props) => {
  // const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setQuantity] = useState(0);
  const [itemLoading, setItemLoading] = useState(false);

  const releaseItemFromStore = async (e) => {
    e.preventDefault();
    setItemLoading(true);

    try {
      props.stock.initialQuantity =
        parseInt(props.stock.itemQuantity) + parseInt(itemQuantity);
      props.stock.itemQuantity = parseInt(props.stock.initialQuantity);
      props.stock.itemPrice = parseInt(itemPrice);

      const response = await editToInventory(props.stock, props.stock.id);
      if (response) {
        toast.success("Item Edited");
        setQuantity(0);
        setItemPrice(0);
        setItemLoading(false);
        props.onHide();
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
          {/* <div className="item-quantity">
            <input
              type="text"
              className="form-control"
              placeholder="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div> */}
          {/* <div>
            Balance:{" "}
            {parseInt(props.stock.initialQuantity - props.stock.itemQuantity)}
          </div> */}
          <div className="item-quantity">
            <label htmlFor="">Add stock</label>
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={itemQuantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {/* <div>Current price: {props.stock.itemPrice}</div> */}
          <div className="item-quantity">
            <label htmlFor="">Update price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Item Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
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
