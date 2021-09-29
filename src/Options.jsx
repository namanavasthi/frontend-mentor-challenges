import React from "react";
import { useAppContext } from "./Context";
import { Wrapper } from "./Wrapper";

export const Options = () => {
  const { currData, setCurrData, options, setOptions } = useAppContext();

  const filter = async () => {
    const tempData = [...currData].reverse();
    setCurrData(tempData);
  };

  return (
    <Wrapper>
      <nav className="flex flex-row justify-end items-center">
        <form>
          <h1>{options.hideCompleted ? "true" : "false"}</h1>
          <label>
            <input
              className="m-2"
              name="hideCompleted"
              type="checkbox"
              checked={options.hideCompleted}
              onChange={(e) => {
                const temp = {};
                Object.assign(temp, options, { hideCompleted: e.target.checked });
                setOptions(temp);
              }}
            />
            <span className="capitalize">hide completed</span>
          </label>
        </form>
        <button onClick={() => filter()}>filter me</button>
        <h1>sort</h1>
      </nav>
    </Wrapper>
  );
};
