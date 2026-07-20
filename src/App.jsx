import { BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Layout from './landing/layout/Layout'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
    useEffect(() => {
      AOS.init({
        duration: 700, // Animation duration in milliseconds
        once: false,
      });
    }, []);

    return(
      <main className='bg-black h-screen'>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </main>
    )
}

export default App