import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, ShieldCheck } from 'lucide-react';

const AuthLayout = ({ children, title, description, linkTo, linkText }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      
      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <DollarSign className="h-10 w-10 text-emerald-400" />
            <span className="text-3xl font-bold tracking-tight text-white">SavingsAI</span>
          </Link>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Experimente todas as funcionalidades por 7 dias grátis!</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 mt-2">{description}</p>
          </div>
          {children}
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            {linkText}{' '}
            <Link to={linkTo} className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              Clique aqui
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;