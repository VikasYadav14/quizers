import Link from 'next/link';
import React, { useState } from 'react';
import {
  AiOutlineBook,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineUser,
} from 'react-icons/ai';
import {
  BiBookContent,
  BiBookReader,
  BiLibrary,
  BiLogOut,
  BiNote,
} from 'react-icons/bi';
const Sidebar = ({ user, logout }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative min-h-screen bg-violet-900">
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-6 right-6 text-violet-800 text-4xl"
      >
        {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
      <aside
        className={`${
          showSidebar ? 'block fixed' : 'hidden'
        } md:block top-0 left-0 w-64 min-h-screen bg-violet-900 text-white border-r border-gray-400`}
      >
        <div className="fixed flex flex-col top-0 left-0 w-64  h-full border-r">
          <Link href="/dashboard">
            <h2 className="p-4 pb-0 text-violet-400 hover:text-white font-bold text-2xl">
              Quizers
            </h2>
          </Link>
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide  ">Menu</div>
              </div>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600    border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <AiOutlineHome />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/practice"
                className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600    border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <AiOutlineBook />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Pratice</span>
              </Link>
            </li>
            <li>
              <Link
                href="/testSeries"
                className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600    border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <BiBookReader />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Test Series
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/previousYearQuestions"
                className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600    border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <BiLibrary />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Previous Year Questions
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/syllabus"
                className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600    border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <BiBookContent />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Syllabus
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/notes"
                className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600    border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <BiNote />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Notes</span>
              </Link>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide">Settings</div>
              </div>
            </li>
            <li>
              <Link
                href="/profile"
                className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <AiOutlineUser />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">{user}</span>
              </Link>
            </li>
            <li
              onClick={logout}
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:bg-violet-600 border-l-4 border-transparent hover:border-indigo-500 pr-6 cursor-pointer"
            >
              <span className="inline-flex justify-center items-center ml-4 text-lg">
                <BiLogOut />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
