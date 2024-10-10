import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {
  Admin,
  Layout,
  Missing,
  Lounge,
  Login,
  Register,
  Editor,
  LinkPage,
  RequireAuth,
  Unauthorized,
  Home,
} from "./components";
import ErrorBoundary from "./components/ErrorBoundary";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>

          {/* catch all */}
          {/* <Route path="*" element={<ErrorBoundary />} /> */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
