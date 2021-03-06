import React, { useEffect, useState } from "react";

import { FaGithub } from "react-icons/fa";

import { CgLivePhoto } from "react-icons/cg";

import { GiHalfDead } from "react-icons/gi";

const getGithubImage = async (url) => {
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
  "4-ADVANCED": {
    level: 4,
    tag: "ADVANCED",
    color: "purple-500",
  },
  "5-GURU": {
    level: 5,
    tag: "GURU",
    color: "red-500",
  },
};

const topicMapper = {
  HTML: "purple-600",
  REACT: "blue-600",
  TAILWINDCSS: "pink-600",
};

const statusMapper = {
  Complete: "",
  Progress: "👷",
};

export const Card = ({ repo, index }) => {
  // id, name, created_at,
  const { has_pages, homepage, html_url, topics, contents_url, description = {} } = repo;

  const url = has_pages ? homepage : html_url;

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    getGithubImage(contents_url)
      .then((res) => {
        // from res i'd like to extract thumbnail

        // be default thumbnails have size 0
        if (getThumbnail(res)[0].size !== 0) setThumbnail(getThumbnail(res)[0].download_url);
        else setThumbnail(null);
      })
      .catch((e) => setThumbnail(null));
  }, [repo, index, contents_url]);

  const currentDifficulty = difficultyMapper[description.difficulty];

  const Status = () => {
    const status = statusMapper[description.status];
    return status !== "" ? (
      <span className="absolute z-10 right-0 bottom-0 bg-black bg-opacity-50 px-3 py-1 text-white rounded-2xl mr-3 mb-3">{`in ${status}`}</span>
    ) : null;
  };

  return (
    <article className="w-full max-w-sm lg:max-w-md mx-auto md:w-1/2 xl:w-1/3 p-5">
      <div className="shadow-lg h-full relative pb-16 xl:pb-12">
        <a href={url} target="_blank" className="w-full block relative" rel="noreferrer">
          {thumbnail ? (
            <img src={thumbnail} alt="decorative" className="w-full" style={{ height: "283.36px" }} />
          ) : (
            <div
              className={`w-full flex justify-center items-center bg-${currentDifficulty.color}`}
              style={{ height: "283.36px" }}
            >
              <GiHalfDead className="text-8xl text-white font-bold" />
            </div>
          )}
          <Status />
        </a>
        <div className="flex flex-col p-5 content-between">
          <a href={url} target="_blank" className="w-full" rel="noreferrer">
            <h3 className="text-xl">{description.name ?? ""}</h3>
          </a>
          <div className="uppercase flex flex-row justify-between items-center">
            <ul className="flex flex-row flex-wrap text-sm font-bold">
              {topics.map((topic, i) => (
                <li key={i} className={`uppercase pr-3 text-${topicMapper[topic.toUpperCase()]}`}>
                  {topic}
                </li>
              ))}
            </ul>
            <h4 className="py-4 text-sm lg:text-md font-bold">
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
          <p className="text-sm text-gray-400">{description.description ?? ""}</p>
          <div className="flex flex-row md:justify-center md:items-center absolute bottom-0 left-0 w-full py-5">
            <a
              href={html_url}
              target="_blank"
              className="rounded-lg md:w-1/2 text-md px-5 py-3 md:mx-10 flex flex-row justify-center items-center focus:bg-github hover:bg-github focus:text-white hover:text-white"
              rel="noreferrer"
            >
              <span className="uppercase pr-2">code</span>
              <FaGithub />
            </a>
            <a
              href={url}
              target="_blank"
              className="rounded-lg md:w-1/2 text-md px-5 py-3 md:mx-10 flex flex-row justify-center items-center focus:bg-red-600 hover:bg-red-600 focus:text-white hover:text-white"
              rel="noreferrer"
            >
              <span className="uppercase pr-2">demo</span>
              <CgLivePhoto />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
