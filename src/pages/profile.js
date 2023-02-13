import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/addUser', {
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
        }),
      });
      const data = await response.json();
      if (data.status === true) {
        toast.success(data.message, { theme: 'colored' });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        toast.error(data.error, { theme: 'colored' });
      }
    } catch (err) {
      toast.error('Something Went Wrong. Try Again...', { theme: 'colored' });
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/user');
      const data = await response.json()
      setUser(data.user)
    }
    fetchData();
  }, [])
  

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto flex items-center justify-center h-full">
        <div className="w-full max-w-lg">
          <div className="flex justify-center items-center mb-3 ">
            <AiOutlineUser className="text-violet-700 text-5xl" />
            <h2 className="ml-3 font-bold text-2xl">My Profile</h2>
          </div>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="bg-violet-200 p-8 rounded-md">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  Update
                </button>
              </div>
            </div>
          </form>
          ) : (
            <div className='bg-violet-200 p-8 rounded-md'>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <div htmlFor="" className="text-xs font-semibold px-1">
                  Name
                </div>
                <div className="w-10 z-10 pl-1 text-center pointer-events-none text-violet-900 font-semibold text-lg">Vikas&nbsp;Yadav</div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-1/3 px-3 mb-5">
                <div htmlFor="" className="text-xs font-semibold px-1">
                  Gender
                </div>
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none text-violet-900 font-semibold text-lg">Male</div>
              </div>
              <div className="w-2/3 px-3 mb-5">
                <div htmlFor="" className="text-xs font-semibold px-1">
                  Mobile
                </div>
                <div className="w-10 z-10 pl-1 text-center pointer-events-none text-violet-900 font-semibold text-lg">7703990035</div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <div htmlFor="" className="text-xs font-semibold px-1">
                  Email
                </div>
                <div className="w-10 z-10 pl-1 text-center pointer-events-none text-violet-900 font-semibold text-lg">vikasyadav14nov@gmail.com</div>
              </div>
            </div>
              <div className="mb-4">
                <button
                  onClick={handleEdit}
                  className="bg-violet-500 hover:bg-violet-700 text-white py-2 px-4 rounded-lg"
                >
                  <AiOutlineEdit className="mr-2" />
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
