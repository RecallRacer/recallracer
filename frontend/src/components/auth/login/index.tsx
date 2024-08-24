import React, { useState, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../authContext';

const Login: React.FC = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setIsSigningIn(false);
                alert('Login failed. Please check your credentials and try again.');
            }
        }
    };

    const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setIsSigningIn(false);
                alert('Google sign-in failed. Please try again.');
            }
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '24rem', color: '#4B5563', padding: '1rem', boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)', borderRadius: '1rem', border: '1px solid #E5E7EB', backgroundColor: '#2A2A2A' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginTop: '0.5rem' }}>
                            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>Welcome Back</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} style={{ marginTop: '1.25rem' }}>
                        <div>
                            <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'white' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem 0.75rem', color: '#6B7280', backgroundColor: 'transparent', border: '1px solid #D1D5DB', borderRadius: '0.5rem', outline: 'none', transition: 'border-color 0.3s' }}
                            />
                        </div>
<div style={{ marginTop: '1.25rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'white' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem 0.75rem', color: '#6B7280', backgroundColor: 'transparent', border: '1px solid #D1D5DB', borderRadius: '0.5rem', outline: 'none', transition: 'border-color 0.3s' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            style={{
                                width: '100%',
                                padding: '0.5rem 1rem',
                                color: '#FFFFFF',
                                fontWeight: '500',
                                borderRadius: '0.5rem',
                                backgroundColor: isSigningIn ? '#D1D5DB' : '#4F46E5',
                                cursor: isSigningIn ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.3s, box-shadow 0.3s'
                            }}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p style={{ textAlign: 'center', color: "white",  fontSize: '0.875rem', marginTop: '1rem' }}>Don't have an account? <Link to={'/register'} style={{ textDecoration: 'underline', fontWeight: '700' }}>Sign up</Link></p>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                        <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#D1D5DB' }}></div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '700', padding: '0 0.5rem' }}>OR</div>
                        <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#D1D5DB' }}></div>
                    </div>
                    <button
                        disabled={isSigningIn}
                        onClick={(e) => { onGoogleSignIn(e) }}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            padding: '0.625rem 0',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: isSigningIn ? 'not-allowed' : 'pointer',
                            backgroundColor: isSigningIn ? '#2A2A2A' : 'rgb(199, 10, 170)',
                            transition: 'background-color 0.3s'
                        }}>
                        <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Login;