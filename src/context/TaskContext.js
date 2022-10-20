import { createContext } from "react";

function noop() {}

export const TaskContext = createContext({
  task: null,
  //----------------------------------
  date: null,
  //----------------------------------
  userId: null,
  send: noop,
});
