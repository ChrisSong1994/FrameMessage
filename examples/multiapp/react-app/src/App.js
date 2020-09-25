import React from "react";
import { Client } from "framemessage";

const App = () => {
  const handleChangeTheme = () => {
    const client = new Client(window.parent);
    client
      .request("CHANGE_BG_COLOR", { color: "#FFE4B5" })
      .then((res) => {
        debugger;
        console.log(res);
      })
      .catch((data) => {
        debugger;
        console.log(data);
      });
  };

  return (
    <div className="App">
      <h1>react-app</h1>
      <button onClick={handleChangeTheme}>修改主题</button>
    </div>
  );
};

export default App;
