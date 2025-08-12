import React, { useState } from 'react';

const AIInterviewSimulator = () => {
  const [interviewSettings, setInterviewSettings] = useState({
    companyName: '',
    position: '',
    interviewType: '',
    difficulty: '',
    industry: ''
  });
  
  const [simulationState, setSimulationState] = useState('idle'); // idle, preparing, interviewing, completed
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookMessage, setWebhookMessage] = useState({ show: false, type: '', text: '' });
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showWebhookMessage = (type, text) => {
    setWebhookMessage({ show: true, type, text });
    setTimeout(() => {
      setWebhookMessage({ show: false, type: '', text: '' });
    }, 3000);
  };

  const pollForSimulationData = async () => {
    const API_BASE = "https://delightful-passion-production.up.railway.app";
    let attempts = 0;
    const maxAttempts = 15;
    let isPollingActive = true;
    
    const checkSimulationData = async () => {
      if (!isPollingActive) return;
      
      try {
        const simulationRes = await fetch(`${API_BASE}/interview-simulation`);
        
        if (!simulationRes.ok) {
          console.error('API Error - Simulation status:', simulationRes.status);
          throw new Error(`API returned status ${simulationRes.status}`);
        }
        
        const simulationContentType = simulationRes.headers.get('content-type');
        
        if (!simulationContentType?.includes('application/json')) {
          console.error('Invalid content type - Simulation:', simulationContentType);
          throw new Error('API returned non-JSON response');
        }
        
        const simulationData = await simulationRes.json();
        const simulationText = simulationData && simulationData.length > 0 && simulationData[0].Question ? simulationData[0].Question : '';
        
        console.log('Simulation response:', simulationData);
        
        if (simulationText) {
          setCurrentQuestion(simulationText);
          setSimulationState('interviewing');
          setShowSkeleton(false);
          setIsPolling(false);
          isPollingActive = false;
          showWebhookMessage('success', 'Interview simulation started!');
          return true;
        } else {
          attempts++;
          console.log(`Attempt ${attempts}: Waiting for simulation data...`);
          if (attempts < maxAttempts && isPollingActive) {
            setTimeout(checkSimulationData, 20000);
          } else if (isPollingActive) {
            setShowSkeleton(false);
            setCurrentQuestion('No simulation data available after timeout.');
            setIsPolling(false);
            isPollingActive = false;
            showWebhookMessage('error', 'Timeout: No data received after 5 minutes.');
          }
        }
      } catch (error) {
        console.error('Error polling for simulation data:', error);
        attempts++;
        if (attempts < maxAttempts && isPollingActive) {
          setTimeout(checkSimulationData, 20000);
        } else if (isPollingActive) {
          setShowSkeleton(false);
          setCurrentQuestion('Error retrieving simulation data.');
          setIsPolling(false);
          isPollingActive = false;
          showWebhookMessage('error', 'Failed to retrieve simulation data.');
        }
      }
    };
    
    checkSimulationData();
  };

  const startSimulation = async () => {
    if (!interviewSettings.companyName.trim() || !interviewSettings.position.trim()) {
      showWebhookMessage('error', 'Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setShowSkeleton(true);
    setSimulationState('preparing');
    setCurrentQuestion('');
    setUserAnswer('');
    setFeedback('');
    setInterviewHistory([]);

    try {
      const response = await fetch('https://delightful-passion-production.up.railway.app/interview-simulator-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: interviewSettings.companyName,
          position: interviewSettings.position,
          interviewType: interviewSettings.interviewType,
          difficulty: interviewSettings.difficulty,
          industry: interviewSettings.industry
        }),
      });

      if (response.ok) {
        showWebhookMessage('success', 'Interview simulation setup successfully! Starting simulation...');
        setIsLoading(false);
        setIsPolling(true);
        pollForSimulationData();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error starting simulation:', error);
      setShowSkeleton(false);
      setIsLoading(false);
      setSimulationState('idle');
      showWebhookMessage('error', 'Failed to start interview simulation. Please try again.');
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      showWebhookMessage('error', 'Please provide an answer before submitting.');
      return;
    }

    // Add current Q&A to history
    const newHistoryEntry = {
      question: currentQuestion,
      answer: userAnswer,
      timestamp: new Date().toLocaleTimeString()
    };
    setInterviewHistory(prev => [...prev, newHistoryEntry]);

    // Simulate feedback (in a real app, this would call an API)
    const mockFeedback = `Good answer! You demonstrated understanding of the topic. Consider adding more specific examples to strengthen your response.`;
    setFeedback(mockFeedback);

    // Clear current answer for next question
    setUserAnswer('');
    
    // Simulate next question (in a real app, this would come from API)
    setTimeout(() => {
      setCurrentQuestion('Tell me about a challenging project you worked on and how you overcame obstacles.');
      setFeedback('');
    }, 2000);
  };

  const endSimulation = () => {
    setSimulationState('completed');
    setCurrentQuestion('');
    setUserAnswer('');
    setFeedback('');
    showWebhookMessage('success', 'Interview simulation completed! Review your performance below.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="px-4 md:px-8 lg:px-12 py-8">
        {/* Webhook Message */}
        {webhookMessage.show && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            webhookMessage.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {webhookMessage.text}
          </div>
        )}

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 glass-card text-blue-700 shadow px-3 py-2 rounded-full text-xs font-semibold mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mic h-4 w-4"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="23"/>
              <line x1="8" x2="16" y1="23" y2="23"/>
            </svg>
            AI Interview Simulator
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Interview Simulator
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Practice your interview skills with our AI-powered interview simulator. 
            Get real-time feedback and improve your confidence for actual interviews.
          </p>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Our AI simulates realistic interview scenarios based on your target company and position. 
            Practice answering questions, receive instant feedback, and improve your interview skills 
            in a safe, pressure-free environment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You Get</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Realistic interview questions</li>
                <li>• Instant AI feedback</li>
                <li>• Performance analysis</li>
                <li>• Confidence building</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Perfect For</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Interview preparation</li>
                <li>• Skill improvement</li>
                <li>• Confidence building</li>
                <li>• Mock interviews</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interview Settings Form - Only show when idle */}
        {simulationState === 'idle' && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Configure Your Interview</h2>
            <p className="text-gray-600 mb-6 text-center">Set up your interview simulation parameters</p>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={interviewSettings.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Position *</label>
                  <input
                    type="text"
                    name="position"
                    value={interviewSettings.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter job position"
                    required
                  />
                </div>
              </div>
            
              <div>
                <label className="block text-gray-700 font-medium mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={interviewSettings.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
              </div>
              
              <div className="text-center">
                <button 
                  onClick={startSimulation}
                  disabled={isLoading || isPolling}
                  className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm px-6 py-3 rounded-xl shadow-colored"
                >
                  {isLoading ? 'Setting Up Simulation...' : isPolling ? 'Preparing Questions...' : 'Start Interview Simulation'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interview Simulation Interface */}
        {simulationState === 'interviewing' && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Interview in Progress</h2>
              <button 
                onClick={endSimulation}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
              >
                End Simulation
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Current Question */}
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Current Question:</h3>
                <p className="text-gray-700 text-lg">{currentQuestion}</p>
              </div>
              
              {/* Answer Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Answer:</label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Type your answer here..."
                  rows="4"
                />
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={submitAnswer}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
              
              {/* Feedback */}
              {feedback && (
                <div className="bg-green-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">AI Feedback:</h3>
                  <p className="text-gray-700">{feedback}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interview History */}
        {interviewHistory.length > 0 && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Interview History</h2>
            <div className="space-y-4">
              {interviewHistory.map((entry, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">{entry.timestamp}</span>
                    <span className="text-sm font-medium text-blue-600">Q&A #{index + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Q: </span>
                      <span className="text-gray-600">{entry.question}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">A: </span>
                      <span className="text-gray-600">{entry.answer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {showSkeleton && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preparing Your Interview</h2>
            <p className="text-gray-600 mb-6 text-center">Setting up your personalized interview simulation...</p>
            
            <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 min-h-[200px]">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Complete */}
        {simulationState === 'completed' && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Simulation Complete!</h2>
            <p className="text-gray-600 mb-6 text-center">Great job completing the interview simulation. Review your performance and practice more to improve your skills.</p>
            
            <div className="text-center">
              <button 
                onClick={() => {
                  setSimulationState('idle');
                  setInterviewHistory([]);
                  setInterviewSettings({
                    companyName: '',
                    position: '',
                    interviewType: '',
                    difficulty: '',
                    industry: ''
                  });
                }}
                className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-xl shadow-colored"
              >
                Start New Simulation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInterviewSimulator;
