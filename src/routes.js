import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToDoPage } from "./pages/ToDoPage";
import { AuthPage } from "./pages/AuthPage";
export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/todo" element={<ToDoPage />} />
        <Route path="*" element={<Navigate to="/todo" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
