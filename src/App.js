import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Header from "./components/Header";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject";
import Projects from "./components/Projects";
import Login from "./components/Login";
import Register from "./components/Register";

export const queryClient = new QueryClient();
export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderPublicRoutes = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    );
  };

  const renderPrivateRoutes = () => {
    return (
      <>
        <Header />
        <Routes>
          <Route path="createproject" element={<CreateProject />} />
          <Route
            path="dashboard/projects/all"
            element={<Projects status="all" />}
          />
          <Route
            path="dashboard/projects/completed"
            element={<Projects status={1} />}
          />
          <Route
            path="dashboard/projects/archive"
            element={<Projects status={2} />}
          />
          <Route path="edit" element={<EditProject />} />
        </Routes>
      </>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {isLoggedIn && renderPrivateRoutes()}
        {!isLoggedIn && renderPublicRoutes()}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;