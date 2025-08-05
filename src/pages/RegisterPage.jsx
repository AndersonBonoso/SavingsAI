import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { register } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
            return;
        }
        if (formData.password.length < 6) {
            toast({ title: "Erro", description: "A senha deve ter no mínimo 6 caracteres.", variant: "destructive" });
            return;
        }
        setLoading(true);
        const { success } = await register(formData.name, formData.email, formData.password);
        setLoading(false);
        if (success) {
            navigate('/check-email', { state: { email: formData.email } });
        }
    };

    return (
        <AuthLayout
            title="Crie sua Conta"
            description="Comece sua jornada para a liberdade financeira hoje mesmo."
            linkTo="/login"
            linkText="Já tem uma conta?"
        >
            <Helmet>
                <title>Cadastro - SavingsAI</title>
                <meta name="description" content="Crie sua conta no SavingsAI e comece a gerenciar suas finanças." />
            </Helmet>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input id="name" type="text" placeholder="Seu nome" required onChange={handleChange} className="pl-10 h-12 bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input id="email" type="email" placeholder="seu@email.com" required onChange={handleChange} className="pl-10 h-12 bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 6 caracteres" required onChange={handleChange} className="pl-10 pr-10 h-12 bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input id="confirmPassword" type="password" placeholder="Repita sua senha" required onChange={handleChange} className="pl-10 h-12 bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500" />
                    </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" disabled={loading} className="w-full bg-emerald-500 text-gray-900 font-bold hover:bg-emerald-400 h-12 text-base rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-300">
                        {loading ? 'Criando conta...' : 'Criar Conta'}
                    </Button>
                </motion.div>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;