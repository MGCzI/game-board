import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as immutableState from "redux-immutable-state-invariant";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./redux/reducer";
import "./index.css";
import App from "./App";
import Welcome from "./welcome";

// const root = ReactDOM.createRoot(
//     document.getElementById("root") as HTMLElement
// );
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default(), thunk))
);

fetch("api/user/id")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // I want to initialize Websocket connection ans pass the store to it
            // init(store);
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,

                document.querySelector("main")
            );
        }
    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
