import "./OrderHistory.css";
import Layout from "../../../components/layout/Layout";
import OrderHistory from "../../../components/account/order_history/OrderHistory";

const OrderHistoryPage = () => {
  return (
    <Layout>
      <div className="container history-page-wrapper">
        <OrderHistory />
      </div>
    </Layout>
  );
};

export default OrderHistoryPage;
