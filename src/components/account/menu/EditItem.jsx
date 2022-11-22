import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { EditItemToMenu } from "../../../api/firebase/menu.api.ts";
import { toast } from "react-toastify";

const EditItem = (props) => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const [showQuantity, setShowQuantity] = useState("");

  useEffect(() => {
    if (props.item) {
      setName(props.item.itemName);
      setPrice(props.item.price);
      setQuantity(props.item.quantity);
    }
  }, [props]);

  const handleChange = (e) => {
    setShowQuantity(e.target.value);
  };

  const editMenuItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    const itemData = {
      id: props.item.id,
      category,
      name,
      quantity,
      price,
    };

    try {
      const response = await EditItemToMenu(itemData);
      if (response) {
        toast.success("Update Successful");
        setName("");
        setQuantity("");
        setPrice("");
        setLoading(false);
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
      <Modal.Header className="change-password-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {props.item.itemName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <form className="mt-0">
          <div className="pass-field">
            {/* <select onChange={(e) => handleChange(e)} class="form-control mt-2">
              <option>Select Category</option>
              <option value="FOOD">Food</option>
              <option value="DRINKS">Drink</option>
            </select> */}
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {showQuantity === "FOOD" ? (
              ""
            ) : (
              <input
                type="number"
                placeholder="Quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button className="modal-btn form-control-sm" onClick={editMenuItem}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItem;
