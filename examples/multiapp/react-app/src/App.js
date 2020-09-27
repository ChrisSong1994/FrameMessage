import React, { useEffect, useState } from "react";
import { Client, Server } from "../../../../es";

const App = () => {
  const [client, setClient] = useState(new Client(window.parent));
  const [server, setServer] = useState(new Server());
  const [theme, setTheme] = useState("#ffffff");

  useEffect(() => {
    server.listen("CHANGE_THEME", (req, res, next) => {
      console.log(req.data.theme)
      setTheme(req.data.theme);
    });

    return () => server.close();
  });

  const getUserInfo = () => {
    client
      .request("CHANGE_THEME", { color: "#FFE4B5" })
      .then((res) => {
        console.log(res);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  return (
    <div className="App" style={{ background: theme }}>
      <h1>react-app</h1>
      <button onClick={getUserInfo}>获取用户信息</button>
    </div>
  );
};

export default App;
