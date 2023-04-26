import React from "react";
import { saveAs } from "file-saver";

export default function App() {
  const handleClick = () => {
    let url =
      "https://help.twitter.com/content/dam/help-twitter/brand/logo.png";
    saveAs(url, "Twitter-logo");
  };

  return <button onClick={handleClick}>Dowload image</button>;
}
