"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { FiUser, FiCalendar, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/alldoctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
    { name: "Doctor", path: "/doctorpage" },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleMenuClick = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-blue-300 shadow-md py-4 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 max-w-screen-xl flex-wrap gap-x-6">
        {/* Logo */}
        <div className="w-36 md:w-44 cursor-pointer">
          <Image
            src="/assets/assets_frontend/logo.svg"
            alt="Logo"
            width={176}
            height={50}
          />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-x-6 flex-wrap">
          <ul className="flex space-x-6 text-blue-600 font-medium">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`hover:text-blue-800 transition duration-200 ${
                  pathname === item.path ? "border-b-2 border-blue-900" : ""
                }`}
              >
                <span
                  onClick={() => handleMenuClick(item.path)}
                  className="cursor-pointer text-sm lg:text-base"
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-x-4 flex-wrap">
          {!session ? (
            <>
              <button
                onClick={() => router.push("/register")}
                className="border border-blue-600 text-blue-600 px-4 lg:px-5 py-2 rounded-full text-sm lg:text-base hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push("/login")}
                className="border border-blue-600 text-blue-600 px-4 lg:px-5 py-2 rounded-full text-sm lg:text-base hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Sign In
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center bg-blue-600 text-white px-4 lg:px-5 py-2 rounded-full text-sm lg:text-base hover:bg-blue-800 transition duration-300"
              >
                <Image
                  src={session.user?.image || "/images/default.png"}
                  alt="User Avatar"
                  width={30}
                  height={30}
                  className="rounded-full mr-2"
                />
                {session.user?.name}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                      onClick={() => handleMenuClick("/Appointment")}
                    >
                      <FiCalendar className="text-gray-500" /> Appointments
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                      onClick={() => handleMenuClick("/profilePage")}
                    >
                      <FiUser className="text-gray-500" /> Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                      onClick={() => signOut()}
                    >
                      <FiLogOut className="text-gray-500" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-blue-600">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-blue-300 py-4">
          <ul className="flex flex-col items-center space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`hover:text-blue-800 transition duration-200 ${
                  pathname === item.path ? "border-b-2 border-blue-900" : ""
                }`}
              >
                <span
                  onClick={() => handleMenuClick(item.path)}
                  className="cursor-pointer text-base"
                >
                  {item.name}
                </span>
              </li>
            ))}
            <li>
              {!session ? (
                <>
                  <button
                    onClick={() => router.push("/register")}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-base hover:bg-blue-600 hover:text-white transition duration-300"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => router.push("/login")}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-base hover:bg-blue-600 hover:text-white transition duration-300 ml-2"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleDropdown}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-base hover:bg-blue-800 transition duration-300"
                >
                  User Menu
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
