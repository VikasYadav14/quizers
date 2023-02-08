import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-700 py-10">
    <div className="container mx-auto">
      <div className="flex items-center justify-between p-10">
        <div>
          <Link href="/">
            <h2 className="text-center text-3xl text-violet-500 hover:text-violet-400 font-bold">
              Quizers
            </h2>
          </Link>
        </div>
        <p className="text-white text-sm">© 2020 All rights reserved</p>
        <div className="flex flex-col">
          <Link href="about" className="text-white text-sm mr-5 hover:text-violet-400 mb-2">
            About
          </Link>
          <Link href="contact" className="text-white text-sm mr-5 hover:text-violet-400 mb-2">
            Contact
          </Link>
          <Link href="privacy-policy" className="text-white text-sm mr-5 hover:text-violet-400">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
