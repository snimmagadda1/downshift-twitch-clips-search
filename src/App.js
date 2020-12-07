import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "styled-components";
import Search from "./components/Search";

const theme = {
  purple: "#9147ff",
  darkgray: "#B8B8B8",
  gray: "#e8e8e8",
  lightgray: "#f7f7f8",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header"></header>
        <body>
          <Search></Search>
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
