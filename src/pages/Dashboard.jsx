import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useFinance } from '@/contexts/FinanceContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft, DollarSign, PlusCircle, Upload, GripVertical } from 'lucide-react';
import TransactionForm from '@/components/TransactionForm';
import { useToast } from "@/components/ui/use-toast";

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const initialColumns = {
  'previsto': { name: 'Previsto', items: [] },
  'pago': { name: 'Pago', items: [] },
  'atrasado': { name: 'Atrasado', items: [] },
};

const Dashboard = () => {
    const { profile } = useAuth();
    const { getBalance, getMonthlyData, transactions, loading: financeLoading } = useFinance();
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [columns, setColumns] = useState(null);

    useEffect(() => {
      if (!financeLoading && transactions) {
        const bills = transactions
          .filter(t => t.type === 'expense')
          .map(t => ({ ...t, id: String(t.id) })); // Ensure id is a string

        const newColumns = JSON.parse(JSON.stringify(initialColumns));
        newColumns.previsto.items = bills;
        setColumns(newColumns);
      }
    }, [transactions, financeLoading]);
    
    const balance = getBalance();
    const { income, expenses } = getMonthlyData(new Date().getMonth(), new Date().getFullYear());

    const handleScanReceipt = () => {
        toast({
            title: "Funcionalidade em desenvolvimento!",
            description: "🚧 O scan de notas com IA ainda não foi implementado. Peça esta funcionalidade no próximo prompt! 🚀",
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination || !columns) return;
        const { source, destination } = result;
        
        const newColumns = { ...columns };
        const sourceColumn = newColumns[source.droppableId];
        const destColumn = newColumns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
        } else {
            destItems.splice(destination.index, 0, removed);
            toast({
                title: "Status da Conta Atualizado!",
                description: `A conta "${removed.description}" foi movida para "${destColumn.name}".`,
            });
        }

        setColumns({
            ...newColumns,
            [source.droppableId]: { ...sourceColumn, items: sourceItems },
            [destination.droppableId]: { ...destColumn, items: destItems }
        });
    };

    return (
        <MainLayout>
            <Helmet>
                <title>Painel - SavingsAI</title>
                <meta name="description" content="Seu painel financeiro completo no SavingsAI." />
            </Helmet>

            <AnimatePresence>
                {isFormOpen && <TransactionForm onClose={() => setIsFormOpen(false)} />}
            </AnimatePresence>

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Olá, {profile?.name?.split(' ')[0]}!</h1>
                        <p className="text-gray-400">Aqui está o resumo da sua vida financeira.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => setIsFormOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-semibold">
                            <PlusCircle className="mr-2 h-4 w-4" /> Nova Transação
                        </Button>
                        <Button onClick={handleScanReceipt} variant="outline" className="bg-transparent border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400">
                            <Upload className="mr-2 h-4 w-4" /> Scan de Nota
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="glass-effect border-white/10 card-hover">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Saldo Atual</CardTitle>
                                <DollarSign className="h-5 w-5 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-3xl font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {formatCurrency(balance)}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="glass-effect border-white/10 card-hover">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Receitas (Mês)</CardTitle>
                                <ArrowUpRight className="h-5 w-5 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{formatCurrency(income)}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className="glass-effect border-white/10 card-hover">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Despesas (Mês)</CardTitle>
                                <ArrowDownLeft className="h-5 w-5 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{formatCurrency(expenses)}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="glass-effect border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Gestão de Contas do Mês</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {columns ? (
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {Object.entries(columns).map(([columnId, column]) => (
                                            <Droppable droppableId={columnId} key={columnId}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className={`p-4 rounded-lg bg-gray-800/50 min-h-[200px] transition-colors ${snapshot.isDraggingOver ? 'bg-emerald-500/10' : ''}`}
                                                    >
                                                        <h3 className="font-bold text-lg text-white mb-4">{column.name}</h3>
                                                        {column.items.map((item, index) => (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={`p-3 mb-3 rounded-lg bg-gray-700/70 border border-gray-600 flex items-center justify-between transition-shadow ${snapshot.isDragging ? 'shadow-lg shadow-emerald-500/30' : ''}`}
                                                                    >
                                                                        <div>
                                                                            <p className="text-white font-semibold">{item.description}</p>
                                                                            <p className="text-sm text-red-400">{formatCurrency(item.amount)}</p>
                                                                        </div>
                                                                        <GripVertical className="text-gray-500" />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        ))}
                                    </div>
                                </DragDropContext>
                            ) : (
                                <div className="text-center py-8 text-gray-400">Carregando gestão de contas...</div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;