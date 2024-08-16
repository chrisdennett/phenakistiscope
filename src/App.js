import DiscPlayer from "./components/discPlayer/DiscPlayer";
import { Leva, useControls } from "leva";
import { WebcamCanvas } from "./components/webcamCanvas/WebcamCanvas";
import { useState } from "react";

function App() {
  const [frame, setFrame] = useState({ canvas: null, counter: 0 });

  const controlValues = useControls({
    isSpinning: true,
    msPerFrame: { value: 70, min: 0, max: 400 },
    size: { value: 400, min: 50, max: 800 },
  });

  return (
    <div className="app">
      <Leva collapsed="true" />
      <h1>Gardner Family Phenakistoscopes</h1>

      <WebcamCanvas showVideo="true" setFrame={setFrame} grabInterval={80} />
      <DiscPlayer
        {...controlValues}
        canvas={frame.canvas}
        center={{ x: 0.502, y: 0.492 }}
      />

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
