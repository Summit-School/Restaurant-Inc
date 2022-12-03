import "./InventoryDashboard.css";
import { useState, useEffect } from "react";
import InventoryLayout from "../../../components/inventoryLayout/InventoryLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";

import Categories from "../../../components/inventoryAccount/categories/Categories";
import AddCategory from "../../../components/inventoryAccount/categories/AddCategory";
import { MdViewList } from "react-icons/md";
// import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const InventoryDashboard = () => {
  useEffect(() => {
    console.log("hello word");
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
            value={formatMoney(10000)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total Stock Sold"
            value={formatMoney(30000)}
            bgColor="lightgrey"
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
