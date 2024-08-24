import React, { useState, FormEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>(''); // New state for displayName
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isRegistering) {
      setIsRegistering(true);

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setIsRegistering(false);
        return;
      }

      try {
        await doCreateUserWithEmailAndPassword(email, password, displayName); // Pass displayName
        navigate('/learn');
      } catch (error) {
        setErrorMessage("Registration failed. Please try again.");
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={'/learn'} replace={true} />}

      <main style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '24rem', color: '#4B5563', padding: '1rem', boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)', borderRadius: '1rem', border: '1px solid #E5E7EB', backgroundColor: '#2A2A2A' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ marginTop: '0.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>Create a New Account</h3>
            </div>
          </div>
          <form onSubmit={onSubmit} style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'white' }}>Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  color: '#6B7280',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'white' }}>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  color: '#6B7280',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  boxShadow: 'inset 0px 5px 5px rgba(0, 0, 0, 0.1)',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'white' }}>Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  color: '#6B7280',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'white' }}>Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  color: '#6B7280',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>

            {errorMessage && <span style={{ color: '#DC2626', fontWeight: '700' }}>{errorMessage}</span>}

            <button
              type="submit"
              disabled={isRegistering}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                color: '#FFFFFF',
                fontWeight: '500',
                borderRadius: '0.5rem',
                backgroundColor: isRegistering ? '#D1D5DB' : '#4F46E5',
                cursor: isRegistering ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s, box-shadow 0.3s'
              }}
            >
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div style={{ fontSize: '0.875rem', textAlign: 'center', color: "white" }}>
              Already have an account?{' '}
              <Link to={'/login'} style={{ textDecoration: 'underline', fontWeight: '700' }}>
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
