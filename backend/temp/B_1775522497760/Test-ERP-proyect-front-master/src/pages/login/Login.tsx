import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Visibility, VisibilityOff } from '@mui/icons-material';
import AuthService from '../../api/AuthService'

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    code: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(credentials);
      /* console.log(response.token);
      console.log(response.roleRoute); */

      navigate(response.roleRoute);
    } catch (error) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
    /* const user = validateCredentials(credentials.code, credentials.password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate(user.roleRoute);
    } else {
      setError('Credenciales inválidas');
    } */
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <div className="w-full h-full">
          <img 
            src="../../imgs/automatizacion1.jpg" 
            alt="Controlador Siemens" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-2xl">R</span>
                  <span className="text-gray-800 font-bold text-2xl tracking-wider">YELD</span>
                  <span className="text-yellow-500 font-bold mx-1">•</span>
                  <span className="text-gray-800 font-bold text-2xl">ASCENSORES</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">Soluciones confiables</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="codigo" className="block text-sm text-gray-600 mb-2">
                  Ingrese su código
                </label>
                <input
                  type="text"
                  placeholder="Codigo"
                  value={credentials.code}
                  onChange={(e) => setCredentials({ ...credentials, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-sm text-gray-600">
                    Contraseña
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer flex items-center gap-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff fontSize='small'/> : <Visibility fontSize='small'/>}
                    <span className="text-xs text-gray-500 hover:text-blue-600">
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </span>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300`}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;