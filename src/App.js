import React, { useState, useEffect } from "react";
import { CONTEXT } from "./Context";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { Options } from "./Options";

const getGithubData = async () => {
  const auth = `TOKEN ${process.env.REACT_APP_GITHUB_TOKEN}`;

  const HEADERS = {
    Authorization: auth,
    Accept: "application/vnd.github.mercy-preview+json",
  };

  const BASE_URL = "https://api.github.com";
  const QUERY = `/user/repos`;

  const API = BASE_URL + QUERY;

  const response = await fetch(API, {
    method: "GET",
    headers: HEADERS,
  });

  const result = await response.json();

  const regex = /(frontend-mentor-)\d/g;

  return result.filter((repo) => repo.name.match(regex));
};

const getParsedDescription = (description) => {
  if (description === "") return {};

  let obj = {};

  const pipeSeperated = description.split("|");

  pipeSeperated.forEach((row) => {
    const colonSeperated = row.split(":");
    obj[colonSeperated[0].toLowerCase().trim()] = colonSeperated[1].trim();
  });

  return obj;
};

const App = () => {
  const [data, setData] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [options, setOptions] = useState({ hideCompleted: false });

  useEffect(() => {
    // based on what options are selected we massage data
    // and store it in currData

    let temp = data;

    if (data.length) {
      if (options.hideCompleted) {
        temp = temp.filter((repo) => repo.description.status !== "Complete");
      } else {
        temp = temp.filter((repo) => repo.description.status === "Complete");
      }

      setCurrData(temp);
    }
  }, [options, data]);

  useEffect(() => {
    if (!data.length) {
      getGithubData()
        .then((result) => {
          // massage data
          result.forEach((card) => {
            const parsedDescription = getParsedDescription(card.description);
            card.description = parsedDescription;
          });
          console.log(`-----------------------------------------------------`);
          console.log(`data after massage befoe being set in state`);
          console.log(result);
          console.log(`-----------------------------------------------------`);
          setData(result);
          setCurrData(result);
        })
        .catch((e) => console.error(e));
    }
  }, [data.length, setData]);

  return (
    <div className="flex justify-center flex-col">
      <CONTEXT.Provider value={{ data, setData, currData, setCurrData, options, setOptions }}>
        <Header />
        <Options />
        <Main />
        <Footer />
      </CONTEXT.Provider>
    </div>
  );
};

export default App;
