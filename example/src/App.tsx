import { CSSProperties, useState } from "react";
import "./App.css";
import StyleEditor from "../../src";
import ReactJson from "react-json-view";

function App() {
  const [value, setValue] = useState<CSSProperties>({});

  return (
    <div className="App">
      <h1>StyleEditor</h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: 480, display: "flex", flexDirection: "column" }}>
          <ReactJson src={value} collapsed={false} />
        </div>
        <div style={{ width: 265 }}>
          <StyleEditor
            options={["bgImage", "bgColor", "padding", "border"]}
            value={value}
            onChange={(val) => {
              console.log("setValue", val);
              setValue({ ...value, ...val });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
