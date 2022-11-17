import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";

const EditItem = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showQuantity, setShowQuantity] = useState("");

  const handleChange = (e) => {
    setShowQuantity(e.target.value);
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
          Edit Itemname
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <form className="mt-0">
          <div className="pass-field">
            <select onChange={(e) => handleChange(e)} class="form-control mt-2">
              <option>Select Category</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Name"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Price"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showQuantity === "food" ? (
              ""
            ) : (
              <input
                type="number"
                placeholder="Quantity"
                className="form-control"
              />
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button className="modal-btn form-control-sm">
          {/* {loading ? <Spinner /> : "Submit"} */}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItem;
