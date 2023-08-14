import React, { useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USERS, USERS_COUNT } from "./queries";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "./Loading";

const UserSubscription = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const { data: subscriptionData } = useSubscription(USERS_COUNT);

  useEffect(() => {
    if (
      subscriptionData &&
      data &&
      subscriptionData.count !== data.users.length
    ) {
      refetch();
    }
  }, [subscriptionData, data, refetch]);

  if (loading) return <Loading/>;
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
