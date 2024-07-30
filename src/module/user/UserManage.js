import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";
import { Button } from "components/button";
import { useAuth } from "contexts/auth-contexts";
import { userRole } from "utils/constants";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN)
    return <div>This page is for ADMIN only</div>;
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
