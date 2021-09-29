import { createContext, useContext } from "react";

const DATA = [];
const CURR = [];
const OPTIONS = {
  hideCompleted: false,
};

export const CONTEXT = createContext({
  data: DATA,
  setData: (data) => {},
  currData: CURR,
  setCurrData: (curr) => {},
  options: OPTIONS,
  setOpions: (options) => {},
});
export const useAppContext = () => useContext(CONTEXT);
