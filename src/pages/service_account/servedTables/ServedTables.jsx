import React from "react";
import Layout from "../../../components/service_layout/Layout";
import CompletedTables from "../../../components/service_account/completedTables/CompletedTables";

const ServedTablesPage = () => {
  return (
    <Layout>
      <div className="pending-orders">
        <CompletedTables />
      </div>
    </Layout>
  );
};

export default ServedTablesPage;
