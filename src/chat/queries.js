import { gql } from "@apollo/client";


export const GET_MESSAGES = gql`
  subscription Message {
  messages {
    user_id
    message_id
    message_text
    messages_user {
      user
    }
  }
}
`;

export const GET_USERS_SUB = gql`
  subscription UserCreated {
    users {
      user_id
      user
    }
  }
`;



export const DELETE_USERS = gql`
  mutation DeleteAllUsers {
    delete_users(where: {}) {
      returning {
        user
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($user_id: Int!) {
    delete_users_by_pk(user_id: $user_id) {
      user
      user_id
    }
  }
`;



export const USERS_COUNT = gql`
  subscription UserCount {
    users_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      user_id
      user
    }
  }
`;

export const POST_MESSAGES = gql`
  mutation PostMessage($user_id: Int!, $content: String!) {
    insert_messages_one(object: { user_id: $user_id, message_text: $content }) {
      message_text
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation CreateUser($user: String!) {
    insert_users_one(object: { user: $user }) {
      user_id
      user
    }
  }
`;
