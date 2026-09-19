import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const securityQuestionsList = [
  'What is the name of your first school?',
  "What is your mother's birthplace or maiden name?",
  'What is the name of your favorite teacher or book?',
  "What was your childhood nickname or pet's name?"
];

const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // 'Login', 'Sign Up', 'Forgot Password'
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState(securityQuestionsList[0]);
  const [securityAnswer, setSecurityAnswer] = useState('');

  // Forgot Password sub-state
  const [forgotStep, setForgotStep] = useState(1); // 1: enter email, 2: answer question & reset
  const [retrievedQuestion, setRetrievedQuestion] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFormFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setSecurityAnswer('');
    setSecurityQuestion(securityQuestionsList[0]);
    setForgotStep(1);
    setRetrievedQuestion('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleStateSwitch = (newState) => {
    resetFormFields();
    setCurrentState(newState);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (currentState === 'Sign Up') {
        if (!securityAnswer.trim()) {
          toast.error('Please provide an answer to the security question');
          setIsSubmitting(false);
          return;
        }

        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
          securityQuestion,
          securityAnswer
        });

        if (response.data.success) {
          toast.success(response.data.message || 'Account created successfully!');
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === 'Login') {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password
        });

        if (response.data.success) {
          toast.success('Logged in successfully!');
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1 of Forgot Password: Fetch security question by email
  const handleGetQuestion = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your registered email');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/get-security-question`, { email });
      if (response.data.success) {
        setRetrievedQuestion(response.data.securityQuestion);
        setForgotStep(2);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Account lookup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2 of Forgot Password: Verify answer and set new password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!securityAnswer.trim()) {
      toast.error('Please provide your security answer');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password-security`, {
        email,
        securityAnswer,
        newPassword
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Password reset successful! Please login.');
        handleStateSwitch('Login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Password reset failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="w-full max-w-md mx-auto my-14 p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-800">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {currentState === 'Forgot Password'
            ? 'Reset Password'
            : currentState === 'Login'
            ? 'Sign In to Your Account'
            : 'Create a New Account'}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {currentState === 'Forgot Password'
            ? 'Answer your security question to set a new password'
            : currentState === 'Login'
            ? 'Enter your credentials to access your cart and orders'
            : 'Fill in your details to register with Goyal Book Depot'}
        </p>
      </div>

      {/* ----------------- FORGOT PASSWORD FLOW ----------------- */}
      {currentState === 'Forgot Password' ? (
        forgotStep === 1 ? (
          <form onSubmit={handleGetQuestion} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Registered Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-lg shadow transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Searching Account...' : 'Continue to Security Question ➔'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => handleStateSwitch('Login')}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Display Question */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-950 space-y-1">
              <span className="font-bold text-indigo-700 block uppercase text-[10px]">
                Your Security Question:
              </span>
              <p className="font-semibold text-sm">{retrievedQuestion}</p>
            </div>

            {/* Answer Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Security Answer *
              </label>
              <input
                type="text"
                required
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Enter exact answer you provided during signup"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                New Password (minimum 8 characters) *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-lg shadow transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Resetting Password...' : 'Reset Password & Login'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setForgotStep(1)}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium mr-4"
              >
                ← Change Email
              </button>
              <button
                type="button"
                onClick={() => handleStateSwitch('Login')}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                Cancel & Login
              </button>
            </div>
          </form>
        )
      ) : (
        /* ----------------- LOGIN & SIGN UP FORMS ----------------- */
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {currentState === 'Sign Up' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (Min 8 characters)"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Security Question Section (Only in Sign Up) */}
          {currentState === 'Sign Up' && (
            <div className="space-y-3 pt-1 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Choose a Security Question (For Password Recovery) *
                </label>
                <select
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-black outline-none"
                >
                  {securityQuestionsList.map((q, idx) => (
                    <option key={idx} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Security Answer *
                </label>
                <input
                  type="text"
                  required
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="e.g. St. Joseph School, Rohtak, etc."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  💡 Keep this answer safe. You will need it if you ever forget your password.
                </p>
              </div>
            </div>
          )}

          {/* Helper Links */}
          <div className="flex items-center justify-between text-xs pt-1">
            {currentState === 'Login' ? (
              <>
                <button
                  type="button"
                  onClick={() => handleStateSwitch('Forgot Password')}
                  className="text-gray-500 hover:text-black hover:underline cursor-pointer"
                >
                  Forgot your password?
                </button>
                <button
                  type="button"
                  onClick={() => handleStateSwitch('Sign Up')}
                  className="text-indigo-600 font-semibold hover:underline cursor-pointer"
                >
                  Create new account
                </button>
              </>
            ) : (
              <div className="w-full text-center">
                <span className="text-gray-500">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => handleStateSwitch('Login')}
                  className="text-indigo-600 font-semibold hover:underline cursor-pointer"
                >
                  Sign In Here
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-lg shadow transition-all disabled:opacity-50 mt-2"
          >
            {isSubmitting
              ? 'Please wait...'
              : currentState === 'Login'
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
