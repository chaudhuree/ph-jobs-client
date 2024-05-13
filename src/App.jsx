import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWithNavbar>
              <Home />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/signin"
          element={
            <LayoutWithNavbar>
              <SignIn />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/register"
          element={
            <LayoutWithNavbar>
              <Register />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <LayoutWithNavbar>
              <ForgotPassword />
            </LayoutWithNavbar>
          }
        />

        <Route
          path="/profile"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const shouldShowNavbar = (pathname) => {
  // List of paths where the Navbar should not be shown
  const noNavbarPaths = ["/not-found"];

  return !noNavbarPaths.includes(pathname);
};
const LayoutWithNavbar = ({ children }) => {
  const location = useLocation();
  const showNavbar = shouldShowNavbar(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="content">{children}</div>
      {showNavbar && <Footer />}
    </>
  );
};
export default App;
