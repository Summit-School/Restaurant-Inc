import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { editStaffInfo } from "../../../api/firebase/auth.api.ts";
import { toast } from "react-toastify";

const UpdateInventory = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.inventory) {
      setName(props.inventory.name);
      setNumber(props.inventory.phone);
      setCurrentPassword(props.inventory.password);
    }
  }, [props]);

  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const staffData = {
      id: props.inventory.id,
      name: name,
      phone: number,
      password: currentPassword,
    };

    try {
      const response = await editStaffInfo(staffData, props.inventory.type);
      if (response) {
        toast.success("Update Successful");
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
      <Modal.Header className="change-password-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {props.inventory.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <form className="mt-0">
          <div className="pass-field">
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
              placeholder="Phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Confirm Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button className="modal-btn form-control-sm" onClick={updateUser}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateInventory;
