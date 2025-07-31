import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error, clearError } = useSession();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ show: false, type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showMessage = (type, text) => {
    setMessage({ show: true, type, text });
    setTimeout(() => {
      setMessage({ show: false, type: '', text: '' });
    }, 3000);
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Show error message from context
  useEffect(() => {
    if (error) {
      showMessage('error', error);
      clearError();
    }
  }, [error, clearError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        showMessage('success', 'Login successful! Redirecting...');
        // Navigation will be handled by useEffect when isAuthenticated changes
      } else {
        showMessage('error', result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showMessage('error', 'Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div className="px-4 md:px-14 lg:px-24 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Message Notification */}
        {message.show && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 ${
            message.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
            {/* Left Section - Welcome Content */}
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <div className="inline-flex items-center gap-3 glass-card text-blue-700 shadow px-3 py-3 rounded-full text-sm font-semibold mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
                  className="lucide lucide-star h-5 w-5 text-yellow-500"
            >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
                Trusted by 10,000+ users
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-[1.05]">
            Welcome Back
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {" "}Sign In
            </span>
          </h1>
          
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Access your account to continue with AI-powered image generation and advanced features.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto lg:mx-0">
                {[
                  "AI-powered image generation",
                  "Advanced agent features",
                  "Secure authentication",
                  "24/7 support access"
                ].map((text, index) => (
                  <div className="flex items-start" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-6 w-6 text-green-500 mt-1 mr-4 flex-shrink-0"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span className="text-gray-700 font-semibold">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="lg:w-1/2">
              <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 glass-card text-blue-700 shadow px-3 py-3 rounded-full text-sm font-semibold mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-user h-5 w-5"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    User Authentication
        </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In to Your Account</h2>
                  <p className="text-gray-600">Enter your credentials to access your dashboard</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                    <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
                      <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
              </div>
              
                  <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                    <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                      <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
              </div>
              
                <button 
                  type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg px-8 py-4 rounded-2xl shadow-colored transform hover:scale-105 disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Sign In
                      </>
                    )}
                </button>
            </form>
            
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">
                Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  Sign up here
                    </Link>
              </p>
                  <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200">
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 