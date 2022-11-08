import React, { useState, lazy, Suspense, useEffect } from "react";
import LazyService from "./components/LazyService";
import { remotes } from "./remotes";

const getUser = () =>
  fetch("https://jsonplaceholder.typicode.com/users/1").then((response) =>
    response.json()
  );

const App = () => {
  const [user, setUser] = useState();
  console.log({ user });

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      document.dispatchEvent(
        new CustomEvent("state:user", {
          detail: {
            user: data,
          },
        })
      );
    });
  }, []);

  return (
    <>
      <LazyService
        microservice={remotes.header}
        loadingMessage={"...cargando header"}
        errorMessage={<div>Fallback Header</div>}
      />
      <LazyService
        microservice={remotes.content}
        loadingMessage={"...cargando content"}
        errorMessage={<div>Fallback Content</div>}
      />
      <LazyService
        microservice={remotes.footer}
        loadingMessage={"...cargando footer"}
        errorMessage={<div>Fallback Footer</div>}
      />
      <LazyService
        microservice={remotes.helpCenter}
        loadingMessage={"...cargando helpCenter"}
        errorMessage={<div>Fallback HelpCenter</div>}
      />
    </>
  );
};

export default App;
