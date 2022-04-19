import { useEffect, useState } from "react";
import Main from "./components/Main";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminLogin from "./components/Main/Admin/Login/index";
import AdminDashboard from "./components/Main/Admin/Dashboard/index";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("isLoggedIn")
      ? window.localStorage.getItem("isLoggedIn")
      : false
  );
  useEffect(() => {
    if (isLoggedIn) {
      window.localStorage.setItem("isLoggedIn", isLoggedIn);
    }
  }, [isLoggedIn]);
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          {isLoggedIn ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <AdminDashboard
                    setIsLoggedIn={setIsLoggedIn}
                    navigate={navigate}
                  />
                }
              />
              <Route path="*" element={<Navigate replace to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route
                path="/admin"
                element={
                  <AdminLogin
                    setIsLoggedIn={setIsLoggedIn}
                    navigate={navigate}
                  />
                }
              />
              <Route path="*" element={<Navigate replace to="/admin" />} />
            </>
          )}
        </Routes>
      </GlobalProvider>
    </>
  );
}

export default App;
