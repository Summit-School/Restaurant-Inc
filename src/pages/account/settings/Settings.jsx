import "./Settings.css";
import Layout from "../../../components/layout/Layout";
import AddStaff from "../../../components/account/settings/AddStaff";
import AddTable from "../../../components/account/settings/AddTable";

const Settings = () => {
  return (
    <Layout>
      <div className="container settings-page-wrapper">
        <div className="add-staff">
          <AddStaff />
        </div>
        <div className="add-table">
          <AddTable />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
