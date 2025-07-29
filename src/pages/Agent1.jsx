import React, { useState } from 'react';

const Agent1 = () => {
  const [campaignDetails, setCampaignDetails] = useState({
    campaignName: ''
  });
  
  const [emailBodyA, setEmailBodyA] = useState('Loading...');
  const [emailBodyB, setEmailBodyB] = useState('Loading...');
  const [dynamicResult, setDynamicResult] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookMessage, setWebhookMessage] = useState({ show: false, type: '', text: '' });
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignDetails(prev => ({
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


  const fetchEmailData = async () => {
    const API_BASE = "https://extra-production-980c.up.railway.app";
    const types = ['emailA', 'emailB', 'result'];

    for (const type of types) {
      try {
        const res = await fetch(`${API_BASE}/${type}`);
        const data = await res.json();

        // Extract only values, no keys or brackets
        const plainText = data.map(obj => Object.values(obj).join('\n')).join('\n\n');
        
        if (type === 'emailA') {
          setEmailBodyA(plainText || 'No data yet.');
        } else if (type === 'emailB') {
          setEmailBodyB(plainText || 'No data yet.');
        } else if (type === 'result') {
          setDynamicResult(plainText || 'Result will be displayed in 14 days');
        }
      } catch (err) {
        console.error(`Error fetching ${type}:`, err);
        if (type === 'emailA') {
          setEmailBodyA('Error loading data.');
        } else if (type === 'emailB') {
          setEmailBodyB('Error loading data.');
        } else if (type === 'result') {
          setDynamicResult('Result will be displayed in 14 days');
        }
      }
    }
    setDataLoaded(true);
  };

  const sendToWebhook = async () => {
    setIsLoading(true);
    const message = {
      campaignName: campaignDetails.campaignName,
      emailBodyA: emailBodyA,
      emailBodyB: emailBodyB,
      timestamp: new Date().toISOString()
    };

    try {
      // Send webhook and wait for completion
      const response = await fetch('https://distinct-manually-lemming.ngrok-free.app/webhook-test/b19021d9-8e73-4ad5-88b5-603cd0510918', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (response.ok) {
        showWebhookMessage('success', 'Webhook sent successfully! Processing email content...');
        
        // Wait a moment for the workflow to complete
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Now fetch the email data after workflow completion
        await fetchEmailData();
        showWebhookMessage('success', 'Email content generated successfully!');
      } else {
        throw new Error('Webhook failed');
      }
    } catch (error) {
      console.error(error);
      showWebhookMessage('error', 'Failed to send webhook. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-14 lg:px-24 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Webhook Message */}
        {webhookMessage.show && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 ${
            webhookMessage.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <div className="flex items-center gap-2">
              {webhookMessage.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{webhookMessage.text}</span>
            </div>
          </div>
        )}
        <div className="text-center mb-12">
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
              className="lucide lucide-mail h-5 w-5"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Email Marketing Campaigns
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-[1.05]">
            AI Agent 1
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {" "}Email Expert
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your email marketing with AI-powered campaign optimization. 
            Create compelling A/B test content that drives engagement and conversions.
          </p>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Our AI analyzes your campaign details and generates optimized email content for A/B testing. 
            Simply enter your campaign information, and our system will create two distinct versions 
            to maximize your email performance and conversion rates.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You Get</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• AI-generated email content</li>
                <li>• A/B testing versions</li>
                <li>• Performance analytics</li>
                <li>• Optimization insights</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Perfect For</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Marketing campaigns</li>
                <li>• Product launches</li>
                <li>• Newsletter content</li>
                <li>• Promotional emails</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Campaign Details Form */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Start Your Campaign</h2>
          <p className="text-gray-600 mb-6 text-center">Describe your email campaign and we'll generate optimized content for you.</p>
          
          <div className="max-w-md mx-auto">
            <div>
              <textarea
                name="campaignName"
                value={campaignDetails.campaignName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[48px]"
                placeholder="Describe your campaign: target audience, goals, product/service..."
                style={{ height: 'auto', minHeight: '48px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
            
            <div className="text-center mt-6">
              <button 
                onClick={sendToWebhook}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg px-12 py-6 rounded-2xl shadow-colored"
              >
                {isLoading ? 'Generating Content...' : 'Generate Email Content'}
              </button>
            </div>
          </div>
        </div>

        {/* A/B Email Body Columns - Only show after data is loaded */}
        {dataLoaded && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generated Email Content</h2>
            <p className="text-gray-600 mb-6 text-center">Your AI-generated email versions for A/B testing</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Version A</h3>
                <div className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 overflow-y-auto">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {emailBodyA}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4">Version B</h3>
                <div className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 overflow-y-auto">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {emailBodyB}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Result Display - Only show after data is loaded */}
        {dataLoaded && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Performance Results</h2>
            <p className="text-gray-600 mb-6 text-center">Track your campaign performance and optimization insights</p>
            
            <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 min-h-[60px]">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {dynamicResult === 'Loading...' ? 'Result will be displayed in 14 days' : dynamicResult}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agent1; 