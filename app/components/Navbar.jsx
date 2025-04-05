'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Profile from './Profile';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showProfile, setShowProfile] = useState(false); // Modal toggle

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('name');
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || 'Profile');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setIsOpen(false);
    window.location.href = '/login';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/request', label: 'Requests' },
  ];

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href='/' className="flex items-center space-x-2 text-xl font-bold text-blue-600">
            <img src="/medical-home.png" alt="MedConnect Logo" className="w-7" />
            <span>MedConnect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition ${pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className={`text-sm font-medium px-3 py-2 rounded-md transition ${pathname === '/login'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`text-sm font-medium px-3 py-2 rounded-md transition ${pathname === '/register'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowProfile(true)}
                  className="text-sm font-medium px-3 py-2 rounded-md text-blue-600 hover:bg-blue-100"
                >
                  {userName}
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-3 py-2 rounded-md text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-medium px-3 py-2 rounded-md transition ${pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowProfile(true);
                  }}
                  className="block w-full text-left text-sm font-medium px-3 py-2 rounded-md text-blue-600 hover:bg-blue-100"
                >
                  {userName}
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-sm font-medium px-3 py-2 rounded-md text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            {/* Render your profile component here */}
            <Profile />
          </div>
        </div>
      )}
    </>
  );
}
