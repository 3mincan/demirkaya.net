import React, { FC } from "react";
import "./style.scss";
import { Stackoverflow } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../../common";

export const About: FC = () => {
  return (
    <>
      <h1 className="flex-fill font-weight-bold h2 my-5">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span className="m-3">About</span>
      </h1>
      <p>Hi! This is Project B-TOP! (Bring Together Online Presence)</p>
      <p>
        We all fill too many forms and profiles. So who wants to write another
        content?
      </p>
      <p>
        Lol! Maybe you, not me. This project are full of APIs. Here they are:
      </p>
      <p>Pexels Api (for Site Background)</p>
      <p>Github Api (on Home Page)</p>
      <p>dev.to api (on Articles Page)</p>
      <p>formspree.io api(on Contact Page)</p>
      <p>And this is the content that I couldn't decide where should I put:</p>
      <Stackoverflow id="2761949" />
      <Footer />
    </>
  );
};
