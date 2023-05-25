import React from "react";

//third party libraries
import { AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Avatar, Typography, Dropdown, Button } from "antd";

import { useAuth } from "../hooks/Auth";

const UserProfile = () => {
  const { logout, userRole, userName } = useAuth();
  const { Text } = Typography;
  const dropdownRender = () => (
    <div className="p-1 w-full bg-white rounded-md flex items-center justify-center">
      <Button
        danger
        className="w-full flex gap-2 "
        type="text"
        onClick={logout}
      >
        Logout
        <BiLogOut fontSize={24} />
      </Button>
    </div>
  );
  return (
    <div className=" p-8">
      <Dropdown placement="bottomLeft" dropdownRender={dropdownRender}>
        <div className="h-full flex flex-nowrap items-center">
          <Avatar size="large" icon={<AiOutlineUser />} className=" mr-3" />
          <div className="flex flex-col items-center self-center mx-2">
            {userRole != "admin" && (
              <Text strong className="w-full capitalize">
                {userName}
              </Text>
            )}
            <Text className="w-full text-sm font-light capitalize">
              {userRole}
            </Text>
          </div>
          <AiOutlineDown />
        </div>
      </Dropdown>
    </div>
  );
};

export default UserProfile;
