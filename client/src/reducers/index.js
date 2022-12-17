/*Because we only have a single store in a Redux application. 
We use reducer composition instead of many stores to split data handling logic.*/

import { combineReducers } from "redux";

import auth from "./auth";
import message from "./message";
import clientId from "./client"


import client from '../slice/clients'
import direccion from "../slice/direccion";

export default combineReducers({
  auth,
  message,
  clientId,

  client,
  direccion
});