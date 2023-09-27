import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fsamareshm61.github.io%2Fsamaresh-maji.github.io%2F%3Ffbclid%3DIwAR2kKMb03XzECp8Yprxu47oWHqy8P9fzInzCWdFICFmBjnW8QMYPVHY526I&h=AT0mNAucQmzBFc2VQoEF_WDj5-t0ZpHQbg37ZUvPuEcqqQhvkUeQu5_DRHyt762o0u3LVALuWHIDBJHbHzq_kpicANY3oEPmfCzJoqWtkuYaXv62cV0j7DAk73A6sY1GU__Mew">
          Go To My Portfolio
        </a>{" "}
        | Developed by Samaresh Maji{" "}
      </div>
    </React.Fragment>
  );
}

export default App;
