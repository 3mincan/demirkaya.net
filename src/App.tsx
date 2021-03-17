import React, { FC, useState, useCallback, useEffect } from "react";
import { Home, About, Articles, Contact, Skills } from "./pages";
import "./App.scss";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Loader } from "./common";
import { Navbar } from "./common";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";
import { createClient } from "pexels";

type State = {
  isLoading: boolean;
  data: any;
};

const client = createClient(
  "563492ad6f9170000100000108d022f898e74def841bb1e123526a7f"
);

const splashbaseBg = "http://www.splashbase.co/api/v1/images/random";
ReactGA.initialize("UA-136784405-1");
ReactGA.pageview(window.location.pathname + window.location.search);

export const App: FC = () => {
  const [{ isLoading, data }, setState] = useState<State>({
    isLoading: true,
    data: [],
  });

  const fetchBackground = useCallback(async () => {
    console.info("I stand with Black Lives Matter");
    setState((state) => ({ ...state, isLoading: true }));
    try {
      client.photos.curated().then((photos) => {
        setState((state) => ({
          ...state,
          data: photos,
          isLoading: false,
        }));
      });
    } catch (err) {
      setState((state) => ({
        ...state,
        isLoading: false,
      }));
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchBackground();
  }, [fetchBackground]);

  console.log(data);

  var rndm = Math.floor(Math.random() * 11);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <style>{`div.bg-image { background-image: url("${data.photos[rndm].src.original}") `}</style>
          </Helmet>
          <div className="bg-image"></div>
          <div id="content" className="full">
            <Router>
              <Navbar />
              <div className="d-flex flex-column justify-content-center align-items-center main-content">
                <div className="container">
                  <Switch>
                    <Route path="/contact" exact>
                      <Contact />
                    </Route>
                    <Route path="/about" exact>
                      <About />
                    </Route>
                    <Route path="/articles" exact>
                      <Articles />
                    </Route>
                    <Route path="/skills" exact>
                      <Skills />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </div>
            </Router>
          </div>
        </>
      )}
    </>
  );
};
