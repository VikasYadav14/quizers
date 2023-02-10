import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === true) {
        toast.success(data.message, { theme: 'colored' });
        localStorage.setItem('token',data.token)
        localStorage.setItem('fname',data.fname)
        setTimeout(() => {
          router.push('/')
        }, 2000);
      } else {
        toast.error(data.error, { theme: 'colored' });
      }
    } catch (err) {
      toast.error('Something Went Wrong. Try Again...', { theme: 'colored' });
    }
  };

  useEffect(() => {
    router.prefetch('/');
  });

  return (
    <div className="flex items-between justify-center py-10 px-4 sm:px-6 lg:p-10 min-h-screen">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link href="/">
            <h2 className="text-center text-3xl text-violet-500 hover:text-violet-600 font-bold">
              Quizers
            </h2>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or
            <Link
              className="font-medium text-violet-600 hover:text-violet-500"
              href="/register"
            >
              {' '}
              Register{' '}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgotPassword"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
                <FaLock
                  className="h-5 w-5 text-violet-500 group-hover:text-violet-400"
                  aria-hidden="true"
                />
              Secure Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
