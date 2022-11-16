import React from "react";
import KitchenLayout from "../../../components/kitchenLayout/KitchenLayout";
import PendingDelivery from "../../../components/kitchenAccount/pendingDelivery/PendingDelivery";

const PendingDeliveryPage = () => {
  return (
    <KitchenLayout>
      <div className="container pending-orders">
        <PendingDelivery />
      </div>
    </KitchenLayout>
  );
};

export default PendingDeliveryPage;
