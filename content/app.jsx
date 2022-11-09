import React, { useState, useEffect } from "react";
import { MessageBus } from "@podium/browser";
import Card from "./components/Card";
import "./index.css";
const messageBus = new MessageBus();
const getPost = ({ userId }) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then(
    (response) => response.json()
  );

export default function App({ shouldFetch }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState();
  console.log({ posts });

  useEffect(() => {
    if (user?.id) {
      getPost({ userId: user?.id }).then((data) => {
        setPosts(data);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    const event = messageBus.peek("state", "user");
    event && setUser(event.payload);
    messageBus.subscribe("state", "user", (event) => {
      setUser(event.payload);
    });

    return () => messageBus.unsubscribe("state", "user");
  }, []);

  return (
    <div className="content">
      {posts &&
        posts.map(({ id, title, body }) => (
          <Card key={id} title={title} content={body} />
        ))}
    </div>
  );
}
