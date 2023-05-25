import { useContext, useState } from "react";

//third party libraries
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Typography,
  Radio,
  InputNumber,
  notification,
} from "antd";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { ADD_INTERN } from "../../graphql/mutation";
import { useNavigate } from "react-router-dom";

import UploadProfile from "../../components/uploadProfile";
import { MyContext } from "../../layout/dashboardLayout";

const { Text } = Typography;
const AddIntern = () => {
  const [imageToView, setImageToView] = useState(null);
  const { handleSuccessAddIntern } = useContext(MyContext);

  //notification
  const [errorAddIntern, contextHolder] = notification.useNotification();
  const handleErrorAddIntern = (type, message, description) => {
    errorAddIntern[type]({
      message: message,
      description: description,
    });
  };

  //navigation and form
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //mutation
  const [addIntern] = useMutation(ADD_INTERN, {
    onCompleted() {
      handleSuccessAddIntern("success", "Success!", "Intern Added!");
      navigate("/admin");
    },
    onError() {
      handleErrorAddIntern(
        "error",
        "Add Intern Error",
        "Username already used!"
      );
    },
  });

  // form rules
  const rules = {
    first_name: [{ required: true, message: "First name is required!" }],
    middle_name: [{ required: true, message: "Middle name is required!" }],
    last_name: [{ required: true, message: "Last name is required!" }],
    start_date: [{ required: true, message: "Start Date is required!" }],
    school_name: [{ required: true, message: "School Name is required!" }],
    school_address: [
      { required: true, message: "School Address is required!" },
    ],
    username: [{ required: true, message: "Username is required!" }],
    email: [{ required: true, type: "email", message: "Email is required!" }],
    hours_to_render: [
      { required: true, message: "Hours to render is Required" },
    ],
    contact_number: [
      () => ({
        validator(_, value) {
          if (!value || phoneNumberSyntax(value)) {
            return Promise.resolve();
          }
          if (!phoneNumberSyntax(value)) {
            return Promise.reject(
              new Error("Please input correct phone number syntax")
            );
          }
        },
      }),
      { required: true },
    ],
  };
  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const styles = {
    title: {
      fontWeight: "bolder",
    },
  };
  function phoneNumberSyntax(str) {
    return /^(09|\+639)\d{9}$/.test(str);
  }
  const handleAddIntern = (values) => {
    addIntern({
      variables: {
        role: "intern",
        password: process.env.REACT_APP_OJT_ATTENDANCE_INTERN_PASSWORD,
        hours_to_render: `${values.hours_to_render}`,
        profile_pic: imageToView,
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        start_date: values.start_date.format(),
        school_name: values.school_name,
        school_address: values.school_address,
        username: values.username,
        gender: values.gender,
        contact_number: values.contact_number,
        email: values.email,
      },
    });
  };
  return (
    <Form
      className="h-full flex flex-col w-full"
      layout="vertical"
      onFinish={handleAddIntern}
      form={form}
    >
      {contextHolder}
      <Card className="mb-5 px-10">
        <div className="flex justify-between items-center w-full">
          <Typography.Title
            className="block"
            level={4}
            style={{ margin: 0, ...styles.title }}
          >
            Add Intern
          </Typography.Title>
          <div className="flex ">
            <Button
              type="primary"
              htmlType="submit"
              className="flex flex-row items-center h-8 w-50"
            >
              <AiOutlineFileAdd className="mr-5 " fontSize={24} />
              <p> Add Intern </p>
            </Button>
          </div>
        </div>
      </Card>
      <Card className="px-10 h-auto items-center">
        <Typography.Title
          className="block"
          level={4}
          style={{ margin: 0, ...styles.title }}
        >
          Intern Information
        </Typography.Title>
        <div className=" flex px-5 py-5 flex-col">
          <div className=" flex flex-row gap-2">
            <UploadProfile
              imageToView={imageToView}
              setImageToView={setImageToView}
            />
            <Text className=" w-44 mt-6" type="secondary">
              Recommended resolution is 640*640 with file size less than 2MB,
              keep visual element centered
            </Text>
          </div>
          <div className=" grid lg:grid-cols-3 w-full lg:mt-10 sm:grid-cols-1">
            <Form.Item
              label="First Name"
              name="first_name"
              rules={rules.first_name}
              className="lg:w-2/3 sm:w-full"
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              label="Middle Name"
              name="middle_name"
              rules={rules.middle_name}
              className="lg:w-2/3 sm:w-full"
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={rules.last_name}
              className="lg:w-2/3 sm:w-full"
            >
              <Input className="w-full" />
            </Form.Item>
          </div>
          <div className=" grid lg:grid-cols-3 w-full lg:mt-20 sm:grid-cols-1">
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={rules.start_date}
              className="lg:w-2/3 sm:w-full"
            >
              <DatePicker className=" w-full" />
            </Form.Item>
            <Form.Item
              label="School Name"
              name="school_name"
              rules={rules.school_name}
              className="lg:w-2/3 sm:w-full"
            >
              <Input className=" w-full" />
            </Form.Item>
            <Form.Item
              label="School Address"
              name="school_address"
              rules={rules.school_address}
            >
              <Input className="lg:w-2/3 sm:w-full" />
            </Form.Item>
          </div>
          <div className=" grid lg:grid-cols-5 w-full lg:mt-20 gap-5 ">
            <Form.Item
              label="Username"
              name="username"
              rules={rules.username}
              className="lg:w-3/4 sm:w-full "
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item label="Gender" name="gender" initialValue="male">
              <Radio.Group>
                {genders.map((g) => (
                  <Radio.Button key={g.value} value={g.value}>
                    {g.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Hours to render"
              name="hours_to_render"
              rules={rules.hours_to_render}
              className="lg:w-3/4 sm:w-full"
            >
              <InputNumber className=" w-full" />
            </Form.Item>
            <Form.Item
              label="Contact Number"
              name="contact_number"
              rules={rules.contact_number}
              className="lg:w-3/4 sm:w-full"
            >
              <Input className=" w-full" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={rules.email}
              className="lg:w-3/4 sm:w-full"
            >
              <Input className=" w-full" />
            </Form.Item>
          </div>
        </div>
      </Card>
    </Form>
  );
};

export default AddIntern;
