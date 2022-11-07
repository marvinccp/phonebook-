import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Routing from "./components/routing/Routing";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Header from "./components/header/Header";


import ContactContext from "./context/contact-context/ContactContext.jsx";

let logUser;
if (localStorage.token) {
  const jwt = window.localStorage.getItem("token");
  console.log(jwt);
  setAuthToken(jwt);
  logUser = jwtDecode(jwt);
}

const App = () => {
  const [user] = useState(logUser);
  console.log(user || "No user yet");

  return (
    <ContactContext user={user}>
      <Router>
        <div>
  
          {user && <Navbar user={user} />}
          <div>
            <Routing user={user} />
          </div>
        </div>
      </Router>
    </ContactContext>
  );
};

export default App;
