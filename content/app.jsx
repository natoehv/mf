import React, {useState, useEffect} from "react";
import Card from "./components/Card";
import "./index.css";

const getPost = ({ userId }) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then(
    (response) => response.json()
  );

export default function App({ shouldFetch }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState();
  console.log({ posts });
  const getUser = (evt) => {
    console.log("evt.detail", evt.detail);
    setUser(evt.detail.user);
    //user = evt.detail
  };

  useEffect(() => {
    if(user?.id) {
      getPost({ userId: user?.id }).then((data) => {
        setPosts(data);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    document.addEventListener("state:user", getUser);
    return () => document.removeEventListener("state:user", getUser);
  }, []);

  return (
    <div className="content">
      {posts && posts.map(({id, title, body}) => <Card key={id} title={title} content={body} />)}
    </div>
  );
}
