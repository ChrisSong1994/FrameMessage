import React, { useEffect, useState } from "react";
import { Client, Server } from "../../../../dist";

const App = () => {
  const [client, setClient] = useState(
    new Client(window.parent, "http://localhost:7000/")
  );
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = () => {
    client
      .request("GET_USER_INFO", { color: "#FFE4B5" })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  return (
    <div className="App" style={{ background: "#ffffff" }}>
      <h1>react-app</h1>
      <button onClick={getUserInfo}>获取用户信息</button>
      <div>{JSON.stringify(userInfo)} </div>
    </div>
  );
};

export default App;
