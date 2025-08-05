import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const FinanceContext = createContext();

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

const initialCategories = [
    'Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 
    'Lazer', 'Compras', 'Investimentos', 'Salário', 'Freelance', 'Outros',
    'Telefone', 'Luz', 'Gás', 'Internet', 'Carro', 'Combustível'
];

export function FinanceProvider({ children }) {
  const { session } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(initialCategories);
  const [marketData, setMarketData] = useState({
    currencies: [],
    stocks: [],
    investments: []
  });

  const loadUserTransactions = useCallback(async () => {
    if (session) {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false });

      if (error) {
        toast({ title: "Erro", description: "Não foi possível carregar as transações.", variant: "destructive" });
      } else {
        setTransactions(data);
      }
      setLoading(false);
    }
  }, [session]);

  const fetchMarketData = useCallback(async () => {
    try {
      const mockCurrencies = [
        { symbol: 'USD/BRL', name: 'Dólar Americano', price: 5.12, change: 0.85 },
        { symbol: 'EUR/BRL', name: 'Euro', price: 5.58, change: -0.32 },
        { symbol: 'BTC/BRL', name: 'Bitcoin', price: 285420.50, change: 2.15 },
        { symbol: 'ETH/BRL', name: 'Ethereum', price: 12850.30, change: 1.75 }
      ];
      const mockStocks = [
        { symbol: 'PETR4', name: 'Petrobras', price: 32.45, change: 1.25 },
        { symbol: 'VALE3', name: 'Vale', price: 68.90, change: -0.85 },
        { symbol: 'ITUB4', name: 'Itaú Unibanco', price: 28.75, change: 0.65 },
        { symbol: 'BBDC4', name: 'Bradesco', price: 15.20, change: -1.15 }
      ];
      const mockInvestments = [
        { name: 'Tesouro Selic 2029', type: 'Renda Fixa', yield: '13.65%', risk: 'Baixo', minInvestment: 100 },
        { name: 'CDB Banco Inter', type: 'Renda Fixa', yield: '12.80%', risk: 'Baixo', minInvestment: 500 },
        { name: 'Fundo Multimercado XP', type: 'Fundo', yield: '15.20%', risk: 'Médio', minInvestment: 1000 },
        { name: 'ETF IVVB11', type: 'ETF', yield: '18.45%', risk: 'Alto', minInvestment: 200 }
      ];
      setMarketData({ currencies: mockCurrencies, stocks: mockStocks, investments: mockInvestments });
    } catch (error) {
      console.error('Erro ao buscar dados do mercado:', error);
    }
  }, []);

  useEffect(() => {
    if (session) {
      loadUserTransactions();
      fetchMarketData();
    } else {
      setTransactions([]);
    }
  }, [session, loadUserTransactions, fetchMarketData]);

  const addTransaction = async (transaction) => {
    if (!session) return;
    const newTransaction = {
      ...transaction,
      user_id: session.user.id,
      date: transaction.date || new Date().toISOString().split('T')[0],
    };
    
    const { data, error } = await supabase
      .from('transactions')
      .insert(newTransaction)
      .select()
      .single();

    if (error) {
      toast({ title: "Erro", description: "Não foi possível adicionar a transação.", variant: "destructive" });
    } else {
      setTransactions([data, ...transactions]);
      toast({ title: "Transação adicionada!", description: "Sua transação foi registrada com sucesso." });
    }
  };

  const updateTransaction = async (id, updatedData) => {
    const { data, error } = await supabase
      .from('transactions')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast({ title: "Erro", description: "Não foi possível atualizar a transação.", variant: "destructive" });
    } else {
      setTransactions(transactions.map(t => (t.id === id ? data : t)));
      toast({ title: "Transação atualizada!", description: "As informações foram salvas." });
    }
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) {
      toast({ title: "Erro", description: "Não foi possível remover a transação.", variant: "destructive" });
    } else {
      setTransactions(transactions.filter(t => t.id !== id));
      toast({ title: "Transação removida!", description: "A transação foi excluída." });
    }
  };

  const getBalance = () => {
    return transactions.reduce((acc, t) => {
        const amount = parseFloat(t.amount) || 0;
        return t.type === 'income' ? acc + amount : acc - amount;
    }, 0);
  };

  const getMonthlyData = (month, year) => {
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date + 'T00:00:00');
      return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
    });
    const income = monthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    const expenses = monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    return { income, expenses, balance: income - expenses, transactions: monthTransactions };
  };

  const getCategoryData = () => {
    const categoryTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + (parseFloat(t.amount) || 0);
      });
    return Object.entries(categoryTotals).map(([category, amount]) => ({ category, amount }));
  };

  const value = {
    transactions,
    loading,
    categories: [...new Set(categories)].sort(),
    marketData,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getBalance,
    getMonthlyData,
    getCategoryData,
    fetchMarketData
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}