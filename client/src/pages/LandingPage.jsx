import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      It is a Test Case to see Orders{" "}
      <Link className="text-red-500 mx-4" to="/orders">
        Click!
      </Link>
    </div>
  );
};

export default LandingPage;
