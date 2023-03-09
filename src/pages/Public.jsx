import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button>
        <Link to="all-articles">View All Articles</Link>
      </button>
    </div>
  );
};

export default Public;
