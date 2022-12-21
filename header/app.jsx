import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { MessageBus } from "@podium/browser";
import "./app.scss";

const messageBus = new MessageBus();
const Header = () => {
  const [user, setUser] = useState({});
  const [menuShown, setMenuShown] = useState(false);

  useEffect(() => {
    const event = messageBus.peek("state", "user");
    event && event.payload && setUser(event.payload);
    messageBus.subscribe("state", "user", (event) => {
      event.payload && setUser(event.payload);
    });

    return () => messageBus.unsubscribe("state", "user");
  }, []);

  return (
    <header className="header">
      <nav className="header__nav">
        <button onClick={() => setMenuShown(true)} className="header__burger">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="header__logo">P&P Front</div>
        <div className="header__user">
          {user.username && `Bienvenido ${user.username}`}
        </div>
        {menuShown && (
          <div className="header__menu">
            <button
              onClick={() => setMenuShown(false)}
              className="header__close-menu"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <ul>
              <li>Menu</li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default class App extends React.Component {
  render() {
    return <Header />;
  }
}
