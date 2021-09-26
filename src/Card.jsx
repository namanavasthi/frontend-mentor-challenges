import React from "react";

export const Card = ({ repo }) => {
  // id, name, html_url, homepage, description, topics, contents_url, created_at, has_pages
  const { name } = repo;

  return (
    <article className="p-10 w-full md:w-1/3">
      <div className="shadow-lg">
        <h1 className="p-10">{name}</h1>
      </div>
    </article>
  );
};
