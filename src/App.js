import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import { useAuth } from "./hooks/Auth";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser {
    user {
      email
      password
      role
      employee_id
      id
    }
  }
`;
function App() {
  const { data, loading, error } = useQuery(GET_USER);
  console.log(data && data);
  return <>sdfas</>;
}

export default App;
