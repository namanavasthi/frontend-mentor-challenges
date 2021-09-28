import React, { useEffect, useState } from "react";

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

const getGithubData = async (url) => {
  const auth = `TOKEN ${process.env.REACT_APP_GITHUB_TOKEN}`;

  const HEADERS = {
    "Content-Type": "application/json",
    Authorization: auth,
    Accept: "application/vnd.github.mercy-preview+json",
  };

  const BASE_URL = url.replace("{+path}", "");

  const QUERY = `/files/preview/`;

  const API = BASE_URL + QUERY;

  const response = await fetch(API, {
    method: "GET",
    headers: HEADERS,
  });

  const result = await response.json();

  return result;
};

const getThumbnail = (obj) => {
  return obj.filter((image) => image.name.indexOf("thumbnail") >= 0);
};

export const Card = ({ repo }) => {
  // id, name, contents_url, created_at,
  const { has_pages, homepage, html_url, topics, contents_url, description = "" } = repo;

  const url = has_pages ? homepage : html_url;

  const parsedDescription = getParsedDescription(description);

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!thumbnail) {
      getGithubData(contents_url)
        .then((res) => {
          // from res i'd like to extract thumbnail
          setThumbnail(getThumbnail(res));
        })
        .catch((e) => console.error(e));
    }
  }, [contents_url, setThumbnail, thumbnail]);

  return (
    <article className="p-10 w-full md:w-1/3">
      <div className="shadow-lg">
        <a href={url} target="_blank" className="w-full" rel="noreferrer">
          <img src={thumbnail} alt="decorative" className="w-full" />
        </a>
        <a href={url} target="_blank" className="w-full" rel="noreferrer">
          <h3 className="p-10">{parsedDescription.name ?? ""}</h3>
        </a>
        <h4>
          {topics.map((topic, i) => (
            <span key={i} className="uppercase p-2">
              {topic}
            </span>
          ))}
        </h4>
        <p>{parsedDescription.description ?? ""}</p>
      </div>
    </article>
  );
};
