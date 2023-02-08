import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/header'
import Footer from '@/components/footer'

export default function App({ Component, pageProps }) {
  return (<>
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </>)
}
