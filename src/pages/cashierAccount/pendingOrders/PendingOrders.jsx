import React from "react";
import CashierLayout from "../../../components/cashierLayout/CashierLayout";
import PendingOrders from "../../../components/cashierAccount/pendingOrders/PendingOrders";

const PendingOrdersPage = () => {
  return (
    <CashierLayout>
      <div className="container pending-orders">
        <PendingOrders />
      </div>
    </CashierLayout>
  );
};

export default PendingOrdersPage;
