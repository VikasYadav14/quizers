import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/header';
import Footer from '@/components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const [user, setUser] = useState('')
  const [key, setKey] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fname = localStorage.getItem('fname')
    if (token) {
      setIsAuthenticated(token)
      setUser(fname)
      setKey(Math.random())
    }
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('fname')
    setIsAuthenticated('')
    setUser('')
    setKey(Math.random())
    router.push('/')
  }

  return (
    <><Head>
    <title>Quizers | Practice from Quizs</title>
    <meta name="description" content="Practice for your competitive exams" />
    <link rel="icon" href='/Qlogo.png' />
  </Head>
      <Navbar isAuthenticated={isAuthenticated} key={key} user={user} logout={logout} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
