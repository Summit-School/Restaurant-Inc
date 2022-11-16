import React from "react";
import CashierLayout from "../../../components/cashierLayout/CashierLayout";
import PaidOrders from "../../../components/cashierAccount/paidOrders/PaidOrders";

const PaidOrdersPage = () => {
  return (
    <CashierLayout>
      <div className="pending-orders">
        <PaidOrders />
      </div>
    </CashierLayout>
  );
};

export default PaidOrdersPage;
