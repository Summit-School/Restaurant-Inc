import React from "react";
import KitchenLayout from "../../../components/kitchenLayout/KitchenLayout";
import Served from "../../../components/kitchenAccount/served/Served";

const ServedPage = () => {
  return (
    <KitchenLayout>
      <div className="container completed-orders">
        <Served />
      </div>
    </KitchenLayout>
  );
};

export default ServedPage;
