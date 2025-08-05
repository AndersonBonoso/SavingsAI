import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        loadCaptchaEnginge(6, '#1f2937', '#6ee7b7', 'default'); 
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCaptcha = document.getElementById('user_captcha_input').value;

        if (!validateCaptcha(userCaptcha)) {
            toast({
                title: "Captcha Inválido",
                description: "Por favor, tente novamente.",
                variant: "destructive",
            });
            loadCaptchaEnginge(6, '#1f2937', '#6ee7b7', 'default');
            return;
        }

        setLoading(true);
        const { success } = await login(formData.email, formData.password);
        setLoading(false);
        if (success) {
            navigate('/dashboard');
        } else {
             loadCaptchaEnginge(6, '#1f2937', '#6ee7b7', 'default');
        }
    };

    return (
        <AuthLayout
            title="Bem-vindo de Volta!"
            description="Acesse sua conta para continuar gerenciando suas finanças."
            linkTo="/register"
            linkText="Não tem uma conta?"
        >
            <Helmet>
                <title>Login - SavingsAI</title>
                <meta name="description" content="Acesse sua conta SavingsAI." />
            </Helmet>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Sua senha" required onChange={handleChange} className="pl-10 pr-10 h-12 bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="user_captcha_input">Verificação de Segurança</Label>
                     <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="bg-gray-700 border border-gray-600 rounded-lg p-2">
                           <LoadCanvasTemplate reloadColor="#6ee7b7" />
                        </div>
                        <Input id="user_captcha_input" type="text" placeholder="Digite o texto" required className="h-12 bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-emerald-500" />
                    </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" disabled={loading} className="w-full bg-emerald-500 text-gray-900 font-bold hover:bg-emerald-400 h-12 text-base rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-300">
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </motion.div>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;