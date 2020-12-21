import React, { FC, useState, useCallback, useEffect } from "react";
import { Home, About, Articles, Contact, Skills } from "./pages";
import "./App.scss";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Loader } from "./common";
import { Navbar } from "./common";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";

type State = {
  isLoading: boolean;
  data: any;
};

const splashbaseBg = "https://www.splashbase.co/api/v1/images/random";
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
      const { data } = await axios.get(splashbaseBg);
      setState((state) => ({
        ...state,
        data: data,
        isLoading: false,
      }));
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <style>{`div.bg-image { background-image: url("${data.url}") `}</style>
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
