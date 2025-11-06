import { useState } from "react";

export default function RangeSlider() {
  const [value, setValue] = useState(50);
  return <>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-blue"
    />
  </>;
};

