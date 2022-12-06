import React from "react";
import InventoryLayout from "../../../components/inventoryLayout/InventoryLayout";
import ReleasedStock from "../../../components/inventoryAccount/releasedStock/ReleasedStock";

const ReleasedStockPage = () => {
  return (
    <InventoryLayout>
      <div className="stock-page p-2">
        <ReleasedStock />
      </div>
    </InventoryLayout>
  );
};

export default ReleasedStockPage;
