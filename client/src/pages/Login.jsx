import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      const { token, user } = res.data;

      // ✅ Save token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ Redirect
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[300px]">

        <h2 className="text-xl mb-4 text-center font-semibold">Login</h2>

        {error && (
          <p className="text-red-500 mb-2 text-sm text-center">{error}</p>
        )}

        {/* ✅ FORM START */}
        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-violet-600 text-white w-full py-2 rounded disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

        </form>
        {/* ✅ FORM END */}

      </div>
    </div>
  );
}