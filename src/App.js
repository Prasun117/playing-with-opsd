import "./styles.css";
import OpenSeadragonViewer from "./OpenSeadragonViewer";
import OpenSeadragonSync from "./OpenSeaDragonSync";
import OpenSeaDragonProvider from "./OpenSeaDragonContext";
import SyncButton from "./Sync";
export default function App() {
  const tileSource =
    "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi";

  return (
    <div className="App">
      <h1>OpenSeadragon in React</h1>

      <OpenSeaDragonProvider>
        <SyncButton></SyncButton>
        <div style={{ display: "flex" }}>
          <OpenSeadragonViewer
            tileSource={tileSource}
            viewPortName={"ViewPort-1"}
          />
          <OpenSeadragonViewer
            tileSource={tileSource}
            viewPortName={"ViewPort-2"}
          />
          <OpenSeadragonViewer
            tileSource={tileSource}
            viewPortName={"ViewPort-3"}
          />
          {/* <OpenSeadragonViewer
            tileSource={tileSource}
            viewPortName={"ViewPort-4"}
          />
          <OpenSeadragonViewer
            tileSource={tileSource}
            viewPortName={"ViewPort-5"}
          />
          <OpenSeadragonViewer
            tileSource={tileSource}
            viewPortName={"ViewPort-6"}
          /> */}
        </div>
      </OpenSeaDragonProvider>

      {/* <OpenSeadragonViewer tileSource={tileSource} />  */}
      {/* <OpenSeadragonSync /> */}
    </div>
  );
}
