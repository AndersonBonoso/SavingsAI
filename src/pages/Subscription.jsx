import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

const Subscription = () => {
    const { toast } = useToast();

    const handleChoosePlan = (plan) => {
        toast({
            title: "Integração de Pagamento Necessária",
            description: `🚧 Para assinar o plano ${plan}, é preciso integrar um sistema de pagamento como o Stripe. Você pode solicitar esta funcionalidade no próximo prompt! 🚀`,
        });
    };

    const plans = [
        {
            name: 'Mensal',
            price: 'R$ 19,90',
            period: '/mês',
            features: [
                'Controle financeiro completo',
                'Relatórios detalhados',
                'Suporte via e-mail',
            ],
            buttonText: 'Assinar Plano Mensal',
            popular: false,
        },
        {
            name: 'Anual',
            price: 'R$ 12,49',
            period: '/mês',
            originalPrice: 'R$ 149,90/ano',
            discount: 'Economize 37%!',
            features: [
                'Todos os benefícios do plano mensal',
                'Acesso prioritário a novas funcionalidades',
                'Suporte prioritário',
                'Relatórios anuais consolidados',
            ],
            buttonText: 'Assinar Plano Anual',
            popular: true,
        },
    ];

    return (
        <MainLayout>
            <Helmet>
                <title>Assinatura - SavingsAI</title>
                <meta name="description" content="Escolha o plano ideal para você e potencialize sua gestão financeira." />
            </Helmet>

            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Planos e Preços</h1>
                <p className="text-lg text-gray-400">Escolha o plano que melhor se adapta às suas necessidades e comece a economizar de verdade.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Card className={`h-full flex flex-col glass-effect border-2 ${plan.popular ? 'border-emerald-500' : 'border-white/10'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                    <Star className="h-4 w-4" /> Mais Popular
                                </div>
                            )}
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                                {plan.discount && <CardDescription className="text-emerald-400 font-semibold">{plan.discount}</CardDescription>}
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                                <div className="text-center my-4">
                                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                                    <span className="text-gray-400">{plan.period}</span>
                                    {plan.originalPrice && <p className="text-sm text-gray-500 mt-1">{plan.originalPrice}</p>}
                                </div>
                                <ul className="space-y-3 text-left my-6 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 shrink-0" />
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    onClick={() => handleChoosePlan(plan.name)}
                                    className={`w-full mt-auto text-lg font-bold py-6 ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-400 text-gray-900' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </MainLayout>
    );
};

export default Subscription;