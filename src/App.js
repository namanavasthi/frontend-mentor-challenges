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
  const [options, setOptions] = useState({ hideCompleted: false, sortBy: "recent", filter: [] });

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

      let filterTemp = [];
      options.filter.forEach((filter) => {
        const filtered = temp.filter((repo) => repo.description.difficulty.split("-")[1] === filter);
        filterTemp = [...filterTemp, ...filtered];
      });

      temp = filterTemp.length ? filterTemp : temp;

      switch (options.sortBy) {
        case "recent":
          temp.sort((repo1, repo2) => new Date(repo2.created_at).getTime() - new Date(repo1.created_at).getTime());
          break;

        case "diffAsc":
          temp.sort(
            (repo1, repo2) => repo1.description.difficulty.split("-")[0] - repo2.description.difficulty.split("-")[0]
          );
          break;

        case "diffDesc":
          temp.sort(
            (repo1, repo2) => repo2.description.difficulty.split("-")[0] - repo1.description.difficulty.split("-")[0]
          );
          break;

        default:
          break;
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
        <hr className="border-t-2 border-gray-200" />
        <Options />
        <hr className="border-t-2 border-gray-200" />
        <Main />
        <Footer />
      </CONTEXT.Provider>
    </div>
  );
};

export default App;
