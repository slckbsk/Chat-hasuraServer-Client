import React, { useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USERS, USERS_COUNT } from "./queries";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "./Loading";
import Form from "react-bootstrap/Form";

const UserSubscription = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const { data: subscriptionData } = useSubscription(USERS_COUNT);

  const userCount = subscriptionData?.users_aggregate?.aggregate?.count;

  useEffect(() => {
    if (subscriptionData && data && userCount !== data.users.length) {
      refetch();
    }
  }, [subscriptionData, data, userCount, refetch]);

  if (loading) return <Loading />;
  if (error) return <div>Error!: {error.message}</div>;

  const newUser = data.users;

  return (
    <div>
      <ListGroup
        style={{
          height: 200,
          overflowY: "scroll",
        }}
      >
        <Form.Label>ONLINE USER LIST / {userCount} PEOPLE ONLINE</Form.Label>
        {newUser.map((user, index) => (
          <div key={index}>
            <ListGroup.Item>{user.user}</ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserSubscription;
