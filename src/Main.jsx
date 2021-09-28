import React, { useEffect } from "react";

import { Wrapper } from "./Wrapper";
import { Card } from "./Card";

import { useCONTEXT } from "./Context";

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

export const Main = () => {
  const { DATA, setDATA } = useCONTEXT();

  useEffect(() => {
    if (!DATA.length) {
      getGithubData()
        .then((result) => setDATA(result))
        .catch((e) => console.error(e));
    }
  }, [DATA.length, setDATA]);

  return (
    <main>
      <Wrapper className="flex flex-col md:flex-row md:flex-wrap">
        {DATA.length ? DATA.map((repo, i) => <Card repo={repo} key={i} />) : null}
      </Wrapper>
    </main>
  );
};
