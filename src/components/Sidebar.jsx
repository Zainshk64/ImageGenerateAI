import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActiveRoute = (path) => location.pathname === path;

  const navItems = [
    { path: '/email-marketing-campaigns', label: 'Email Marketing Campaigns' },
    { path: '/blog-writing', label: 'Blog Writing' },
    { path: '/cv-cover-letter-coach', label: 'Real-time CV & Cover Letter Coach' },
    { path: '/candidate-memory-layer', label: 'Persistent Candidate Memory Layer' },
    { path: '/smart-interview-notebook', label: 'Smart Interview Notebook' },
    { path: '/ai-interview-simulator', label: 'AI Interview Simulator' },
    { path: '/progress-dashboard-learning-loop', label: 'Progress Dashboard & Learning Loop' },
    { path: '/privacy-control-explainability', label: 'Privacy, Control & Explainability' },
    { path: '/keyword-manager', label: 'Keyword Manager' },
    { path: '/campaign-calendar-scheduler', label: 'Campaign Calendar & Scheduler' },
    { path: '/performance-analyzer', label: 'Performance Analyzer' },
    { path: '/engagement-bot', label: 'Engagement Bot' },
    { path: '/persona-builder', label: 'Persona Builder & Targeting Optimizer' },
    { path: '/google-ads-generator', label: 'Google Ads Generator & Optimizer' },
  ];

  return (
    <>
      {/* Sidebar Toggle Button - Mobile */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md"
      >
        ☰
      </button>

      {/* Desktop Sidebar */}
      <div className="mt-20 hidden lg:block fixed left-0 top-0 h-full w-52 bg-white border-r border-gray-200 shadow-md z-40">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">Agents</h2>
          </div>
          <div className="flex-1 overflow-y-auto  pb-25">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white shadow-md">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Agents</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      isActiveRoute(item.path)
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
