import { useState, useEffect } from "react";

const Github = () => {
  const [data, setData] = useState();

  const fetchGithub = async () => {
    const HEADERS = {
      Authorization: "Token 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",
    };

    const BASE_URL = "https://api.github.com";
    const QUERY = `/user/repos`;

    const API = BASE_URL + QUERY;

    const response = await fetch(API, {
      method: "GET",
      headers: HEADERS,
    });

    const result = await response.json();

    setData(result.filter((repo) => repo.name.indexOf("frontend-mentor") >= 0));
  };

  useEffect(() => {
    if (!data) fetchGithub();
  }, [data]);

  return (
    <code>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </code>
  );
};

const App = () => {
  return (
    <div className="flex justify-center">
      <h1>frontend mentor challenges</h1>
      <Github />
    </div>
  );
};

export default App;
