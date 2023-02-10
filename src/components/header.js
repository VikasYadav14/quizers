import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const Navbar = ({ isAuthenticated, user, logout }) => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, []);

  return (
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <h2 className="text-violet-500 hover:text-violet-600 font-bold text-2xl">
            Quizers
          </h2>
        </Link>
        <div>
          <ul className="hidden md:flex">
            <li className="p-4 border-b-2 border-violet-500 border-opacity-0 hover:border-opacity-100 hover:text-violet-500 duration-200 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4 border-b-2 border-violet-500 border-opacity-0 hover:border-opacity-100 hover:text-violet-500 duration-200 cursor-pointer">
              <Link href="/about">About Us</Link>
            </li>
            <div>
              <a></a>
            </div>
            {isAuthenticated ? (
              <li
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="p-4 border-b-2 border-violet-500 border-opacity-0 hover:border-opacity-100 hover:text-violet-500 duration-200 cursor-pointer"
              >
                {dropdown && (
                  <div
                    onMouseOver={() => {
                      setDropdown(true);
                    }}
                    onMouseLeave={() => {
                      setDropdown(false);
                    }}
                    className="absolute right-14 text-gray-800 border-2 font-medium bg-white top-10 rounded-md px-5 w-24"
                  >
                    <ul><Link href='/profile'>
                      <li className="py-1 hover:text-violet-600 text-sm">
                        {user}
                      </li></Link>
                      <li
                        onClick={logout}

                        className="py-1 hover:text-violet-600 text-sm"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
                <AiOutlineUser className="w-5 h-5" title="user" />
              </li>
            ) : (
              <li className="p-4 border-b-2 border-violet-500 border-opacity-0 hover:border-opacity-100 hover:text-violet-500 duration-200 cursor-pointer">
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
          {/* Hamburger Icon */}
          <div
            onClick={handleNav}
            className="md:hidden"
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div
        className={
          nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? ' fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white p-10 ease-in duration-500'
              : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <h2
                  onClick={() => setNav(false)}
                  className="text-violet-500 hover:text-violet-600 font-bold text-2xl"
                >
                  Quizers
                </h2>
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">
                Aim High, Excel Beyond Limits.
              </p>
            </div>
            {isAuthenticated && (
              <>
                <div className="flex text-violet-600 font-semibold border-b border-gray-300 my-4">
                  <AiOutlineUser className="w-5 h-5" title="user" />
                  <p className="pl-2">{user}</p>
                </div>
              </>
            )}
          </div>
          <div className="py-4 flex flex-col">
            <ul className="p-4 border-b-2">
              <Link href="/">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Home
                </li>
              </Link>
              <Link href="/about">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  About Us
                </li>
              </Link>
              {isAuthenticated ? (
                <li onClick={logout} className="py-4 text-sm">
                  LogOut
                </li>
              ) : (
                <Link href="/login">
                  <li onClick={() => setNav(false)} className="py-4 text-sm">
                    Login
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
