import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Mail, Shield, Edit, Camera, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const avatarSamples = [
  'male', 'female', 'human', 'identicon', 'initials', 
  'bottts', 'avataaars', 'jdenticon', 'gridy', 'micah'
];

const Profile = () => {
    const { profile, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(profile?.name || '');
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const handleSave = () => {
        updateUserProfile({ name });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setName(profile.name);
        setIsEditing(false);
    };
    
    const handleAvatarSelect = (seed) => {
        const avatar_url = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`;
        updateUserProfile({ avatar_url });
        setIsAvatarModalOpen(false);
    };

    if (!profile) {
        return <MainLayout><div className="text-white">Carregando perfil...</div></MainLayout>;
    }

    return (
        <MainLayout>
            <Helmet>
                <title>Meu Perfil - SavingsAI</title>
                <meta name="description" content="Gerencie suas informações de perfil e configurações." />
            </Helmet>

            <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Escolha um Avatar</DialogTitle>
                        <DialogDescription>
                            Selecione um dos avatares abaixo para seu perfil.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 py-4">
                        {avatarSamples.map(seed => (
                             <img  
                                key={seed} 
                                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}
                                alt={`Avatar sample ${seed}`}
                                className="w-20 h-20 rounded-full cursor-pointer hover:ring-2 ring-emerald-400 transition"
                                onClick={() => handleAvatarSelect(seed)} 
                             />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="outline" className="bg-transparent border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400">
                            <Edit className="mr-2 h-4 w-4" /> Editar Perfil
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                             <Button onClick={handleCancel} variant="outline" className="text-white">
                                <X className="mr-2 h-4 w-4" /> Cancelar
                            </Button>
                            <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-400 text-gray-900">
                                <Save className="mr-2 h-4 w-4" /> Salvar
                            </Button>
                        </div>
                    )}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="glass-effect border-white/10 max-w-2xl mx-auto">
                        <CardHeader className="items-center">
                            <div className="relative">
                                <Avatar className="w-32 h-32 text-4xl">
                                    <AvatarImage src={profile.avatar_url} alt={profile.name} />
                                    <AvatarFallback className="bg-emerald-600 text-white font-bold">{profile.name?.[0]}</AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <button onClick={() => setIsAvatarModalOpen(true)} className="absolute bottom-1 right-1 bg-gray-900/80 text-white p-2 rounded-full hover:bg-emerald-500 transition-colors">
                                        <Camera className="h-5 w-5"/>
                                    </button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 p-8">
                           {isEditing ? (
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-400">Nome Completo</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="text-lg bg-white/10 border-white/20 text-white" />
                                </div>
                           ) : (
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <User className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Nome Completo</p>
                                    <p className="text-lg font-semibold text-white">{profile.name}</p>
                                </div>
                            </div>
                           )}

                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Mail className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">E-mail</p>
                                    <p className="text-lg font-semibold text-white">{profile.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Shield className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Plano Atual</p>
                                    <p className="text-lg font-semibold text-white capitalize">{profile.subscription}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default Profile;