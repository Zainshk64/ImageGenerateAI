import React, { useState } from 'react';

const Agent1 = () => {
  const [campaignDetails, setCampaignDetails] = useState({
    campaignName: ''
  });
  
  const [emailBodyA, setEmailBodyA] = useState('');
  const [emailBodyB, setEmailBodyB] = useState('');
  const [dynamicResult, setDynamicResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateResult = () => {
    // Simulate AI processing
    const result = `
Campaign Analysis Results:

Campaign Name: ${campaignDetails.campaignName}

A/B Testing Analysis:
- Version A: ${emailBodyA.length} characters
- Version B: ${emailBodyB.length} characters

Recommendations:
${emailBodyA.length > emailBodyB.length ? 'Version A is more detailed' : 'Version B is more concise'}

Suggested improvements:
- Add call-to-action buttons
- Include personalization tokens
- Optimize for mobile viewing
- Test different send times
    `;
    setDynamicResult(result);
  };

  return (
    <div className="px-4 md:px-14 lg:px-24 py-8">
      <div className="max-w-6xl mx-auto">
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
            Specializes in email marketing campaigns, helping users create engaging 
            and high-converting email content that drives results.
          </p>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">About This Agent</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Agent 1 specializes in email marketing campaigns, helping users create engaging 
            and high-converting email content. From welcome series to promotional campaigns, 
            this agent crafts compelling emails that drive engagement and conversions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Features</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Email copywriting & optimization</li>
                <li>• Subject line generation</li>
                <li>• A/B testing suggestions</li>
                <li>• Campaign automation</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Use Cases</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Welcome email series</li>
                <li>• Promotional campaigns</li>
                <li>• Newsletter creation</li>
                <li>• Abandoned cart emails</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Campaign Details Form */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Campaign Details</h2>
          
          <div className="max-w-md mx-auto">
            <div>
              <textarea
                name="campaignName"
                value={campaignDetails.campaignName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[48px]"
                placeholder="Enter campaign details..."
                style={{ height: 'auto', minHeight: '48px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
          </div>
        </div>

        {/* A/B Email Body Columns */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">A/B Email Body</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Version A</h3>
              <textarea
                value={emailBodyA}
                onChange={(e) => setEmailBodyA(e.target.value)}
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write your email body content for version A..."
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Version B</h3>
              <textarea
                value={emailBodyB}
                onChange={(e) => setEmailBodyB(e.target.value)}
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Write your email body content for version B..."
              />
            </div>
          </div>
        </div>

        {/* Dynamic Result Textarea */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8">
          <textarea
            value={dynamicResult}
            readOnly
            className="w-full h-80 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 resize-none"
            placeholder="Result will announce after 14 days..."
          />
        </div>
      </div>
    </div>
  );
};

export default Agent1; 