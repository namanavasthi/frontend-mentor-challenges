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

const difficultyMapper = {
  "1-NEWBIE": {
    level: 1,
    tag: "NEWBIE",
    color: "blue-400",
  },
  "2-JUNIOR": {
    level: 2,
    tag: "JUNIOR",
    color: "green-400",
  },
  "3-INTERMEDIATE": {
    level: 3,
    tag: "INTERMEDIATE",
    color: "yellow-500",
  },
};

const topicMapper = {
  HTML: "purple-600",
  REACT: "blue-600",
  TAILWINDCSS: "pink-600",
};

export const Card = ({ repo }) => {
  // id, name, created_at,
  const { has_pages, homepage, html_url, topics, contents_url, description = "" } = repo;

  const url = has_pages ? homepage : html_url;

  const parsedDescription = getParsedDescription(description);

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!thumbnail) {
      getGithubData(contents_url)
        .then((res) => {
          // from res i'd like to extract thumbnail
          setThumbnail(getThumbnail(res)[0].download_url);
        })
        .catch((e) => console.error(e));
    }
  }, [contents_url, setThumbnail, thumbnail]);

  const currentDifficulty = difficultyMapper[parsedDescription.difficulty];

  return (
    <article className="w-full md:w-1/3 p-5">
      <div className="shadow-lg h-full relative pb-10">
        <a href={url} target="_blank" className="w-full" rel="noreferrer">
          <img src={thumbnail} alt="decorative" className="w-full" />
        </a>
        <div className="flex flex-col p-5 content-between">
          <a href={url} target="_blank" className="w-full" rel="noreferrer">
            <h3 className="text-xl">{parsedDescription.name ?? ""}</h3>
          </a>
          <div className="uppercase flex flex-row justify-between items-center">
            <ul className="flex flex-row flex-wrap text-sm font-bold">
              {topics.map((topic, i) => (
                <li key={i} className={`uppercase pr-3 text-${topicMapper[topic.toUpperCase()]}`}>
                  {topic}
                </li>
              ))}
            </ul>
            <h4 className="py-4 text-md font-bold">
              <span
                className={`text-white font-bold bg-${currentDifficulty.color} rounded-l-md border border-${currentDifficulty.color} p-1`}
              >
                {currentDifficulty.level}
              </span>
              <span
                className={`px-2 py-1 text-${currentDifficulty.color} bg-white border-solid rounded-r-md border border-${currentDifficulty.color}`}
              >
                {currentDifficulty.tag}
              </span>
            </h4>
          </div>
          <p className="text-sm text-gray-400">{parsedDescription.description ?? ""}</p>
          <div className="flex flex-row absolute bottom-0 left-0 w-full py-5">
            <a href={html_url} target="_blank" className="text-md px-5" rel="noreferrer">
              CODE
            </a>
            <a href={url} target="_blank" className="text-md px-5" rel="noreferrer">
              LIVE DEMO
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
