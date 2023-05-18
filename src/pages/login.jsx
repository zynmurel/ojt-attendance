// UI design
import { Button, Card, Form, Input, Typography } from "antd";
import { LOGIN_USER } from "../graphql/query";
//text typography
import { useLazyQuery } from "@apollo/client";
const { Text } = Typography;
// Rules and Validation
const rules = {
  username: [{ required: true, message: "user not found" }],
  password: [
    {
      required: true,
      message: "password incorrect",
    },
    // {
    //   validator: (_, value) => {
    //     const regex =
    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,})/;
    //     if (!regex.test(value)) {
    //       return Promise.reject(new Error("password incorrect!"));
    //     }
    //     return Promise.resolve();
    //   },
    // },
  ],
};
const Login = () => {
  const [form] = Form.useForm();
  // data in  Query
  const [getUser, { data, loading, error }] = useLazyQuery(LOGIN_USER, {
    variables: {
      username: form.getFieldValue("username"),
      password: form.getFieldValue("password"),
    },
  });
  // Condition in the admin to the dashboard
  if (data && data.ojt_attendance_user.length !== 0) {
    window.location = "/";
  }

  const onLogin = (value) => {
    getUser();
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
