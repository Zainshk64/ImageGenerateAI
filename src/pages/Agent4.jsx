import React from 'react';

const Agent4 = () => {
  return (
    <div className="px-4 md:px-14 lg:px-24 py-8">
      <div className="max-w-4xl mx-auto">
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
              className="lucide lucide-brain h-5 w-5"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.88A2.5 2.5 0 0 1 4.5 9.5a2.5 2.5 0 0 1 5-2.5 2.5 2.5 0 0 1 5 2.5 2.5 2.5 0 0 1 5 2.5 2.5 2.5 0 0 1-2.96 3.88A2.5 2.5 0 0 1 12 19.94V4.5A2.5 2.5 0 0 1 9.5 2Z"/>
            </svg>
            Persistent Candidate Memory Layer
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-[1.05]">
            AI Agent 4
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {" "}Memory Expert
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced memory system that maintains persistent candidate data and preferences.
          </p>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">About This Agent</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Agent 4 provides a persistent memory layer that maintains candidate data, preferences, 
            and interaction history. This enables personalized experiences and continuous learning 
            across all interactions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Features</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Persistent data storage</li>
                <li>• Candidate preference tracking</li>
                <li>• Interaction history</li>
                <li>• Personalized experiences</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Use Cases</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• User profile management</li>
                <li>• Preference learning</li>
                <li>• Session continuity</li>
                <li>• Data persistence</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <button className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-6 rounded-2xl shadow-colored">
              Start Using Agent 4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent4; 