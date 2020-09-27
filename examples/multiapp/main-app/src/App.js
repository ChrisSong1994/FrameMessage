import React, { useEffect, useState } from "react";
import { Client, Server } from "../../../../es";

const appsInfo = [
  {
    id: "react-app",
    name: "react-app",
    origin: "http://localhost:7001/",
  },
  // {
  //   id: "vue-app",
  //   name: "vue-app",
  //   origin: "http://localhost:7002/",
  // },
];

const colors = ["#F5222D", "#FFC0CB", "#6495ED", "#D4F2E7", "#FFD700"];

const App = () => {
  const [userInfo, setUserInfo] = useState({ name: "chrissong" });
  const [childrenWindow, setChildrenWindow] = useState([]);
  useEffect(() => {
    const windows = [];
    for (let app of appsInfo) {
      windows.push(document.getElementById(app.id).contentWindow);
    }
    debugger;
    setChildrenWindow(windows);
  }, []);

  const changeTheme = (theme) => {
    for (let clientWindow of childrenWindow) {
      const client = new Client(clientWindow);
      client
        .request("CHANGE_THEME", { theme })
        .then((res) => {
          debugger;
          console.log(res);
        })
        .catch((data) => {
          debugger;
          console.log(data);
        });
    }
  };

  const changeUserInfo = (key, value) => {
    setUserInfo({ [key]: value });
  };

  return (
    <div className="App">
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
                  onClick={() => changeTheme(color)}
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
