import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Target } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const GoalsPage = () => {
    const { toast } = useToast();

    const handleAddGoal = () => {
        toast({
            title: "Funcionalidade em desenvolvimento!",
            description: "🚧 A criação de metas financeiras ainda não foi implementada. Você pode solicitar esta funcionalidade no próximo prompt! 🚀",
        });
    };

    return (
        <MainLayout>
            <Helmet>
                <title>Metas Financeiras - SavingsAI</title>
                <meta name="description" content="Crie e acompanhe suas metas financeiras para alcançar seus sonhos." />
            </Helmet>

            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Target className="h-8 w-8 text-emerald-400" />
                        Minhas Metas
                    </h1>
                    <Button onClick={handleAddGoal} className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-semibold">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Meta
                    </Button>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="glass-effect border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Acompanhe Seus Sonhos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400">
                                <img  alt="A person climbing a mountain of coins" className="w-48 h-48 mb-4" src="https://images.unsplash.com/photo-1579227114400-4752dc0a7506" />
                                <p>A funcionalidade de Metas está a caminho!</p>
                                <p className="text-sm">Em breve, você poderá criar metas para suas viagens, compras e muito mais.</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default GoalsPage;