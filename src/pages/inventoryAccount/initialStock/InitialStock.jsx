import React from "react";
import InventoryLayout from "../../../components/inventoryLayout/InventoryLayout";
import InitialStock from "../../../components/inventoryAccount/initialStock/InitialStock";

const InitialStockPage = () => {
  return (
    <InventoryLayout>
      <div className="stock-page p-2">
        <InitialStock />
      </div>
    </InventoryLayout>
  );
};

export default InitialStockPage;
