import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SupabaseAuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
import { FinanceProvider } from '@/contexts/FinanceContext';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import Dashboard from '@/pages/Dashboard';
import Transactions from '@/pages/Transactions';
import Investments from '@/pages/Investments';
import Subscription from '@/pages/Subscription';
import Profile from '@/pages/Profile';
import GoalsPage from '@/pages/GoalsPage';
import { AnimatePresence } from 'framer-motion';
import ExpiredTrialModal from '@/components/ExpiredTrialModal';
import AuthCallback from '@/pages/AuthCallback';
import CheckEmailPage from '@/pages/CheckEmailPage';

function ProtectedRoute({ children }) {
    const { session, loading, profile, isTrialExpired } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Carregando...</div>;
    }

    if (!session || !profile) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isTrialExpired) {
        return <ExpiredTrialModal />;
    }
    
    return children;
}

function PublicRoute({ children }) {
    const { session, loading } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Carregando...</div>;
    }
    
    return !session ? children : <Navigate to={from} replace />;
}

function AppRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/check-email" element={<CheckEmailPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                <Route path="/investments" element={<ProtectedRoute><Investments /></ProtectedRoute>} />
                <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <SupabaseAuthProvider>
            <FinanceProvider>
                <AppRoutes />
            </FinanceProvider>
        </SupabaseAuthProvider>
    );
}

export default App;