import React from "react";
import { useAppContext } from "./Context";

export const Options = () => {
  const { currData, setCurrData } = useAppContext();

  const filter = async () => {
    const tempData = [...currData].reverse();

    setCurrData(tempData);
  };

  return (
    <nav>
      <h1>hide in progress</h1>
      <button onClick={() => filter()}>filter me</button>
      <h1>sort</h1>
    </nav>
  );
};
