import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import "./globals.css";

function App() {
  return (
    <ThemeProvider>
      <main className="">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
