import "./Stock.css";
import InventoryLayout from "../../../components/inventoryLayout/InventoryLayout";
import Stock from "../../../components/inventoryAccount/stock/Stock";

const StockPage = () => {
  return (
    <InventoryLayout>
      <div className="stock-page p-2">
        <Stock />
      </div>
    </InventoryLayout>
  );
};

export default StockPage;
