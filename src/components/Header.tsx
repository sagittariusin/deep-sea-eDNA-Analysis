// Header.tsx
import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- add this

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // <-- hook

  const navItems = [
    { label: 'Data', hasDropdown: true },
    { label: 'Tools', hasDropdown: true },
    { label: 'Resources', hasDropdown: true },
    { label: 'About', hasDropdown: true }
  ];

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-blue-800">SAGITT</span>
              <span className="text-gray-700">ARIUS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors duration-200">
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={goToLogin}            // <-- navigate on click
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button key={item.label} className="text-left text-gray-700 hover:text-blue-800 transition-colors duration-200">
                  {item.label}
                </button>
              ))}

              {/* Mobile Login button navigates to /login too */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToLogin();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium w-fit"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
