import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { ArrowRight, BarChart, Zap, ShieldCheck } from 'lucide-react';
    import MainLayout from '@/components/layout/MainLayout';
    import { Button } from '@/components/ui/button';

    const LandingPage = () => {
        const featureVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.2,
                    duration: 0.5,
                },
            }),
        };

        return (
            <MainLayout>
                <Helmet>
                    <title>SavingsAI - Gestão Financeira Inteligente</title>
                    <meta name="description" content="Assuma o controle de suas finanças com SavingsAI. A ferramenta definitiva para gestão financeira pessoal, investimentos e planejamento futuro." />
                </Helmet>
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.section
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center py-20"
                        >
                            <motion.h1 
                                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                A sua jornada para a <span className="text-emerald-400">liberdade financeira</span> começa aqui.
                            </motion.h1>
                            <motion.p 
                                className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                            >
                                SavingsAI é a sua plataforma completa para organizar despesas, planejar metas e investir com inteligência. Assuma o controle total do seu dinheiro.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.6 }}
                            >
                                <Link to="/register">
                                    <Button size="lg" className="bg-emerald-500 text-gray-900 font-bold hover:bg-emerald-400 h-14 px-8 text-lg rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105">
                                        Comece Agora, é Grátis
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.section>

                        <section id="features" className="py-20 sm:py-32">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Por que escolher o <span className="text-emerald-400">SavingsAI</span>?</h2>
                                <p className="mt-4 text-lg text-gray-400">Ferramentas poderosas e intuitivas para transformar sua vida financeira.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { icon: BarChart, title: 'Controle Total', description: 'Monitore todas as suas receitas e despesas em um único lugar, com categorias personalizáveis.' },
                                    { icon: Zap, title: 'Organização Inteligente', description: 'Use nosso quadro Kanban para gerenciar contas a pagar e a receber de forma visual e intuitiva.' },
                                    { icon: ShieldCheck, title: 'Segurança em Primeiro Lugar', description: 'Seus dados são criptografados e protegidos com os mais altos padrões de segurança.' }
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        custom={i}
                                        variants={featureVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg hover:border-emerald-500 hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 mb-6">
                                            <feature.icon className="h-8 w-8 text-emerald-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <section className="py-20 text-center">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-12 shadow-2xl">
                                <h2 className="text-3xl font-bold text-white mb-4">Pronto para transformar suas finanças?</h2>
                                <p className="text-white/80 mb-8 max-w-2xl mx-auto">Crie sua conta e comece a construir um futuro financeiro mais sólido e próspero hoje mesmo.</p>
                                <Link to="/register">
                                    <Button variant="secondary" size="lg" className="bg-white text-emerald-600 font-bold hover:bg-gray-200 h-14 px-8 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                                        Cadastre-se Gratuitamente
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </MainLayout>
        );
    };

    export default LandingPage;