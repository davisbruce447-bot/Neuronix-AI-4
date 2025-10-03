
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCredits } from '../contexts/CreditContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { UserPlan } from '../services/types';

const Navbar: React.FC = () => {
    const { plan, credits, isCreditInitialized } = useCredits();
    const { user, session } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary">
                                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                           Neuronix-AI
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {session && isCreditInitialized && (
                             <div className="flex items-center gap-2 text-sm bg-brand-surface px-3 py-1.5 rounded-full">
                                {plan === UserPlan.PRO ? (
                                    <>
                                        <span className="font-semibold text-purple-400">PRO</span>
                                        <span>Unlimited</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="font-semibold text-brand-primary">Credits:</span>
                                        <span>{credits}</span>
                                    </>
                                )}
                            </div>
                        )}
                         {session ? (
                             <button 
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-brand-surface border border-brand-border rounded-md hover:bg-brand-border transition-colors"
                            >
                                Logout
                            </button>
                         ) : (
                            <Link 
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-white bg-brand-surface border border-brand-border rounded-md hover:bg-brand-border transition-colors"
                            >
                                Login
                            </Link>
                         )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
