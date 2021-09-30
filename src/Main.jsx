import React from "react";
import { Card } from "./Card";
import { useAppContext } from "./Context";
import { Wrapper } from "./Wrapper";

import { IoIosBatteryDead } from "react-icons/io";

export const Main = () => {
  const { currData } = useAppContext();

  return (
    <main>
      <Wrapper className="flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap lg:justify-center lg:items-stretch py-10 lg:py-20">
        {currData.length ? (
          currData.map((repo, i) => <Card repo={repo} key={i} index={i} />)
        ) : (
          <h2 className="flex flex-col text-3xl justify-center items-center">
            <IoIosBatteryDead className="text-6xl" />
            <span className="pt-5">nothing to show here, cannot find what you are looking for ...</span>
          </h2>
        )}
      </Wrapper>
    </main>
  );
};
