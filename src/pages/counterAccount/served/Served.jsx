import React from "react";
import KitchenLayout from "../../../components/counterLayout/CounterLayout";
import Served from "../../../components/counterAccount/served/Served";

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
