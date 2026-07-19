import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { loginWithGoogle, isAuthenticated, isAdmin, loading, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      const result = await loginWithGoogle();
      if (result.success && result.isAdmin) {
        navigate('/admin');
      } else if (result.error) {
        setLoginError('Access Denied: Only admin users can access this panel.');
      }
    } catch (err) {
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Admin Panel</h1>
          <p>Login with Google to access dashboard</p>
        </div>

        <div className="login-body">
          {(error || loginError) && (
            <div className="alert alert-danger">
              {error || loginError}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn-google-login"
          >
            <FcGoogle className="google-icon" />
            {isLoading ? 'Authenticating...' : 'Continue with Google'}
          </button>

          <p className="login-footer-text">
            Only authorized administrators can access this panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;