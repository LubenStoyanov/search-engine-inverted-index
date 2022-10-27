import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch((s) => (s = e.target.firstChild.value));
    console.log(search);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${search}`)
      .then((res) => setResult((r) => (r = res.data)))
      .catch((error) => console.error(error));
  }, [search]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input type="text" name="" id="" />
        </form>
        <p>{console.log(result)}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
