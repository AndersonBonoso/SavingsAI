import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { useFinance } from '@/contexts/FinanceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Search, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import TransactionForm from '@/components/TransactionForm';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDate = (dateString) => {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
};

const Transactions = () => {
  const { transactions, loading, deleteTransaction } = useFinance();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  return (
    <MainLayout>
      <Helmet>
        <title>Transações - SavingsAI</title>
        <meta name="description" content="Veja e gerencie todas as suas transações financeiras." />
      </Helmet>

      <AnimatePresence>
        {isFormOpen && (
          <TransactionForm
            onClose={handleCloseForm}
            transaction={editingTransaction}
          />
        )}
      </AnimatePresence>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-white">Transações</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button onClick={handleAddNew} className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-semibold">
              <PlusCircle className="mr-2 h-4 w-4" /> Nova
            </Button>
          </div>
        </div>

        <motion.div
          className="glass-effect border-white/10 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Table>
            <TableHeader>
              <TableRow className="border-b-white/10 hover:bg-transparent">
                <TableHead className="text-white">Descrição</TableHead>
                <TableHead className="text-white">Valor</TableHead>
                <TableHead className="text-white">Categoria</TableHead>
                <TableHead className="text-white">Data</TableHead>
                <TableHead className="text-right text-white"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                    Carregando transações...
                  </TableCell>
                </TableRow>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <TableRow key={t.id} className="border-b-white/10">
                    <TableCell className="font-medium text-white">{t.description}</TableCell>
                    <TableCell className={t.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                      {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                    </TableCell>
                    <TableCell className="text-gray-300">{t.category}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(t.date)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-white/10">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
                          <DropdownMenuItem onClick={() => handleEdit(t)} className="cursor-pointer focus:bg-white/10">
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteTransaction(t.id)} className="cursor-pointer focus:bg-red-500/20 focus:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Transactions;