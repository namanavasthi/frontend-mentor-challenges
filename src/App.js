import React, { useState } from "react";
import { CONTEXT } from "./Context";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div className="flex justify-center flex-col">
      <CONTEXT.Provider value={{ DATA: data, setDATA: setData }}>
        <Header />
        <Main />
        <Footer />
      </CONTEXT.Provider>
    </div>
  );
};

export default App;
