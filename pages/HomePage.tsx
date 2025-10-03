
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
          Neuronix-AI — Lifetime Access to 6 AI Models
        </h1>
        <p className="mt-4 text-2xl sm:text-3xl font-bold text-white">
          for just <span className="text-brand-primary">PKR 199</span>
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-brand-muted">
          Unlock the power of multiple leading AI models in one seamless interface. Get faster, more diverse, and more creative responses for any task.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/chat"
            className="px-8 py-3 text-lg font-semibold text-white bg-brand-primary rounded-md shadow-lg hover:bg-blue-500 transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Chatting
          </Link>
          <Link
            to="/upgrade"
            className="px-8 py-3 text-lg font-semibold text-brand-secondary bg-brand-surface border border-brand-border rounded-md hover:bg-brand-border transform hover:-translate-y-1 transition-all duration-300"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
      <div className="mt-20 max-w-4xl mx-auto">
          <div className="aspect-video bg-brand-surface border border-brand-border rounded-lg flex items-center justify-center">
              <p className="text-brand-muted">Demo Video Coming Soon</p>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
