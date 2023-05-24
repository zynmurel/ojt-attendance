// UI design
import { Button, Card, Form, Input, Typography } from "antd";
import { LOGIN_USER } from "../graphql/query";
//text typography
import { useLazyQuery } from "@apollo/client";
import { useAuth } from "../hooks/Auth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
const { Text } = Typography;
// Rules and Validation
const rules = {
  username: [{ required: true, message: "user not found" }],
  password: [
    {
      required: true,
      message: "password incorrect",
    },
  ],
};
const Login = () => {
  const { login, userToken } = useAuth();
  const [form] = Form.useForm();

  // data in  Query
  const [getUser, { data, loading, error }] = useLazyQuery(LOGIN_USER);

  useEffect(() => {
    //checker if user was found on login
    noUserFound();

    //condition if has token redirect to dashboard
    noUserToken();

    // Condition in the admin to the dashboard
    toLogin();
  }, [data]);

  const noUserFound = () => {
    if (data?.ojt_attendance_user.length === 0) {
      form.setFields([
        {
          name: "username",
          errors: ["User not found"],
        },
        {
          name: "password",
          errors: ["User not found"],
        },
      ]);
    }
  };

  const noUserToken = () => {
    if (userToken) {
      return <Navigate to="/" />;
    }
  };

  const toLogin = () => {
    if (data && data.ojt_attendance_user.length !== 0) {
      login(data.ojt_attendance_user[0]);
    }
  };

  const onLogin = (value) => {
    getUser({
      variables: {
        username: value.username,
        password: value.password,
      },
    });
  };
  return (
    <div
      className=" h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: "#eaeff5" }}
    >
      <Card className=" flex items-center justify-center h-96 w-96">
        <div className=" flex flex-row justify-between items-center p-4">
          <img
            src="DigitalImage.jpg"
            alt="Digital Image "
            style={{ height: "27px" }}
          />
          <img
            src="InternAttendance.jpg"
            alt="Intern Attendace"
            style={{ height: "37px" }}
          />
        </div>
        <Form form={form} onFinish={onLogin}>
          <div className=" mb-3">
            <Text>Username</Text>
          </div>
          <Form.Item rules={rules.username} name="username">
            <Input placeholder="username" />
          </Form.Item>
          <div className=" mb-3">
            <Text>Password</Text>
          </div>
          <Form.Item rules={rules.password} name="password">
            <Input.Password placeholder="password" />
          </Form.Item>
          <Button
            className="  text-white w-full"
            style={{ backgroundColor: "#102c34" }}
            htmlType="submit"
          >
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
