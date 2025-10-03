
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '../contexts/CreditContext';

const UpgradePage: React.FC = () => {
  const navigate = useNavigate();
  const { upgradeToPro } = useCredits();

  const handleUpgrade = () => {
    upgradeToPro();
    alert("Congratulations! You've upgraded to Neuronix-AI Pro. Enjoy unlimited access!");
    navigate('/chat');
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white">Upgrade to Pro</h2>
          <p className="mt-4 text-brand-muted">Unlock the full potential of AI.</p>
          
          <div className="my-8 p-6 bg-brand-bg rounded-lg border border-brand-border">
            <p className="text-xl font-medium text-white">
              Get <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">lifetime access</span> to all 6 AI models
            </p>
            <p className="mt-2 text-4xl font-extrabold text-white">
              for just <span className="text-brand-primary">PKR 199</span>
            </p>
          </div>

          <ul className="text-left space-y-3 text-brand-secondary">
            <li className="flex items-center gap-3">
              <CheckIcon /> Unlimited chat credits
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon /> Access to all current & future models
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon /> Priority access to new features
            </li>
             <li className="flex items-center gap-3">
              <CheckIcon /> One-time payment, lifetime access
            </li>
          </ul>

          <button 
            onClick={handleUpgrade}
            className="mt-10 w-full px-8 py-4 text-lg font-semibold text-white bg-brand-primary rounded-md shadow-lg hover:bg-blue-500 transform hover:-translate-y-1 transition-all duration-300"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
        <path d="M20 6 9 17l-5-5"></path>
    </svg>
);


export default UpgradePage;
