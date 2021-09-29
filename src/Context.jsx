import { createContext, useContext } from "react";

const DATA = [];
const CURR = [];

export const CONTEXT = createContext({ data: DATA, setData: (data) => {}, currData: CURR, setCurrData: (curr) => {} });
export const useAppContext = () => useContext(CONTEXT);
