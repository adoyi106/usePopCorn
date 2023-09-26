import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./star";

function Test() {
  const [movieRated, setMovieRated] = useState(0);
  return (
    <div>
      <StarRating
        color="blue"
        maxRating={"10"}
        size={"24"}
        onSetRating={setMovieRated}
      />
      <p>`this movie was rated {movieRated} stars `</p>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StarRating color="red" size="24" className="test" />
    <Test /> */}
  </React.StrictMode>
);
