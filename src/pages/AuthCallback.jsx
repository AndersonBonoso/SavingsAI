import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // The session is handled by the onAuthStateChange listener in SupabaseAuthContext
      // This component just needs to redirect the user after Supabase confirms the session.
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
         toast({
          title: "E-mail confirmado!",
          description: "Sua conta foi ativada com sucesso. Você será redirecionado.",
        });
        navigate('/dashboard');
      } else {
        // This might happen if the user clicks an old link or there's an issue
        toast({
          title: "Falha na autenticação",
          description: "Não foi possível confirmar seu e-mail. Por favor, tente fazer login ou registrar-se novamente.",
          variant: 'destructive',
        });
        navigate('/login');
      }
    };
    
    // The URL hash contains the auth info, so we run this once on mount.
    handleAuthCallback();
    
  }, [navigate, toast]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <p className="text-xl font-semibold">Confirmando seu e-mail...</p>
        <p className="text-gray-400 mt-2">Aguarde um momento, estamos preparando tudo para você.</p>
      </div>
    </div>
  );
};

export default AuthCallback;