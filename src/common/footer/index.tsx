import React, { FC } from "react";
import { Social } from "../../common";

export const Footer: FC = () => {
  return (
    <>
      <span className="fixed-bottom mb-5">
        <Social github="3mincan" linkedin="edemirkaya" telegram="edemirkaya" />
        <a className="pexellogo" href="https://www.pexels.com">
          Background images are provided by{" "}
          <img
            className="pexellogo"
            src="https://images.pexels.com/lib/api/pexels-white.png"
          />
        </a>
      </span>
    </>
  );
};
