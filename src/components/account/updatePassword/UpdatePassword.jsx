import "./UpdatePassword.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { changeAdminPassword } from "../../../api/firebase/admin.api.ts";

const UpdatePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChangeHandle = async (e) => {
    setLoading(true);
    if (newPassword != confirmPassword) {
      setLoading(false);
      return toast.error("New passwords do not match");
    }

    const user = await JSON.parse(localStorage.getItem("admin"));
    try {
      const response = await changeAdminPassword(
        user,
        currentPassword,
        newPassword
      );
      if (response) {
        toast.success("Password changed successfully");
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
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <form className="mt-0">
          <div className="pass-field">
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button
          className="modal-btn form-control-sm"
          onClick={passwordChangeHandle}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePassword;
