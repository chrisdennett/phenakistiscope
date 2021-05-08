import DiscPlayer from "./components/discPlayer/DiscPlayer";
import { Leva, useControls } from "leva";

function App() {
  const controlValues = useControls({
    isSpinning: true,
    msPerFrame: { value: 70, min: 0, max: 400 },
    size: { value: 400, min: 50, max: 800 },
  });

  return (
    <div className="app">
      <Leva collapsed="true" />
      <h1>Gardner Family Phenakistoscopes</h1>
      <div className="discs">
        {discs.map((d, i) => (
          <DiscPlayer key={i} {...d} {...controlValues} />
        ))}
      </div>
    </div>
  );
}

export default App;

const discs = [
  { url: "./img/disc-01.jpg", center: { x: 0.502, y: 0.492 } },
  { url: "./img/disc-02.jpg", center: { x: 0.5, y: 0.5 } },
  { url: "./img/disc-03.jpg", center: { x: 0.5, y: 0.5 } },
  { url: "./img/disc-04.jpg", center: { x: 0.5, y: 0.5 } },
  { url: "./img/disc-05.jpg", center: { x: 0.5, y: 0.5 } },
  { url: "./img/disc-06.jpg", center: { x: 0.5, y: 0.5 } },
  { url: "./img/disc-07.jpg", center: { x: 0.5, y: 0.5 } },
];
