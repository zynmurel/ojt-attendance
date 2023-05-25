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
      profile_pic
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
      attendances {
        total_rendered
      }
    }
  }
`;

export const GET_ATTENDACE_BY_INTERN = gql`
  query GetAttendance($date: String, $intern_id: uuid) {
    ojt_attendance_attendance(
      where: { date: { _eq: $date }, intern_id: { _eq: $intern_id } }
    ) {
      total_rendered
      date
      in_am
      in_pm
      out_am
      out_pm
      id
      intern_id
      am_in_img
      am_out_img
      pm_in_img
      pm_out_img
    }
  }
`;

export const INTERN_LOGS = (condition) => gql`
  query GetAttendance($intern_id: uuid) {
    ojt_attendance_attendance(where: ${condition}) {
      am_in_img
      am_out_img
      date
      in_am
      in_pm
      out_am
      out_pm
      pm_in_img
      pm_out_img
      total_rendered
      id
      intern_id
    }
  }
`;

export const FILTER_INTERN = (condition) => {
  return gql`
  query GetUser($search: String!) {
    ojt_attendance_user(
      where: ${condition}
    ) {
      contact_number
      email
      first_name
      gender
      hours_to_render
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
    }
  }
`;
};
