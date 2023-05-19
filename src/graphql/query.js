import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query GetUser($username: String, $password: String) {
    ojt_attendance_user(
      where: { username: { _eq: $username }, password: { _eq: $password } }
    ) {
      hours_to_render
      contact_number
      email
      first_name
      gender
      last_name
      middle_name
      password
      role
      school_address
      school_name
      username
      start_date
      id
      intern_id
    }
  }
`;

export const GET_INTERN = gql`
  query GetUser {
    ojt_attendance_user(where: { role: { _eq: "intern" } }) {
      hours_to_render
      contact_number
      email
      first_name
      gender
      last_name
      middle_name
      password
      profile_pic
      role
      school_address
      school_name
      username
      start_date
      id
      intern_id
    }
  }
`;
