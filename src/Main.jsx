import React from "react";
import { Card } from "./Card";
import { useAppContext } from "./Context";
import { Wrapper } from "./Wrapper";

export const Main = () => {
  const { currData } = useAppContext();

  return (
    <main>
      <Wrapper className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:items-stretch">
        {currData.length
          ? currData.map((repo, i) => {
              console.log(`repo = ${repo.name}`);
              return <Card repo={repo} key={i} index={i} />;
            })
          : null}
      </Wrapper>
    </main>
  );
};
