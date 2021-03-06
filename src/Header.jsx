import React from "react";
import { Wrapper } from "./Wrapper";

export const Header = () => {
  return (
    <header>
      <Wrapper>
        <picture className="p-8 pb-4 w-3/12 md:w-5/12 lg:w-1/4 block">
          <source media="(max-width: 767px)" srcSet="https://www.frontendmentor.io/static/images/logo-mobile.svg" />
          <img
            src="https://www.frontendmentor.io/static/images/logo-desktop.svg"
            alt="Frontend Mentor"
            className="w-full"
          />
        </picture>
      </Wrapper>
    </header>
  );
};
