"use client";
import { useState } from "react";
import { CircleAlert, House, Moon, Package, Sun } from "lucide-react";
import Container from "@/layout/Container/Container";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleNavbar = () => {
    setOpen(!open);
  };
  const { setTheme, theme } = useTheme();
  //   const toggleTheme = () => {
  //     setTheme(theme === "light" ? "dark" : "light");
  //   };

  return (
    <nav className=" border-b sticky text-black w-full bg-white dark:bg-black z-50  dark:text-white ">
      <Container>
        <div className="h-20 items-center px-5 lg:px-0 flex justify-between">
          <div>
            <Link to={"/"} className="text-xl  font-zen flex items-center gap-1">
              <img src="/assets/logo/logo.png" className="h-14 w-14" alt="" />{" "}
              Athlete's Arsenal
            </Link>
          </div>

          <ul className="lg:flex hidden gap-6">
            <NavLink to={"/"} className={"rounded-full"}>
              Home
            </NavLink>
            <NavLink
              to={"/about"}
              className="hover:text-primary   cursor-pointer transition-all duration-300"
            >
              About Us
            </NavLink>
            <NavLink
              to="products"
              className="hover:text-primary   cursor-pointer transition-all duration-300"
            >
              Our Products
            </NavLink>
          </ul>
          <div className="flex md:gap-6 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-white scale-100 transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link to={"/login"}>
              <Button className="lg:block hidden dark:text-white">Login</Button>
            </Link>
          </div>
          <div className="lg:hidden block ">
            {!open && (
              <svg
                onClick={toggleNavbar}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-7 w-7 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            )}
          </div>
        </div>
        <div
          className={`lg:hidden  z-50 top-0 right-0 bg-white border-l h-[100vh] fixed overflow-hidden transition-all duration-300 dark:bg-gray-900`}
          style={{ maxWidth: open ? "15rem" : "0", width: "100%" }}
        >
          <div className="flex justify-between w-full p-4">
            <h1 className="px-2 text-md text-primary font-bold">
              FinalTry Innovations
            </h1>
            <svg
              onClick={toggleNavbar}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-7 w-7 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <ul className="w-full p-4">
            <NavLink to={"/"} className="flex gap-2  p-2">
              <House /> Home
            </NavLink>
            <NavLink to="contact" className="flex gap-2  p-2">
              <CircleAlert /> Contact Us
            </NavLink>
            <NavLink to="ourProjects" className="flex gap-2  p-2">
              <Package /> Our Projects
            </NavLink>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
