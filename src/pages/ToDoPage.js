import axios from "axios";
//import { response } from "express";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ToDo.css";

export const ToDoPage = () => {
  const [text, setText] = useState("");
  //---------------------------------
  const [date, setDate] = useState(() => Date.now());
  //---------------------------------
  const { userId } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  const getTodo = useCallback(async () => {
    try {
      await axios
        .get("/api/todo", {
          headers: {
            "Content-Type": "application/json",
          },
          params: { userId },
        })
        .then((response) => setTodos(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const createTodo = useCallback(async () => {
    if (!text) {
      return null;
    }
    try {
      await axios
        .post(
          "/api/todo/add",
          { text, userId, date },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setTodos([...todos], response.data);
          setText("");
          setDate("");
          getTodo();
        });
    } catch (error) {
      console.log(error);
    }
  }, [text, userId, todos, getTodo, date]);

  const removeTodos = useCallback(
    async (id) => {
      try {
        await axios
          .delete(
            `/api/todo/delete/${id}`,
            { id },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(() => getTodo());
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo]
  );

  const completedTodo = useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `/api/todo/complete/${id}`,
            { id },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            setTodos([...todos], response.data);
            getTodo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo, todos]
  );

  const importantTodo = useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `/api/todo/important/${id}`,
            { id },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            setTodos([...todos], response.data);
            getTodo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo, todos]
  );

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  const newTodos = [];

  // todos.forEach((todo, index) => {

  //   if (todo.completed) {
  //     newTodos.push(todo);
  //   } else {
  //     newTodos.unshift(todo);
  //   }
  // });
  const completedTodos = [];

  const sortTodos = todos.map((todo, index) => {
    let cls = ["row flex todos-item"];
    if (todo.completed) {
      cls.push("completed");
      completedTodos.push(
        <div className={cls.join(" ")} key={index}>
          {/*<div className="col todos-num">{index + 1}</div>*/}
          <div className="col todos-text">{todo.text}</div>
          <div className="col todos-date">{todo.date.substr(0, 10)}</div>
          <div className="col todos-buttons">
            <i
              className="material-icons blue darken-4 white-text"
              onClick={() => completedTodo(todo._id)}
            >
              check
            </i>
            {/*<i
              className="material-icons red-text"
              onClick={() => importantTodo(todo._id)}
      >
              warning
      </i>*/}
            <i
              className="material-icons black-text"
              onClick={() => removeTodos(todo._id)}
            >
              delete
            </i>
          </div>
        </div>
      );
      return;
    }

    if (todo.important) {
      cls.push("important");
    }

    return (
      <div className={cls.join(" ")} key={index}>
        {/*<div className="col todos-num">{index + 1}</div>*/}
        <div className="col todos-text">{todo.text}</div>
        <div className="col todos-date">{todo.date.substr(0, 10)}</div>
        <div className="col todos-buttons">
          <i
            className="material-icons blue darken-4 white-text"
            onClick={() => completedTodo(todo._id)}
          >
            check
          </i>
          {/* <i
            className="material-icons red-text"
            onClick={() => importantTodo(todo._id)}
          >
            warning
          </i>*/}
          <i
            className="material-icons black-text"
            onClick={() => removeTodos(todo._id)}
          >
            delete
          </i>
        </div>
      </div>
    );
  });

  return (
    <div className="todo-page">
      <h4>Добавить задачу</h4>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s8">
            <input
              type="text"
              id="text"
              name="task"
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <label htmlFor="input">Задача</label>
          </div>
          <div className="input-field col s4">
            <input
              type="date"
              id="date"
              name="date"
              className="input"
              value={date}
              required={true}
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="input">Окончание задачи</label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn blue darken-4"
            style={{ marginRight: 10 }}
            onClick={createTodo}
          >
            Добавить
          </button>
        </div>
      </form>

      <h3>Активные задачи</h3>
      <div className="todos">{sortTodos}</div>
      <h3>Завершенные задачи</h3>
      <div className="todos">{completedTodos}</div>
    </div>
  );
};
