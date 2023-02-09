import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/header';
import Footer from '@/components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const [user, setUser] = useState('')
  const [key, setKey] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fname = localStorage.getItem('fname')
    if(token){
      setIsAuthenticated(token)
      setUser(fname)
      setKey(Math.random())
    }
  },[router.query])

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} key={key} user={user} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
