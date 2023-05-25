import React from "react";

//third party libraries
import { AiOutlineDown } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Avatar, Typography, Dropdown, Button, theme } from "antd";

import { useAuth } from "../hooks/Auth";

const UserProfile = () => {
  const {
    token: { colorPrimary, colorBgBase },
  } = theme.useToken();
  const { logout, userRole, userName, userProfile } = useAuth();
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
        <div className="h-full flex w-full flex-nowrap items-center">
          <div className=" w-10 h-10 rounded-full flex items-center  overflow-hidden">
            {userRole === "admin" && (
              <Avatar
                size="large"
                style={{ backgroundColor: colorBgBase }}
                icon={
                  <FaUserCircle
                    className=" h-full w-full"
                    color={colorPrimary}
                  />
                }
              />
            )}
            {userRole !== "admin" && (
              <img
                src={userProfile}
                alt="user_profile"
                className=" h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col items-center self-center mx-2">
            {userRole !== "admin" && (
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
