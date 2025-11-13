import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-[#E0E0E0] pt-5">
      <div className="mx-auto w-full max-w-7xl p-6 lg:py-10">
        <div className="md:flex md:justify-between md:items-start">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0 flex flex-col items-start">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#2C425C]">
                HireHaven
              </span>
            </Link>
            <p className="mt-2 text-[#80827E] text-sm max-w-sm">
              Empowering freelancers and clients to connect, collaborate, and
              create seamlessly.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-[#2C425C] uppercase">
                Resources
              </h2>
              <ul className="text-[#80827E] font-medium space-y-2">
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-[#2C425C] uppercase">
                Follow Us
              </h2>
              <ul className="text-[#80827E] font-medium space-y-2">
                <li>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-[#2C425C] uppercase">
                Legal
              </h2>
              <ul className="text-[#80827E] font-medium space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-[#848A91] transition-colors duration-200"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-[#E4E4E4]" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-[#96959C]">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#2C425C] font-semibold">HireHaven</span>. All
            rights reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#80827E] hover:text-[#2C425C] transition-colors duration-200"
            >
              <i className="fa-brands fa-github text-xl"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#80827E] hover:text-[#2C425C] transition-colors duration-200"
            >
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#80827E] hover:text-[#2C425C] transition-colors duration-200"
            >
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
