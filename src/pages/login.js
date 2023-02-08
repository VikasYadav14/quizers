import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';

import Swal from 'sweetalert2';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
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
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log(data);
        router.push('/home');
      } else {
        const data = await response.json();
        console.log(data);
        Swal.fire('Error', `${data.error}`, 'error');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    router.prefetch('/home');
  });

  return (
    <>
      <div className="flex items-center justify-center py-10 px-4 sm:px-6 lg:p-10">
        <div className="w-full max-w-md space-y-8">
          <div>
          <Link href='/'>
                  <h2 className='text-center text-3xl text-violet-500 hover:text-violet-600 font-bold'>Quizers</h2>
              </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Or
              <Link
                class="font-medium text-violet-600 hover:text-violet-500"
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
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
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
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
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
                <a
                  href="#"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock
                    className="h-5 w-5 text-violet-500 group-hover:text-violet-400"
                    aria-hidden="true"
                  />
                </span>
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
