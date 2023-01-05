import React, { useState, lazy, Suspense, useEffect } from "react";
import { MessageBus } from "@podium/browser";
import LazyService from "./components/LazyService";
import { LoadingHeader } from "./components/header/LoadingHeader";
import { ErrorHeader } from "./components/header/ErrorHeader";
import { remotes } from "./remotes";
const messageBus = new MessageBus();
const getUser = () =>
  fetch("https://jsonplaceholder.typicode.com/users/1").then((response) =>
    response.json()
  );

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    messageBus.publish("state", "user", user);
  }, [user]);

  return (
    <>
      <LazyService
        microservice={remotes.header}
        loadingMessage={<LoadingHeader />}
        errorMessage={<ErrorHeader />}
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
