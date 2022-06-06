import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Header from "./components/Header";
import CreateProject from "./components/projects/CreateProject";
import EditProject from "./components/projects/EditProject";
import Projects from "./components/projects/Projects";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Users from "./components/users/Users";
import SearchUsers from "./components/users/SearchUsers";
import FirebaseList from "./components/FirebaseList";
import NoMatch from "./components/NoMatch";

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
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/firebase" element={<FirebaseList />} />
          <Route
            path="/dashboard/projects/all"
            element={<Projects status="all" />}
          />
          <Route
            path="/dashboard/projects/completed"
            element={<Projects status={1} />}
          />
          <Route
            path="/dashboard/projects/archive"
            element={<Projects status={2} />}
          />
          <Route path="/edit" element={<EditProject />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/search" element={<SearchUsers />} />
          <Route path="*" element={<NoMatch/>} />

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
