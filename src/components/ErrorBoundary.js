import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>Something went wrong!</div>;
}

export default ErrorBoundary;
