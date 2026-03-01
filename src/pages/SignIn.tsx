import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Dumbbell, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Illustration Pane */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#b7ae9f]/10 lg:flex overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7ae9f]/30 via-transparent to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center p-12 text-center">
          <div className="mb-8 h-[450px] w-[450px] rounded-full bg-white/50 p-4 shadow-2xl backdrop-blur-sm">
            <div
              className="h-full w-full overflow-hidden rounded-full bg-cover bg-center shadow-inner"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800')" }}
            ></div>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-800">Embrace Mindfulness</h1>
          <p className="mt-4 max-w-md text-lg text-slate-600">
            Join over 100,000 members finding their balance through personalized wellness journeys.
          </p>
        </div>
        <div className="absolute bottom-[-10%] left-[-5%] h-64 w-64 rounded-full bg-[#b7ae9f]/20 blur-3xl"></div>
      </div>

      {/* Right Side: Auth Pane */}
      <div className="flex w-full flex-col items-center justify-center bg-[#f7f7f7] px-6 py-12 lg:w-1/2 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Header & Logo */}
          <div className="mb-10 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 text-[#b7ae9f] mb-6">
              <Dumbbell className="h-8 w-8" />
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Healthyfiy</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-slate-500">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-6 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1" htmlFor="email">Email Address</label>
              <input
                className="w-full rounded-xl border-stone-200 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#b7ae9f] focus:ring-2 focus:ring-[#b7ae9f]/20"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border-stone-200 bg-white px-4 py-3.5 pr-12 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#b7ae9f] focus:ring-2 focus:ring-[#b7ae9f]/20"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#b7ae9f] transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="h-4 w-4 rounded border-stone-300 text-[#b7ae9f] focus:ring-[#b7ae9f]/50 transition-colors" type="checkbox" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a className="text-sm font-medium text-[#b7ae9f] hover:underline underline-offset-4" href="#">Forgot Password?</a>
            </div>
            <button
              className="w-full rounded-full bg-[#b7ae9f] py-4 text-sm font-bold text-white shadow-lg shadow-[#b7ae9f]/20 transition-all hover:bg-[#b7ae9f]/90 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </button>
          </form>

          {/* Social Login Section */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-stone-200"></div>
              <span className="absolute bg-[#f7f7f7] px-4 text-xs font-medium uppercase tracking-wider text-slate-400">Or continue with</span>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.32-1.92 4.36-1.04 1.04-2.64 1.88-5.92 1.88-5.32 0-9.68-4.32-9.68-9.64s4.36-9.64 9.68-9.64c2.84 0 4.96 1.12 6.48 2.56l2.32-2.32C19.24 1.32 16.24 0 12.48 0 5.6 0 0 5.6 0 12.48s5.6 12.48 12.48 12.48c3.72 0 6.52-1.24 8.76-3.56 2.24-2.24 3.08-5.4 3.08-8.16 0-.56-.04-1.12-.12-1.64h-11.72z" fill="#EA4335"></path>
                </svg>
                <span>Google</span>
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.402-2.427 1.247-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.558-1.702z"></path>
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?
              <Link className="font-bold text-[#b7ae9f] hover:underline underline-offset-4 ml-1" to="/signup">Create an account</Link>
            </p>
          </div>

          <div className="mt-auto pt-10 text-center text-xs text-slate-400">
            <p>© 2024 HEALTHYFIY. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4">
              <a className="hover:text-[#b7ae9f]" href="#">Privacy Policy</a>
              <a className="hover:text-[#b7ae9f]" href="#">Terms of Service</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
