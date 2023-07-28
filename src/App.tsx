import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import "./scss/index.scss";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/FirebaseConfig";
import Loader from "./components/Loader";

const Search = lazy(() => import("./pages/Search"));
const MyList = lazy(() => import("./pages/MyList"));
const About = lazy(() => import("./pages/About"));
const Compare = lazy(() => import("./pages/Compare"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email as string }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (toasts.length) {
      if (toasts.length) {
        const toastOptions: ToastOptions = {
          position: "bottom-right",
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        };

        toasts.forEach((message: string) => {
          toast(message, toastOptions);
        });

        dispatch(clearToasts());
      }
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <div className="app">
            <Navbar />
            <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<MyList />} path="/list" />
              <Route element={<About />} path="/about" />
              <Route element={<Compare />} path="/compare" />
              <Route element={<Pokemon />} path="/pokemon/:id" />
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
