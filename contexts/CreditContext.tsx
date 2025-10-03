
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { UserPlan } from '../services/types';
import { DAILY_FREE_CREDITS } from '../constants';

interface CreditContextType {
  plan: UserPlan;
  credits: number;
  isCreditInitialized: boolean;
  deductCredit: () => void;
  upgradeToPro: () => void;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<UserPlan>(UserPlan.FREE);
  const [credits, setCredits] = useState<number>(DAILY_FREE_CREDITS);
  const [isCreditInitialized, setIsCreditInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('userPlan');
      if (storedPlan === UserPlan.PRO) {
        setPlan(UserPlan.PRO);
        setCredits(Infinity);
      } else {
        const lastReset = localStorage.getItem('lastCreditReset');
        const today = new Date().toDateString();
        if (lastReset !== today) {
          localStorage.setItem('credits', String(DAILY_FREE_CREDITS));
          localStorage.setItem('lastCreditReset', today);
          setCredits(DAILY_FREE_CREDITS);
        } else {
          setCredits(Number(localStorage.getItem('credits') || DAILY_FREE_CREDITS));
        }
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      setCredits(DAILY_FREE_CREDITS);
    } finally {
        setIsCreditInitialized(true);
    }
  }, []);

  const deductCredit = useCallback(() => {
    if (plan === UserPlan.FREE) {
      setCredits((prev) => {
        const newCredits = Math.max(0, prev - 1);
        try {
            localStorage.setItem('credits', String(newCredits));
        } catch(e) { console.error(e) }
        return newCredits;
      });
    }
  }, [plan]);

  const upgradeToPro = useCallback(() => {
    setPlan(UserPlan.PRO);
    setCredits(Infinity);
    try {
        localStorage.setItem('userPlan', UserPlan.PRO);
        localStorage.removeItem('credits');
        localStorage.removeItem('lastCreditReset');
    } catch(e) { console.error(e) }
  }, []);

  return (
    <CreditContext.Provider value={{ plan, credits, isCreditInitialized, deductCredit, upgradeToPro }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = (): CreditContextType => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};
