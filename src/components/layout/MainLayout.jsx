import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CreditCard, 
  TrendingUp, 
  User, 
  Crown, 
  LogOut,
  Menu,
  X,
  DollarSign,
  Target,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: 'Painel', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transações', href: '/transactions', icon: CreditCard },
  { name: 'Metas', href: '/goals', icon: Target },
  { name: 'Investimentos', href: '/investments', icon: TrendingUp },
  { name: 'Assinatura', href: '/subscription', icon: Crown },
  { name: 'Perfil', href: '/profile', icon: User },
];

const TrialCountdown = () => {
    const { profile } = useAuth();
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (profile?.trial_ends_at) {
            const interval = setInterval(() => {
                const now = new Date();
                const trialEndDate = new Date(profile.trial_ends_at);
                const difference = trialEndDate - now;

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((difference / 1000 / 60) % 60);
                    setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                } else {
                    setTimeLeft('Expirado');
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [profile?.trial_ends_at]);

    if (!profile || profile.subscription !== 'trial') {
        return null;
    }

    return (
        <div className="mt-auto px-4">
            <Link to="/subscription">
                <div className="glass-effect text-center rounded-lg p-3 transition-transform hover:scale-105">
                    <p className="text-sm font-semibold text-white flex items-center justify-center gap-2"><Clock className="h-4 w-4 text-amber-400"/> Período de Teste</p>
                    <p className="text-xs text-amber-400">{timeLeft ? `Termina em: ${timeLeft}` : 'Calculando...'}</p>
                </div>
            </Link>
        </div>
    );
};

const LoggedOutNav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm shadow-lg">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
          <DollarSign className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold tracking-tight text-white">SavingsAI</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 font-semibold text-white bg-transparent border-2 border-emerald-400 rounded-full hover:bg-emerald-400 hover:text-gray-900 transition-all duration-300"
            >
              Login
            </motion.button>
          </Link>
           <Link to="/register">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center justify-center px-6 py-3 font-semibold text-gray-900 bg-emerald-400 rounded-full hover:bg-emerald-300 transition-all duration-300"
            >
              Cadastre-se
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

const LoggedInLayout = ({ children }) => {
  const { profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-20 px-4 shrink-0">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <DollarSign className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold tracking-tight text-white">SavingsAI</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 shadow-inner'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 space-y-4">
        <TrialCountdown />
        <div className="glass-effect rounded-lg p-3 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
            <AvatarFallback className="bg-emerald-500 text-white font-bold">{profile?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-white">Olá, {profile?.name?.split(' ')[0]}!</p>
            <p className="text-xs text-emerald-400 capitalize">
              Plano {profile?.subscription}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'bg-black/60' : 'pointer-events-none opacity-0'}`} onClick={() => setSidebarOpen(false)} />
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/90 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gray-800/50 backdrop-blur-xl border-r border-white/10">
          <SidebarContent />
        </div>
      </div>

      <div className="lg:pl-64 flex flex-col h-screen">
        <div className="sticky top-0 z-40 lg:hidden flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm border-b border-white/10 h-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/dashboard" className="flex items-center space-x-2">
            <DollarSign className="h-7 w-7 text-emerald-400" />
            <span className="text-xl font-bold tracking-tight text-white">SavingsAI</span>
          </Link>
          <div className="w-10" />
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const MainLayout = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
     return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Carregando...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <LoggedOutNav />
        <main className="flex-grow pt-20">{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="container mx-auto px-4 text-center">
              <p>&copy; {new Date().getFullYear()} SavingsAI. Todos os direitos reservados.</p>
              <p className="text-sm mt-2">Construído com ❤️ por Hostinger Horizons</p>
          </div>
        </footer>
      </div>
    );
  }

  return <LoggedInLayout>{children}</LoggedInLayout>;
};

export default MainLayout;