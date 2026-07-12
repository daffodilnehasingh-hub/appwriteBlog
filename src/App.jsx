import React,{ useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './Components';
import { Outlet } from 'react-router-dom';
import { client } from './lib/appwrite';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    // Ping Appwrite backend to verify connection
    client.ping().then(() => {
      console.log('✅ Appwrite connection verified!');
    }).catch((err) => {
      console.warn('⚠️ Appwrite ping failed:', err.message);
    });

    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])
  return !loading ? (
    <div className='min-h-screen flex justify-center items-center bg-gray-200'>
      <div className='flex flex-col min-h-screen'>
        <Header/>
        <main>
           <Outlet/> 
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
