import React from "react";
import InventoryLayout from "../../../components/inventoryLayout/InventoryLayout";
import ReleaseStock from "../../../components/inventoryAccount/releaseStock/ReleaseStock";

const ReleaseStockPage = () => {
  return (
    <InventoryLayout>
      <div className="stock-page p-2">
        <ReleaseStock />
      </div>
    </InventoryLayout>
  );
};

export default ReleaseStockPage;
