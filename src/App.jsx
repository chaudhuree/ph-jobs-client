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
import SingleJob from "./pages/SingleJob";
import AllJobs from "./pages/AllJobs";
import AddJob from "./pages/AddJob";
import AppliedJobs from "./pages/AppliedJobs";
import MyJobs from "./pages/MyJobs";
import UpdateJob from "./pages/UpdateJob";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import ApplicantList from "./pages/ApplicantList";

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
        <Route
          path="/blogs"
          element={
            <LayoutWithNavbar>
              <Blogs />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/alljobs"
          element={
            <LayoutWithNavbar>
              <AllJobs />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/addjob"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/addjob" element={<AddJob />} />
        </Route>
        <Route
          path="/appliedjobs"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/appliedjobs" element={<AppliedJobs />} />
        </Route>
        <Route
          path="/myjobs"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/myjobs" element={<MyJobs />} />
        </Route>
        <Route
          path="/blog/:id"
          element={
            <LayoutWithNavbar>
              <Blog />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/updatejob/:id"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/updatejob/:id" element={<UpdateJob />} />
        </Route>
        <Route
          path="/job/:id"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/job/:id" element={<SingleJob />} />
        </Route>
        <Route
          path="/applicantlist/:id"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/applicantlist/:id" element={<ApplicantList />} />
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
