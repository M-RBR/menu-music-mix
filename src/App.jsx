import "./App.css";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigateToAbout = () => {
    setCurrentPage("about");
  };

  const navigateToHome = () => {
    setCurrentPage("home");
  };

  return (
    <>
      {currentPage === "home" && <Home onAboutClick={navigateToAbout} />}
      {currentPage === "about" && <About onBack={navigateToHome} />}
    </>
  );
}

export default App;
