import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MailCheck } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';

const CheckEmailPage = () => {
    const location = useLocation();
    const email = location.state?.email || 'seu e-mail';

    return (
        <AuthLayout
            title="Verifique seu E-mail"
            description="O último passo para proteger sua conta e começar sua jornada."
            linkTo="/login"
            linkText="Voltar para o Login"
        >
            <Helmet>
                <title>Verifique seu E-mail - SavingsAI</title>
                <meta name="description" content="Página de verificação de e-mail do SavingsAI." />
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <MailCheck className="w-12 h-12 text-emerald-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Confirmação Necessária</h2>
                <p className="text-gray-300 mb-2">
                    Enviamos um link de confirmação para:
                </p>
                <p className="font-bold text-emerald-400 text-lg mb-6">{email}</p>
                <p className="text-gray-400">
                    Clique no link para ativar sua conta. Se não encontrar o e-mail, por favor, verifique sua pasta de spam.
                </p>
            </motion.div>
        </AuthLayout>
    );
};

export default CheckEmailPage;