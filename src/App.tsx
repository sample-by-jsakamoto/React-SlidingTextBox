import { useState } from "react";
import { getNextLorem } from "./LoremGenerator";
import { NormalTextBox } from "./components/NormalTextBox";
import { SlidingTextBox } from "./components/SlidingTextBox";
import "./App.css";

type Block = {
  id: number;
  text: string;
};

export const App = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [outline, setOutline] = useState(false);
  const cssClass = outline ? "show-outline" : "";

  const OnClickAddNew = () => {
    setBlocks((prev) => [{ id: prev.length + 1, text: `Block ${prev.length + 1}: ${getNextLorem()}` }, ...prev]);
  };

  const OnClickAppendText = () => {
    setBlocks((prev) => prev.map((block, index) => (index === 0 ? { ...block, text: `${block.text} ${getNextLorem()}` } : block)));
  };

  const OnClickToggleOutline = () => {
    setOutline((prev) => !prev);
  };

  return (
    <>
      <header>
        <button onClick={OnClickAddNew}>Add New Block</button>
        <button onClick={OnClickAppendText}>Append Text</button>
        <button onClick={OnClickToggleOutline}>Toggle Outline</button>
      </header>

      <main className={cssClass}>
        <div className="left">
          <h3>Normal</h3>
          <div className="blocks">
            {blocks.map((block) => (
              <NormalTextBox key={block.id} text={block.text} />
            ))}
          </div>
        </div>
        <div className="right">
          <h3>Sliding</h3>
          <div className="blocks">
            {blocks.map((block) => (
              <SlidingTextBox key={block.id} text={block.text} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
