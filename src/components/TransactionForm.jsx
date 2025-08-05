import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFinance } from '@/contexts/FinanceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

const TransactionForm = ({ onClose, transaction }) => {
  const { addTransaction, updateTransaction, categories } = useFinance();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      amount: parseFloat(formData.amount),
    };
    if (transaction) {
      await updateTransaction(transaction.id, dataToSubmit);
    } else {
      await addTransaction(dataToSubmit);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="relative bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">{transaction ? 'Editar' : 'Nova'} Transação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type" className="text-gray-400">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-400">Descrição</Label>
            <Input id="description" value={formData.description} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
          </div>
          <div>
            <Label htmlFor="amount" className="text-gray-400">Valor</Label>
            <Input id="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
          </div>
          <div>
            <Label htmlFor="category" className="text-gray-400">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date" className="text-gray-400">Data</Label>
            <Input id="date" type="date" value={formData.date} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
          </div>
          <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold">
            {transaction ? 'Salvar Alterações' : 'Adicionar Transação'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default TransactionForm;