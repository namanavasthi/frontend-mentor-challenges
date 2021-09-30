import React, { useState } from "react";
import { useAppContext } from "./Context";
import { Wrapper } from "./Wrapper";

import { FaCheck, FaChevronDown } from "react-icons/fa";

export const Options = () => {
  const { options, setOptions } = useAppContext();
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const ListItem = ({ text, active, last = false, order = "recent" }) => {
    return (
      <button
        className="w-full h-full"
        onClick={() => {
          const temp = {};
          Object.assign(temp, options, { sortBy: order });
          setOptions(temp);
          setSortOpen(false);
        }}
      >
        <li
          className={`border-r-2 border-t-2 ${
            active ? "" : "border-l-2"
          } border-gray-200 w-full flex flex-row justify-start items-stretch ${last ? "border-b-2" : ""}`}
        >
          <div className={`w-2 block ${active ? "bg-indigo-800" : "bg-transparent"}`} />
          <span className="p-3 capitalize text-lg">{text}</span>
        </li>
      </button>
    );
  };

  const ListItemSort = ({ text, active, last = false, filter = "" }) => {
    return (
      <button
        className="w-full h-full"
        onClick={() => {
          const temp = {};

          let newFilter = options.filter;

          const findIndex = newFilter.indexOf(filter.toUpperCase());

          if (findIndex === -1) {
            newFilter.push(filter.toUpperCase());
          } else {
            newFilter.splice(findIndex, 1);
          }

          Object.assign(temp, options, { filter: newFilter });

          setOptions(temp);
          setFilterOpen(false);
        }}
      >
        <li
          className={`border-r-2 border-t-2 ${
            active ? "" : "border-l-2"
          } border-gray-200 w-full flex flex-row justify-start items-stretch ${last ? "border-b-2" : ""}`}
        >
          <div className={`w-2 block ${active ? "bg-indigo-800" : "bg-transparent"}`} />
          <span className="p-3 capitalize text-lg">{text}</span>
        </li>
      </button>
    );
  };

  return (
    <Wrapper>
      <nav className="flex flex-wrap justify-center md:flex-nowrap md:flex-row md:justify-end items-stretch md:px-5  tracking-tighter text-sm">
        <button
          className="px-5 py-5 border-b-2 md:border-b-0 border-l-2 border-r-2 border-gray-300 flex flex-row justify-center items-center w-full md:w-auto"
          onClick={() => {
            const temp = {};
            Object.assign(temp, options, { hideCompleted: !options.hideCompleted });
            setOptions(temp);
          }}
        >
          <span
            className={`border-4 flex justify-center items-center border-indigo-700 w-6 h-6 text-white ${
              options.hideCompleted ? "bg-indigo-800 border-indigo-800" : ""
            }`}
          >
            <FaCheck className="m-0" />
          </span>
          <span className="capitalize pl-3">hide completed</span>
        </button>

        <div className="flex flex-row">
          <div className="relative">
            <button
              onClick={() => {
                if (!sortOpen && filterOpen) {
                  setFilterOpen(false);
                }

                setSortOpen(!sortOpen);
              }}
              className="px-5 py-5 border-l-2 md:border-l-0 border-r-2 border-gray-300 uppercase flex flex-row justify-center items-center w-full h-full"
            >
              sort by <FaChevronDown className={`ml-3 ${sortOpen ? "transform rotate-180" : ""}`} />
            </button>
            <div className={`options absolute top-100 z-10 bg-white left-0 ${sortOpen ? "block" : "hidden"}`}>
              <ul className="flex flex-col items-start justify-center w-60">
                <ListItem text="most recent" active={options.sortBy === "recent"} order="recent" />
                <ListItem text="Difficulty (easier first)" active={options.sortBy === "diffAsc"} order="diffAsc" />
                <ListItem
                  text="Difficulty (harder first)"
                  active={options.sortBy === "diffDesc"}
                  last={true}
                  order="diffDesc"
                />
              </ul>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                if (sortOpen && !filterOpen) {
                  setSortOpen(false);
                }

                setFilterOpen(!filterOpen);
              }}
              className="px-5 py-5 border-r-2 border-gray-300 uppercase flex flex-row justify-center items-center w-full h-full"
            >
              filter by <FaChevronDown className={`ml-3 ${filterOpen ? "transform rotate-180" : ""}`} />
            </button>
            <div className={`options absolute top-100 z-10 bg-white left-0 ${filterOpen ? "block" : "hidden"}`}>
              <ul className="flex flex-col items-start justify-center w-52">
                <ListItemSort
                  text="newbie"
                  active={options.filter.indexOf("newbie".toUpperCase()) > -1}
                  filter="newbie"
                />
                <ListItemSort
                  text="junior"
                  active={options.filter.indexOf("junior".toUpperCase()) > -1}
                  filter="junior"
                />
                <ListItemSort
                  text="intermediate"
                  active={options.filter.indexOf("intermediate".toUpperCase()) > -1}
                  filter="intermediate"
                />
                <ListItemSort
                  text="advanced"
                  active={options.filter.indexOf("advanced".toUpperCase()) > -1}
                  filter="advanced"
                />
                <ListItemSort
                  text="guru"
                  active={options.filter.indexOf("guru".toUpperCase()) > -1}
                  filter="guru"
                  last={true}
                />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};
