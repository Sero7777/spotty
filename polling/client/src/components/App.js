import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Register from "./Register";
import Header from "./Header";
import Impressum from "./Impressum";
import Profile from "./Profile/Profile";

const App = () => {
    return (
        < BrowserRouter >
            <div className="container">
                <Header />
                <Route exact path="/">
                    <Redirect to="/register" />
                </Route>
                <Route exact path="/register" component={Register} />
                <Route exact path="/impressum" component={Impressum} />
                <Route exact path="/profile" component={Profile} />
            </div>
        </BrowserRouter>
    )
}

export default App;