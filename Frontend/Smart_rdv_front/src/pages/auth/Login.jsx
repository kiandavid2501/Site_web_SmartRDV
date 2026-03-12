import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// import './Login.css'; // Removed to use Tailwind

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          motDePasse: formData.password
        }),
      });

      let data;
      const responseText = await response.text();
      
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('Erreur parsing JSON:', parseError);
        throw new Error('Le serveur a renvoyé une réponse invalide');
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Erreur de connexion');
      }

      // Login successful
      const { token, role: userRole, email: userEmail, nom: userName, prenom: userPrenom } = data;

      if (!token || !userRole) {
        throw new Error('Données de connexion incomplètes reçues du serveur');
      }

      login(token, userRole, { email: userEmail, nom: userName, prenom: userPrenom });
      
      // Redirect based on role
      let targetPath = '/';
      switch(userRole.toUpperCase()) {
        case 'ADMIN': targetPath = '/admin/dashboard'; break;
        case 'PROFESSIONNEL': 
        case 'PROFESSIONAL':
        case 'ENTREPRISE':
          targetPath = '/entreprise/dashboard'; 
          break;
        case 'CLIENT': targetPath = '/client/dashboard'; break;
        default: targetPath = '/';
      }
      
      navigate(targetPath, { replace: true });
      
    } catch (error) {
      console.error('Erreur de connexion détaillée:', error);
      setError("Compte introuvable ou mot de passe incorrect. Veuillez vérifier vos informations de connexion et réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/')} 
            className="group flex items-center justify-center w-auto mx-auto px-4 py-2 mb-6 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>
          
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl flex items-center justify-center mb-6 shadow-indigo-100 shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <LogIn className="h-10 w-10 text-indigo-600" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Bienvenue
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Connectez-vous à votre espace personnel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-100">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erreur de connexion</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all bg-gray-50 focus:bg-white hover:bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all bg-gray-50 focus:bg-white hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                disabled={loading}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 cursor-pointer select-none">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <button type="button" disabled={loading} className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Mot de passe oublié ?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Se connecter'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <button 
              onClick={() => navigate('/home-second')} 
              disabled={loading}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors ml-1"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;