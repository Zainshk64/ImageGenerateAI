import React, { useState } from 'react';

const SmartInterviewNotebook = () => {
  const [interviewDetails, setInterviewDetails] = useState({
    companyName: '',
    position: '',
    interviewType: '',
    notes: ''
  });
  
  const [generatedNotes, setGeneratedNotes] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookMessage, setWebhookMessage] = useState({ show: false, type: '', text: '' });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails(prev => ({
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

  const pollForInterviewData = async () => {
    const API_BASE = "https://delightful-passion-production.up.railway.app";
    let attempts = 0;
    const maxAttempts = 15;
    let isPollingActive = true;
    
    const checkInterviewData = async () => {
      if (!isPollingActive) return;
      
      try {
        const interviewRes = await fetch(`${API_BASE}/interview-notes`);
        
        if (!interviewRes.ok) {
          console.error('API Error - Interview status:', interviewRes.status);
          throw new Error(`API returned status ${interviewRes.status}`);
        }
        
        const interviewContentType = interviewRes.headers.get('content-type');
        
        if (!interviewContentType?.includes('application/json')) {
          console.error('Invalid content type - Interview:', interviewContentType);
          throw new Error('API returned non-JSON response');
        }
        
        const interviewData = await interviewRes.json();
        const interviewText = interviewData && interviewData.length > 0 && interviewData[0].Notes ? interviewData[0].Notes : '';
        
        console.log('Interview response:', interviewData);
        
        if (interviewText) {
          setGeneratedNotes(interviewText);
          setInterviewDetails({ companyName: '', position: '', interviewType: '', notes: '' });
          setShowSkeleton(false);
          setDataLoaded(true);
          setIsPolling(false);
          isPollingActive = false;
          showWebhookMessage('success', 'Interview notes generated successfully!');
          return true;
        } else {
          attempts++;
          console.log(`Attempt ${attempts}: Waiting for interview data...`);
          if (attempts < maxAttempts && isPollingActive) {
            setTimeout(checkInterviewData, 20000);
          } else if (isPollingActive) {
            setShowSkeleton(false);
            setGeneratedNotes('No interview data available after timeout.');
            setIsPolling(false);
            isPollingActive = false;
            showWebhookMessage('error', 'Timeout: No data received after 5 minutes.');
          }
        }
      } catch (error) {
        console.error('Error polling for interview data:', error);
        attempts++;
        if (attempts < maxAttempts && isPollingActive) {
          setTimeout(checkInterviewData, 20000);
        } else if (isPollingActive) {
          setShowSkeleton(false);
          setGeneratedNotes('Error retrieving interview data.');
          setIsPolling(false);
          isPollingActive = false;
          showWebhookMessage('error', 'Failed to retrieve interview data.');
        }
      }
    };
    
    checkInterviewData();
  };

  const sendToWebhook = async () => {
    if (!interviewDetails.companyName.trim() || !interviewDetails.position.trim()) {
      showWebhookMessage('error', 'Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setShowSkeleton(true);
    setDataLoaded(false);
    setGeneratedNotes('Loading...');

    try {
      const response = await fetch('https://delightful-passion-production.up.railway.app/interview-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: interviewDetails.companyName,
          position: interviewDetails.position,
          interviewType: interviewDetails.interviewType,
          notes: interviewDetails.notes
        }),
      });

      if (response.ok) {
        showWebhookMessage('success', 'Interview details sent successfully! Generating notes...');
        setIsLoading(false);
        setIsPolling(true);
        pollForInterviewData();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending interview data:', error);
      setShowSkeleton(false);
      setIsLoading(false);
      showWebhookMessage('error', 'Failed to send interview details. Please try again.');
    }
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
              className="lucide lucide-notebook h-4 w-4"
            >
              <path d="M2 6h4"/>
              <path d="M2 10h4"/>
              <path d="M2 14h4"/>
              <path d="M2 18h4"/>
              <rect width="16" height="20" x="4" y="2" rx="2"/>
              <path d="M9 6h1"/>
              <path d="M9 10h1"/>
              <path d="M9 14h1"/>
              <path d="M9 18h1"/>
              <path d="M14 6h1"/>
              <path d="M14 10h1"/>
              <path d="M14 14h1"/>
              <path d="M14 18h1"/>
            </svg>
            Smart Interview Notebook
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Interview Expert
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Transform your interview preparation with AI-powered note-taking and insights. 
            Create comprehensive interview notebooks that help you ace every interview.
          </p>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Our AI analyzes your interview details and generates comprehensive notes, questions, and insights. 
            Simply enter your interview information, and our system will create a detailed notebook 
            to help you prepare and succeed in your interview.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You Get</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• AI-generated interview notes</li>
                <li>• Potential questions & answers</li>
                <li>• Company research insights</li>
                <li>• Interview preparation tips</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Perfect For</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Job interviews</li>
                <li>• Company research</li>
                <li>• Interview preparation</li>
                <li>• Career development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interview Details Form */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Your Interview Notebook</h2>
          <p className="text-gray-600 mb-6 text-center">Enter your interview details and we'll generate comprehensive notes for you.</p>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={interviewDetails.companyName}
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
                  value={interviewDetails.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter job position"
                  required
                />
              </div>
            </div>
            
           
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Discription</label>
              <textarea
                name="notes"
                value={interviewDetails.notes}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any additional information about the interview, company, or your background..."
                rows="4"
              />
            </div>
            
            <div className="text-center">
              <button 
                onClick={sendToWebhook}
                disabled={isLoading || isPolling}
                className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg px-12 py-3 rounded-2xl shadow-colored"
              >
                {isLoading ? 'Generating Notes...' : isPolling ? 'Waiting for Data...' : 'Generate Interview Notebook'}
              </button>
            </div>
          </div>
        </div>

        {/* Generated Interview Notes - Only show after data is loaded */}
        {dataLoaded && !showSkeleton && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Interview Notebook</h2>
            <p className="text-gray-600 mb-6 text-center">AI-generated comprehensive interview preparation notes</p>
            
            <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 min-h-[400px]">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {generatedNotes}
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {showSkeleton && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Interview Notebook</h2>
            <p className="text-gray-600 mb-6 text-center">AI-generated comprehensive interview preparation notes</p>
            
            <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 min-h-[400px]">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartInterviewNotebook;
