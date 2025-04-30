import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';
import profilePic from '../assets/layout images/profle-pic.jpg';

const links = ['home', 'about us', 'marketplace', 'roadmap', 'whitepaper'];

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLangDropdown = () => setShowLangDropdown((prev) => !prev);
  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  return (
    <nav
      className="py-2 px-4 sm:py-3 sm:px-5 border-b fixed top-0 left-0 w-full z-50"
      style={{
        backgroundColor: theme.background,
        borderColor: theme.border,
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: theme.text }}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <NavLink
                key={link}
                to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  color: isActive ? 'transparent' : theme.text,
                  background: isActive ? theme.gradient : 'none',
                  backgroundClip: isActive ? 'text' : 'initial',
                  WebkitBackgroundClip: isActive ? 'text' : 'initial',
                  WebkitTextFillColor: isActive ? 'transparent' : 'initial',
                  transition: 'all 0.3s ease',
                })}
              >
                {link}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="py-2 px-4 rounded-md font-semibold"
            style={{
              color: theme.text,
              background: theme.gradient,
            }}
          >
            Connect Wallet
          </button>

          <ThemeToggle />

          <div className="hidden md:block relative">
            <button
              onClick={toggleLangDropdown}
              className="flex items-center gap-2 p-2 border border-transparent rounded-md"
              style={{
                color: theme.text,
                backgroundColor: theme.buttonBg,
              }}
            >
              <FaGlobe size={18} />
              <span>{language}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
                style={{ color: theme.text }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {showLangDropdown && (
              <div
                className="absolute top-10 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-md"
                style={{ width: '120px' }}
              >
                {['EN', 'FR', 'ES'].map((lang) => (
                  <div
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <Avatar alt="Profile" src={profilePic} />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4">
          {links.map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setIsMenuOpen(false)}
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                textTransform: 'uppercase',
                color: isActive ? 'transparent' : theme.linkColor,
                background: isActive ? theme.gradient : 'none',
                backgroundClip: isActive ? 'text' : 'initial',
                WebkitBackgroundClip: isActive ? 'text' : 'initial',
                WebkitTextFillColor: isActive ? 'transparent' : 'initial',
                transition: 'all 0.3s ease',
              })}
            >
              {link}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
