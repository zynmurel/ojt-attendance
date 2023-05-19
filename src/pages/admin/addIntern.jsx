import { Button, Card, DatePicker, Form, Input, Typography, Radio } from "antd";
import UploadProfile from "../../components/uploadProfile";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { ADD_INTERN } from "../../graphql/mutation";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const AddIntern = () => {
  const [imageToView, setImageToView] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [addIntern] = useMutation(ADD_INTERN, {
    onCompleted() {
      navigate("/");
    },
  });
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
    console.log(values);
    addIntern({
      variables: {
        role: "intern",
        password: "Intern123#",
        hours_to_render: 600,
        profile_pic: imageToView,
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        start_date: moment(values.start_date),
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
      <Card className="mb-5 px-10">
        <div className="block lg:flex justify-between w-full">
          <Typography.Title
            className="block"
            level={4}
            style={{ margin: 0, ...styles.title }}
          >
            Add Intern
          </Typography.Title>
          <div className="block lg:flex items-center">
            <Button
              className="w-full lg:w-auto gap-5 flex flex-row items-center"
              type="primary"
              ghost
              htmlType="submit"
            >
              <AiOutlineFileAdd fontSize={20} />
              <p>Add Intern</p>
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
          <div className=" grid grid-cols-3 w-full  mt-10">
            <Form.Item
              label="First Name"
              name="first_name"
              rules={rules.first_name}
              className="w-2/3"
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              label="Middle Name"
              name="middle_name"
              rules={rules.middle_name}
              className="w-2/3"
            >
              <Input className=" w-full" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={rules.last_name}
              className="w-2/3"
            >
              <Input className=" w-full" />
            </Form.Item>
          </div>
          <div className=" grid grid-cols-3 w-full mt-20">
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={rules.start_date}
              className=" w-2/3"
            >
              <DatePicker className=" w-full" />
            </Form.Item>
            <Form.Item
              label="School Name"
              name="school_name"
              rules={rules.school_name}
              className=" w-2/3"
            >
              <Input className=" w-full" />
            </Form.Item>
            <Form.Item
              label="School Address"
              name="school_address"
              rules={rules.school_address}
            >
              <Input className=" w-full" />
            </Form.Item>
          </div>
          <div className=" grid grid-cols-4 w-full mt-20 ">
            <Form.Item
              label="Username"
              name="username"
              rules={rules.username}
              className="w-3/4"
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
              label="Contact Number"
              name="contact_number"
              rules={rules.contact_number}
              className="w-3/4"
            >
              <Input className=" w-full" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={rules.email}
              className="w-3/4"
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