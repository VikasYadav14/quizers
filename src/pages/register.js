import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function Register() {
  const router = useRouter();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('Male');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fname, lname, gender, mobile, email, password);
    try {
      const response = await fetch(
        'https://backend-rankers.vercel.app/api/createUser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            fname: fname,
            lname: lname,
            gender: gender,
            mobile: mobile,
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.status === true) {
        toast.success(data.message, { theme: 'colored' });
        router.push('/login');
      } else {
        toast.error(data.error, { theme: 'colored' });
      }
    } catch (err) {
      console.log(err.message);
      toast.error('Something Went Wrong. Try Again...', { theme: 'colored' });
    }
  };

  useEffect(() => {
    router.prefetch('/login');
  });

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
      <div className="md:flex w-auto justify-center ">
        <div className="w-full md:w-full py-10 px-5 md:px-10 ">
          <Link href="/">
            <h2 className="text-center text-3xl text-violet-500 hover:text-violet-600 font-bold">
              Quizers
            </h2>
          </Link>
          <div className="text-center mb-5 pt-10">
            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
            <p>Enter your information to register</p>
            <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Or
              <Link
                class="font-medium text-violet-400 hover:text-violet-600"
                href="/login"
              >
                {' '}
                Log In{' '}
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  First name
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    placeholder="John"
                    required
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-1/2 px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Last name
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    placeholder="Smith"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-1/3 px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Gender
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <select
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Others</option>
                  </select>
                </div>
              </div>
              <div className="w-2/3 px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Mobile
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="number"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    placeholder="9876543210"
                    required
                    minLength="10"
                    maxLength="10"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Email
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="email"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    placeholder="johnsmith@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Password
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    placeholder="************"
                    required
                    minLength="6"
                    maxLength="15"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button
                  type="submit"
                  className="block w-full max-w-xs mx-auto bg-violet-500 hover:bg-violet-700 focus:bg-violet-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
