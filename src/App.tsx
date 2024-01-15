import { Outlet } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./context/theme/ThemeContext";
import QueryProvider from "./lib/react-query/QueryProvider";
import { UserProvider } from "./context/user/UserContext";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import { Suspense } from "react";
import ComponentLoader from "./components/shared/ComponentLoader";

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <UserProvider>
          <Suspense fallback={<ComponentLoader />}>
            <main>
              <Outlet />
              <Toaster />
            </main>
          </Suspense>
        </UserProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
