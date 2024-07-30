import { Table } from "components/table";
import { useAuth } from "contexts/auth-contexts";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <DashboardHeading
        title="Dashboard"
        desc="Overview dashboard monitor"
      ></DashboardHeading>
    </div>
  );
};

export default DashboardPage;
