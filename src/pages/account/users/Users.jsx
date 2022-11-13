import "./Users.css";
import Layout from "../../../components/layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="container staff-page-wrapper">
        <div className="staff-page-scroller">
          <div className="service">service</div>
          <div className="cash-and-kit">
            <div className="cashier">cashier</div>
            <div className="kitchen">kitchen</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
