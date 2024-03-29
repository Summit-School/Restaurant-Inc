import "./InitialStock.css";
import InventoryLayout from "../../../components/inventoryLayout/InventoryLayout";
import InitialStock from "../../../components/inventoryAccount/initialStock/InitialStock";

const StockPage = () => {
  return (
    <InventoryLayout>
      <div className="stock-page p-2">
        <InitialStock />
      </div>
    </InventoryLayout>
  );
};

export default StockPage;
