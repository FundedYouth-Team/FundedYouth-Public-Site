import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Home", href: "/", page: "" },
  { label: "Learn", href: "/learn", page: "learn" },
  { label: "Schedule", href: "/schedule", page: "schedule" },
  { label: "Competitions", href: "/competitions", page: "competitions" },
  { label: "For Schools", href: "/teachers", page: "teachers" },
];

const mobileOnlyMenuItems = [
  { label: "Apps & Tools", href: "/apps", page: "apps" },
  { label: "Volunteer", href: "/volunteer", page: "volunteer" },
  { label: "Donate", href: "/donate", page: "donate" },
  { label: "Contact", href: "/contact", page: "contact" },
];

const PORTAL_URL = "https://portal.fundedyouth.org/";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1] || "";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "" : "hidden";
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo and Nav Links */}
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <img
                  src="https://ps-cdn.fundedyouth.org/logo-color-white-bg.png"
                  alt="FundedYouth"
                  className="h-8 w-auto"
                />
                <span className="text-xl font-semibold text-white">
                  FundedYouth
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`transition-colors ${
                      currentPage === item.page
                        ? "text-white font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-white/90 px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-1.5"
              >
                Sign In
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              className="lg:hidden p-2 text-white hover:text-white/80 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        />

        {/* Slide-out Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <Link
                to="/"
                className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
                onClick={closeMobileMenu}
              >
                <img
                  src="https://ps-cdn.fundedyouth.org/logo-color-white-bg.png"
                  alt="FundedYouth"
                  className="h-8 w-auto bg-blue-600 rounded-lg p-1"
                />
                <span className="text-xl font-semibold text-gray-900">
                  FundedYouth
                </span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex-1 px-6 py-6 overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`px-4 py-3 text-lg rounded-lg transition-colors ${
                      currentPage === item.page
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-1 mt-4 pt-4 border-t border-gray-200">
                {mobileOnlyMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`px-4 py-3 text-lg rounded-lg transition-colors ${
                      currentPage === item.page
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Actions */}
            <div className="px-6 py-6 border-t border-gray-200">
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Sign In
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
