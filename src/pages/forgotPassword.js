import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [send, setSend] = useState(false);

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sendOTP', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      if (data.status === true) {
        toast.success(data.message, { theme: 'colored' });
        console.log(data);
        setSend(true);
      } else {
        toast.error(data.error, { theme: 'colored' });
      }
    } catch (error) {
      toast.error('Something Went Wrong. Try Again...', { theme: 'colored' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword != conPassword)
        toast.warn('Confirm Password is not same', { theme: 'colored' });
      else {
        const response = await fetch('/api/verifyOTP', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            email: email,
            newPassword: newPassword,
            otp: OTP,
          }),
        });
        const data = await response.json();
        if (data.status === true) {
          toast.success(data.message, { theme: 'colored' });
          router.push('/login');
        } else {
          toast.error(data.error, { theme: 'colored' });
        }
      }
    } catch (err) {
      toast.error('Something Went Wrong. Try Again...', { theme: 'colored' });
    }
  };

  useEffect(() => {
    router.prefetch('/login');
  });

  return (
    <>
      <div className="flex items-between justify-center py-10 px-4 sm:px-6 lg:p-10 min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link href="/">
              <h2 className="text-center text-3xl text-violet-500 hover:text-violet-600 font-bold">
                Quizers
              </h2>
            </Link>
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Or
              <Link
                className="font-medium text-violet-600 hover:text-violet-400"
                href="/login"
              >
                {' '}
                Log In{' '}
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {!send && (
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
              )}
              {send && (
                <>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      OTP
                    </label>
                    <input
                      type="number"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                      placeholder="OTP"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength="6"
                      maxLength="15"
                      className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                      placeholder="Confirm Password"
                      value={conPassword}
                      onChange={(e) => setConPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            {!send && (
              <>
                <div>
                  <button
                    onClick={handleOtp}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    Send OTP
                  </button>
                </div>
              </>
            )}
            {send && (
              <>
                <div className="text-sm text-right">
                  <button
                    onClick={handleOtp}
                    className="font-medium text-violet-600 hover:text-violet-500"
                  >
                    Resend OTP
                  </button>
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
                    Reset Password
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
