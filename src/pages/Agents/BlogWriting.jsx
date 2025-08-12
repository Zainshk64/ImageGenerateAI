import React, { useState } from 'react';
import Card from '../../components/Card';

const Agent2 = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  // const blogCards = [
  //   {
  //     id: 1,
  //     image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
  //     title: 'SEO Blog Posts'
  //   },
  //   {
  //     id: 2,
  //     image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
  //     title: 'Thought Leadership'
  //   },
  //   {
  //     id: 3,
  //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  //     title: 'Content Marketing'
  //   },
  //   {
  //     id: 4,
  //     image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&h=300&fit=crop',
  //     title: 'Guest Posts'
  //   }
  // ];

  const handleCardClick = (cardId) => {
    console.log(`Blog card ${cardId} clicked`);
    // Add your click handler logic here
  };

  const generateOutput = () => {
    // Simulate AI processing for blog content
    const result = `
Blog Content Analysis:

Input Text: ${inputText}

Content Analysis:
- Word Count: ${inputText.split(' ').length} words
- Character Count: ${inputText.length} characters
- Estimated Reading Time: ${Math.ceil(inputText.split(' ').length / 200)} minutes

SEO Recommendations:
- Add relevant keywords
- Include meta descriptions
- Optimize for featured snippets
- Improve internal linking

Content Suggestions:
- Expand on key points
- Add supporting examples
- Include call-to-action
- Optimize for readability
    `;
    setOutputText(result);
  };

  return (
    <div className="px-4 md:px-14 lg:px-24 py-8">
      <div className="max-w-6xl mx-auto">
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
              className="lucide lucide-file-text h-4 w-4"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" x2="8" y1="13" y2="13"/>
              <line x1="16" x2="8" y1="17" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Blog Writing
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Blog Expert
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Your go-to specialist for creating engaging and SEO-optimized blog content.
          </p>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">About This Agent</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Agent 2 specializes in blog writing and content creation, helping users create engaging 
            and SEO-optimized blog posts. Whether you need informative articles, thought leadership 
            content, or engaging blog posts, this agent has you covered.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Features</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• SEO-optimized content</li>
                <li>• Engaging blog writing</li>
                <li>• Keyword research</li>
                <li>• Content structure optimization</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Use Cases</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Blog post creation</li>
                <li>• Article writing</li>
                <li>• Content marketing</li>
                <li>• Guest posting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Input Field</h2>
          
          <div className="max-w-4xl mx-auto">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[48px]"
              placeholder="Enter your blog content or topic here..."
              style={{ height: 'auto', minHeight: '48px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
            
            
          </div>
        </div>

        {/* Output Field */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Output</h2>
          
          <textarea
            value={outputText}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 resize-none min-h-[48px]"
            placeholder="AI analysis results will appear here..."
            style={{ height: 'auto', minHeight: '48px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </div>

        {/* Blog Writing Cards Section */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-soft-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Blog Writing Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogCards.map((card) => (
              <Card
                key={card.id}
                image={card.image}
                title={card.title}
                onClick={() => handleCardClick(card.id)}
                className="hover:scale-105"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent2; 