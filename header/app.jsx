import React, { useEffect, useState } from "react";


const Header = () => {
    const [user, setUser] = useState({});
    const getUser = (evt) => {
        console.log('evt.detail', evt.detail)
        setUser(evt.detail)
        //user = evt.detail
    }
    useEffect(() => {
        document.addEventListener('state:user', getUser)
        return () => document.removeEventListener('state:user', getUser)
    }, []);

    return <div className="header">Header hola: {JSON.stringify(user)}</div>;
}

export default class App extends React.Component {

    render() {
        return <Header />
    }
}