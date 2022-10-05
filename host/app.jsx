import React, { useState, lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";

const Header = lazy(() => import("header/index"));
const Content = lazy(() => import("content/index"));
const Footer = lazy(() => import("footer/index"));
const HelpCenter = lazy(() => import("helpCenter/index"));

const getUser =  () => 
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())


const App = () => {
    const [user, setUser] = useState();
    console.log({user})

    useEffect(() => {
      getUser().then(data => {
        setUser(data)
        document.dispatchEvent(new CustomEvent('state:user', {
            detail: {
                user: data
            }
          }))
      })
      
    }, [])

    return (
        <>
        <Suspense fallback={<div>loading</div>}> <Header /></Suspense>
        <Suspense fallback={<div>loading</div>}> <Content /></Suspense>
        <Suspense fallback={<div>loading</div>}> <Footer /></Suspense>
        <Suspense fallback={<div>loading</div>}> <HelpCenter /></Suspense>
        </>
    );
};

export default App;
