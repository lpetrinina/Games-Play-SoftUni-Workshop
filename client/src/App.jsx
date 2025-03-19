import { Routes, Route } from "react-router";
import { useState } from "react";

import { UserContext } from "./contexts/UserContext";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GameCreate from "./components/game-create/GameCreate";
import GameCatalog from "./components/game-catalog/GameCatalog";
import GameDetails from "./components/game-details/GameDetails";
import GameEdit from "./components/game-edit/GameEdit";

import "./App.css";

function App() {
  const [authData, setAuthData] = useState({});

  const userLoginHandler = (currentUserData) => {
    setAuthData(currentUserData);
  };

  return (
    <UserContext.Provider value={{ ...authData, userLoginHandler }}>
      <div id="box">
        <Header />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GameCatalog />} />
            <Route path="/games/:gameId/details" element={<GameDetails />} />
            <Route path="/games/:gameId/edit" element={<GameEdit />} />
            <Route path="/games/create" element={<GameCreate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
