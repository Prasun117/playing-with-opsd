import "./styles.css";
import OpenSeadragonViewer from "./OpenSeadragonViewer";
import OpenSeadragonSync from "./OpenSeaDragonSync";
export default function App() {
  const tileSource =
    "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi";

  return (
    <div className="App">
      <h1>OpenSeadragon in React</h1>
      <OpenSeadragonViewer tileSource={tileSource} />
      {/* <OpenSeadragonViewer tileSource={tileSource} />  */}
      {/* <OpenSeadragonSync /> */}
    </div>
  );
}
