import React, { useEffect, useState } from "react";
import { Client, Server } from "../../../../es";

const appsInfo = [
  {
    id: "react-app",
    name: "react-app",
    origin: "http://localhost:7001/",
  },
  {
    id: "vue-app",
    name: "vue-app",
    origin: "http://localhost:7002/",
  },
];

const colors = ["#F5222D", "#FFC0CB", "#6495ED", "#D4F2E7", "#FFD700"];

const App = () => {
  const [userInfo, setUserInfo] = useState({ name: "chrissong" });
  const [theme, setTheme] = useState('#ffffff');



  useEffect(() => {
    // const windows = [];
    // for (let app of appsInfo) {
    //   windows.push(document.getElementById(app.id).contentWindow);
    // }
    // setChildrenWindow(windows);

    const server = new Server();
    server.listen("GET_USER_INFO", (req, res, next) => {
      debugger;
      res.success({ userInfo });
      next();
    });

    server.listen("GET_THEME_INFO", (req, res, next) => {
      debugger;
      res.success({ theme });
      next();
    });
  }, []);


  const changeUserInfo = (key, value) => {
    setUserInfo({ [key]: value });
  };

  return (
    <div className="App" style={{background:theme}}>
      <header>
        <div>
          <label htmlFor="name">用户名:</label>
          <input
            type="text"
            id="name"
            value={userInfo["name"]}
            onChange={(e) => {
              changeUserInfo("name", e.target.value);
            }}
          />
        </div>
        <div>
          <span> 切换主题：</span>
          <div>
            {colors.map((color) => {
              return (
                <span
                  className={color}
                  key={color}
                  style={{
                    background: color,
                    display: "inline-block",
                    width: 20,
                    height: 20,
                    margin: "0 2px",
                    cursor: "pointer",
                  }}
                  onClick={() => setTheme(color)}
                ></span>
              );
            })}
          </div>
        </div>
      </header>
      <div>
        {appsInfo.map((app) => {
          return (
            <iframe
              id={app.id}
              key={app.id}
              className={app.name}
              src={app.origin}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
