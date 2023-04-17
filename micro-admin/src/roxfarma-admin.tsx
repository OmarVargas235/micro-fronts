/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ErrorInfo, JSXElementConstructor, ReactElement } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from './root.component';
import { AppProps } from "single-spa";
import './assets/bootstrap.css';
import axios from "axios";

/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = 'https://gw-roxfarma.lilab.pe';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';


const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err: Error, info: ErrorInfo, props: AppProps): ReactElement<any, string | JSXElementConstructor<any>> {
    // Customize the root error boundary for your microfrontend here.
    return <></>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
