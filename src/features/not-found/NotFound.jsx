import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      Not Found Page, <Link to="/">Go back to main page.</Link>
    </div>
  );
};
