import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpiredTrialModal = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <Card className="glass-effect border-red-500/50 max-w-md w-full">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-red-500/10 p-3 rounded-full w-fit mb-4">
                            <Lock className="h-8 w-8 text-red-400" />
                        </div>
                        <CardTitle className="text-2xl text-white">Seu período de teste expirou!</CardTitle>
                        <CardDescription className="text-gray-400">
                            Para continuar acessando todas as funcionalidades incríveis do SavingsAI, por favor, escolha um plano.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-center text-gray-300 mb-6 flex items-center justify-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-emerald-400"/>
                            Seus dados estão seguros e esperam por você.
                        </p>
                        <Button 
                            onClick={() => navigate('/subscription')}
                            className="w-full bg-emerald-500 text-gray-900 font-bold hover:bg-emerald-400 h-12 text-base rounded-lg shadow-lg shadow-emerald-500/20"
                        >
                            Ver Planos e Assinar
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default ExpiredTrialModal;