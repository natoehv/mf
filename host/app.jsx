import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";

const Header = lazy(() => import("header/index"));
const Content = lazy(() => import("content/index"));
const Footer = lazy(() => import("footer/index"));
const HelpCenter = lazy(() => import("helpCenter/index"));

const App = () => {

    return (
        <>
        hola sdfsf

            <Suspense fallback={<div>loading</div>}>
            <Header></Header>

            <Content></Content>
                <Footer />
                <HelpCenter />
            </Suspense>
        </>
    );
};

export default App;
