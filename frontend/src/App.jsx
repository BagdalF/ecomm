import { Outlet } from "react-router-dom";
import Navigation from "./pages/auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Header from "./pages/auth/Header";
import { useRef, useState, useEffect } from "react";

function App() {
  const [height, setHeight] = useState("100vh");
  const componentRef = useRef(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (componentRef.current) {
        const componentHeight = componentRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        componentHeight > viewportHeight
          ? setHeight("100%")
          : setHeight("100vh");
      }
    };

    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <Navigation />
      <main
        ref={componentRef}
        style={{ height }}
        className="py-3 ml-[4%] pt-[3.75rem] bg-neutral-200"
      >
        <Outlet />
      </main>
    </>
  );
}

export default App;
