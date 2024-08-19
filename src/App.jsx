import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import "semantic-ui-css/semantic.min.css";
import appStore from "./store/appStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <Provider store={appStore}>
      <Router>
        <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard searchQuery={searchQuery} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
