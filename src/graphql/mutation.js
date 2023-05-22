import { gql } from "@apollo/client";

export const ADD_INTERN = gql`
  mutation InsertUser(
    $hours_to_render: String
    $contact_number: String
    $email: String
    $first_name: String
    $gender: String
    $last_name: String
    $middle_name: String
    $password: String
    $profile_pic: String
    $role: String
    $school_address: String
    $school_name: String
    $username: String
    $start_date: timestamptz
  ) {
    insert_ojt_attendance_user(
      objects: {
        hours_to_render: $hours_to_render
        contact_number: $contact_number
        email: $email
        first_name: $first_name
        gender: $gender
        last_name: $last_name
        middle_name: $middle_name
        password: $password
        profile_pic: $profile_pic
        role: $role
        school_address: $school_address
        school_name: $school_name
        username: $username
        start_date: $start_date
      }
    ) {
      affected_rows
      returning {
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
      }
    }
  }
`;

export const INSERT_INTERN_ATTENDANCE = gql`
  mutation InsertAttendance(
    $date: String
    $total_rendered: String
    $out_pm: String
    $out_am: String
    $in_pm: String
    $in_am: String
    $intern_id: uuid!
    $am_in_img: String
    $am_out_img: String
    $pm_in_img: String
    $pm_out_img: String
  ) {
    insert_ojt_attendance_attendance(
      objects: {
        date: $date
        total_rendered: $total_rendered
        out_pm: $out_pm
        out_am: $out_am
        in_pm: $in_pm
        in_am: $in_am
        intern_id: $intern_id
        am_in_img: $am_in_img
        am_out_img: $am_out_img
        pm_in_img: $pm_in_img
        pm_out_img: $pm_out_img
      }
    ) {
      affected_rows
      returning {
        date
        total_rendered
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
  }
`;

export const UPDATE_AM_OUT = gql`
  mutation InsertAttendance(
    $id: uuid!
    $img: String
    $time: String
    $rendered: String
  ) {
    update_ojt_attendance_attendance_by_pk(
      pk_columns: { id: $id }
      _set: { am_out_img: $img, out_am: $time, total_rendered: $rendered }
    ) {
      am_in_img
      am_out_img
      date
      id
      in_am
      in_pm
      intern_id
      out_am
      out_pm
      pm_in_img
      pm_out_img
      total_rendered
    }
  }
`;

export const UPDATE_PM_IN = gql`
  mutation InsertAttendance($id: uuid!, $img: String, $time: String) {
    update_ojt_attendance_attendance_by_pk(
      pk_columns: { id: $id }
      _set: { pm_in_img: $img, in_pm: $time }
    ) {
      am_in_img
      am_out_img
      date
      id
      in_am
      in_pm
      intern_id
      out_am
      out_pm
      pm_in_img
      pm_out_img
      total_rendered
    }
  }
`;
export const UPDATE_PM_OUT = gql`
  mutation InsertAttendance(
    $id: uuid!
    $img: String
    $time: String
    $rendered: String
  ) {
    update_ojt_attendance_attendance_by_pk(
      pk_columns: { id: $id }
      _set: { pm_out_img: $img, out_pm: $time, total_rendered: $rendered }
    ) {
      am_in_img
      am_out_img
      date
      id
      in_am
      in_pm
      intern_id
      out_am
      out_pm
      pm_in_img
      pm_out_img
      total_rendered
    }
  }
`;
