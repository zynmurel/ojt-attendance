import { gql } from "@apollo/client"

export const ADD_INTERN = gql `
mutation InsertUser($hours_to_render: Int, $contact_number: String, $email: String, $first_name: String, $gender: String, $last_name: String, $middle_name: String, $password: String, $profile_pic: String, $role: String, $school_address: String, $school_name: String, $username: String, $start_date: timestamptz) {
    insert_ojt_attendance_user(objects: {hours_to_render: $hours_to_render, contact_number: $contact_number, email: $email, first_name: $first_name, gender: $gender, last_name: $last_name, middle_name: $middle_name, password: $password, profile_pic: $profile_pic, role: $role, school_address: $school_address, school_name: $school_name, username: $username, start_date: $start_date}) {
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
  `

      