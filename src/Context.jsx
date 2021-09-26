import { createContext, useContext } from "react";

export const DATA = [];

export const CONTEXT = createContext({ DATA: DATA, setDATA: () => {} });
export const useCONTEXT = () => useContext(CONTEXT);
