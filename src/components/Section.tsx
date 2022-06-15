import { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";

const CARDS = 50;

const Section = () => {
  const [bounds, setBounds] = useState<{ left: number; right: number } | null>(
    null
  );

  const [thumb, setThumb] = useState<HTMLDivElement | null>(null);

  const measureTrack = useCallback(
    (track: HTMLDivElement) => {
      if (!track || !thumb) return null;
      setBounds({
        left: track.clientLeft - thumb.clientWidth / 2,
        right: track.clientWidth - thumb.clientWidth / 2,
      });
    },
    [thumb]
  );

  // const [window, setWindow] = useEffect({});

  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-slate-50 p-6">
      <div className="relative w-full overflow-x-scroll min-h-fit bg-yellow-300">
        <div className="relative min-w-fit">
          <div className="min-w-fit h-auto flex flex-row">
            {Array.from({ length: CARDS }).map((_, i) => (
              <div className="w-72 h-96 bg-slate-400 m-6"></div>
            ))}
          </div>
        </div>
      </div>
      <div ref={measureTrack} className="relative h-1 w-full bg-red-400 my-5">
        <Draggable
          onDrag={(_, data) => {
            console.log("DRAGGING", data);
          }}
          bounds={bounds ? bounds : { left: 0, right: 0 }}
          axis="x"
        >
          <div
            ref={setThumb}
            className="absolute w-10 h-5 bg-red-200 -top-2"
          ></div>
        </Draggable>
      </div>
    </div>
  );
};

export default Section;
