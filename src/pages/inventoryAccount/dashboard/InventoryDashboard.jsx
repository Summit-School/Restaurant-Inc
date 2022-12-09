import "./InventoryDashboard.css";
import { useState, useEffect } from "react";
import InventoryLayout from "../../../components/inventoryLayout/InventoryLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";

import Categories from "../../../components/inventoryAccount/categories/Categories";
import AddCategory from "../../../components/inventoryAccount/categories/AddCategory";
import { MdViewList } from "react-icons/md";
import {
  getInventoryItems,
  getAllReleasedItems,
} from "../../../api/firebase/inventory.api.ts";

const InventoryDashboard = () => {
  const [stock, setStock] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);
  const [releasedStock, setReleasedStock] = useState(0);
  const [releasedStockPrice, setReleasedStockPrice] = useState(0);

  useEffect(() => {
    getInventoryItems((response) => {
      let count = 0;
      response.map((item) => (count += parseInt(item.itemQuantity)));
      setStock(count);

      let price = 0;
      response.map((item) => (price += parseInt(item.itemPrice)));
      setStockPrice(price);
    });

    getAllReleasedItems((response) => {
      let count = 0;
      response.map((item) => (count += parseInt(item.itemQuantity)));
      setReleasedStock(count);

      let price = 0;
      response.map((item) => (price += parseInt(item.itemPrice)));
      setReleasedStockPrice(price);
    });
  }, []);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <InventoryLayout>
      <div className="container">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total Stock"
            value={formatMoney(stock)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total Stock Price"
            value={formatMoney(stockPrice)}
            bgColor="lightgreen"
            cardColor="grey"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total Released Stock"
            value={formatMoney(releasedStock)}
            bgColor="lightgrey"
            cardColor="grey"
          />

          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total Released Stock Price"
            value={formatMoney(releasedStockPrice)}
            bgColor="orange"
            cardColor="grey"
          />
        </div>
        <div className="int-dash-cat">
          <div className="list-all-cats">
            <Categories />
          </div>
          <div className="add-cat">
            <AddCategory />
          </div>
        </div>
      </div>
    </InventoryLayout>
  );
};

export default InventoryDashboard;
