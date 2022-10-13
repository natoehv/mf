import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import "./app.scss";

const Header = () => {
  const [user, setUser] = useState({});
  const [menuShown, setMenuShown] = useState(false);
  const getUser = (evt) => {
    console.log("evt.detail", evt.detail);
    setUser(evt.detail.user);
    //user = evt.detail
  };
  useEffect(() => {
    document.addEventListener("state:user", getUser);
    return () => document.removeEventListener("state:user", getUser);
  }, []);

  return (
    <header className="header">
      <nav className="header__nav">
        <button onClick={() => setMenuShown(true)} className="header__burger">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="header__logo">P&P Front</div>
        <div className="header__user">
          {user.username && `Wena choro ${user.username}`}
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
