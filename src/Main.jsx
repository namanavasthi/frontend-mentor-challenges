import React, { useEffect } from "react";

import { Wrapper } from "./Wrapper";
import { Card } from "./Card";

import { useCONTEXT } from "./Context";

const getGithubData = async () => {
  const HEADERS = {
    Authorization: "Token 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",
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

  return result.filter((repo) => repo.name.indexOf("frontend-mentor") >= 0);
};

export const Main = () => {
  const { DATA, setDATA } = useCONTEXT();

  useEffect(() => {
    if (!DATA.length) {
      getGithubData()
        .then((result) => {
          console.log(result);
          setDATA(result);
        })
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
