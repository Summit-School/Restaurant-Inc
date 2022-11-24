import React from "react";
import Layout from "../../../components/layout/Layout";
import Attendance from "../../../components/account/attendance/Attendance";

const AttendancePage = () => {
  return (
    <Layout>
      <div className="container history-page-wrapper">
        <Attendance />
      </div>
    </Layout>
  );
};

export default AttendancePage;
