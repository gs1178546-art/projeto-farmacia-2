import { useState, useEffect } from 'react';
import { getLoyaltyConfig, getLoyaltyTransactions, addLoyaltyTransaction } from '../services/loyaltyService';
import { LoyaltyConfig, LoyaltyTransaction } from '../types/loyalty';
import { useAuth } from './useAuth';

export function useLoyalty() {
  const { user, updateCashback } = useAuth();
  const [config, setConfig] = useState<LoyaltyConfig | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const c = await getLoyaltyConfig();
        setConfig(c);
      } catch (e) {
        console.error('Error loading loyalty config', e);
      }
    }
    loadConfig();
  }, []);

  useEffect(() => {
    async function loadTransactions() {
      if (!user) return;
      setLoading(true);
      try {
        const txs = await getLoyaltyTransactions(user.id);
        setTransactions(txs);
      } catch (e) {
        console.error('Error loading loyalty transactions', e);
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, [user]);

  const creditLoyalty = async (amount: number, description: string) => {
    if (!user) return;
    const newTx = await addLoyaltyTransaction({
      customerId: user.id,
      type: 'credit',
      amount,
      description
    });
    setTransactions((prev) => [newTx, ...prev]);
    const newBalance = user.cashbackBalance + amount;
    updateCashback(newBalance);
  };

  const debitLoyalty = async (amount: number, description: string) => {
    if (!user) return;
    const newTx = await addLoyaltyTransaction({
      customerId: user.id,
      type: 'debit',
      amount,
      description
    });
    setTransactions((prev) => [newTx, ...prev]);
    const newBalance = Math.max(0, user.cashbackBalance - amount);
    updateCashback(newBalance);
  };

  return {
    config,
    transactions,
    loading,
    creditLoyalty,
    debitLoyalty
  };
}
