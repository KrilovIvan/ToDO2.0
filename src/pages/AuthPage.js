import React, { useEffect, useState, useContext } from "react";
import "../index.css";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import "./AuthPage.css";
export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div>
      <h1>Добро пожаловать в ToDo</h1>
      <div className="auth-page">
        <h3>Авторизация</h3>
        <form className="form form-login">
          <div className="row">
            <div>
              <div className="input-field col s12">
                <input
                  //placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
                <span
                  class="helper-text"
                  data-error="wrong"
                  data-success="right"
                >
                  Введите email
                </span>
              </div>

              <div className="input-field col s12">
                <input
                  //placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
                <span
                  class="helper-text"
                  data-error="wrong"
                  data-success="right"
                >
                  Введите пароль
                </span>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn blue darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
