import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { PollutionImage } from "./features/pollution-image/PollutionImage";
import "normalize.css";
import "antd/dist/antd.css";
import { createStore } from "redux";
import { rootReducer } from "./redux";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { NotFound } from "./features/not-found/NotFound";
import "index.css";
import { useScreenSizeSubscription } from "features/screen-size/useScreenSizeSubscription";

const store = createStore(rootReducer);
const history = createBrowserHistory();

const Subscription = ({ children }) => {
  useScreenSizeSubscription();
  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <Subscription>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={PollutionImage} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </Router>
      </Subscription>
    </Provider>
  );
};

export default App;
