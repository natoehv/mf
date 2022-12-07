import React from "react";
import "./App.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export default function App({ buttonDirection = 'bottom-left' }: { buttonDirection: any }) {
  const btnClasses = classNames(
    "btn-help-center",
    `btn-help-center--${buttonDirection}`
  );

  return (
    <button className={btnClasses}>
      <FontAwesomeIcon icon={faMessage} />
    </button>
  );
}
