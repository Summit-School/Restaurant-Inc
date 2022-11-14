import "./Settings.css";
import Layout from "../../../components/layout/Layout";

const Settings = () => {
  return (
    <Layout>
      <div className="container settings-page-wrapper">
        <div className="add-staff">
          <p>Add Staff</p>
          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Staff name"
            />
            <input
              className="form-control"
              type="number"
              placeholder="Phone number"
            />
            <input
              className="form-control"
              type="password"
              placeholder="*********"
            />
            <button>Submit</button>
          </form>
        </div>
        <div className="add-table">
          <p>Add Table</p>
          <form>
            <input
              className="form-control"
              type="number"
              placeholder="Table number"
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
