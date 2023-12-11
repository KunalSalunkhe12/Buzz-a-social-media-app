import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./context/theme/ThemeContext";
import QueryProvider from "./lib/react-query/QueryProvider";
import { UserProvider } from "./context/user/UserContext";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <UserProvider>
          <main className="">
            <Outlet />
            <Toaster />
          </main>
        </UserProvider>
        <ReactQueryDevtools />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
