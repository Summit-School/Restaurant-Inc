import "./Users.css";
import Layout from "../../../components/layout/Layout";
import Waiters from "../../../components/account/waiters/Waiters";
import Cashiers from "../../../components/account/cashiers/Cashiers";
import Kitchen from "../../../components/account/kitchen/Kitchen";
import Counter from "../../../components/account/counter/Counter";

const Users = () => {
  return (
    <Layout>
      <div className="container staff-page-wrapper">
        <div className="staff-page-scroller">
          <div className="service">
            <Waiters />
          </div>

          <div className="cash-and-kit">
            <div className="cashier">
              <Cashiers />
            </div>
            <div className="kitchen">
              <Kitchen />
            </div>
            <div className="kitchen">
              <Counter />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
