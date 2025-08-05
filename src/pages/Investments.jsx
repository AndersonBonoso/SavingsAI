import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useFinance } from '@/contexts/FinanceContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ArrowUp, ArrowDown, Shield, Zap, BarChart } from 'lucide-react';

const formatCurrency = (value, currency = 'BRL') => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency,
    }).format(value);
};

const InvestmentCard = ({ investment, delay }) => {
    const riskIcons = {
        'Baixo': <Shield className="h-5 w-5 text-green-400" />,
        'Médio': <Zap className="h-5 w-5 text-yellow-400" />,
        'Alto': <BarChart className="h-5 w-5 text-red-400" />,
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
            <Card className="glass-effect border-white/10 card-hover h-full">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-bold text-white">{investment.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            {riskIcons[investment.risk]}
                            <span>{investment.risk}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">{investment.type}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-400">Rentabilidade (a.a.)</p>
                        <p className="text-2xl font-bold text-emerald-400">{investment.yield}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Investimento Mínimo</p>
                        <p className="text-lg font-semibold text-white">{formatCurrency(investment.minInvestment)}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const MarketDataItem = ({ item, delay }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
        <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div>
                <p className="font-semibold text-white">{item.symbol}</p>
                <p className="text-xs text-gray-400">{item.name}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-white">{formatCurrency(item.price)}</p>
                <p className={`text-sm font-medium flex items-center justify-end ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {item.change.toFixed(2)}%
                </p>
            </div>
        </div>
    </motion.div>
);

const Investments = () => {
    const { marketData } = useFinance();

    return (
        <MainLayout>
            <Helmet>
                <title>Investimentos - SavingsAI</title>
                <meta name="description" content="Explore oportunidades de investimento e acompanhe o mercado." />
            </Helmet>

            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-emerald-400" />
                    Mercado e Investimentos
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Card className="glass-effect border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-white">Oportunidades de Investimento</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {marketData.investments.map((inv, i) => (
                                        <InvestmentCard key={i} investment={inv} delay={i * 0.1} />
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <Card className="glass-effect border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white">Cotações de Moedas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {marketData.currencies.map((curr, i) => (
                                    <MarketDataItem key={i} item={curr} delay={i * 0.1} />
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="glass-effect border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white">Ações em Destaque</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {marketData.stocks.map((stock, i) => (
                                    <MarketDataItem key={i} item={stock} delay={i * 0.1} />
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Investments;