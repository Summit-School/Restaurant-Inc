import React from "react";
import Layout from "../../../components/service_layout/Layout";
import PendingTables from "../../../components/service_account/pending_tables/PendingTables";

const Pendingtables = () => {
  return (
    <Layout>
      <div className="pending-orders">
        <PendingTables />
      </div>
    </Layout>
  );
};

export default Pendingtables;
