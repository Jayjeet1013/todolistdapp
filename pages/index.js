import React, {useState,useEffect,useContext} from 'react'
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseFill} from "react-icons/ri";
import {AiFillLock, AiFillUnlock} from "react-icons/ai";
import Image from 'next/image';


//internal import
import { ToDoListContext } from '../context/ ToDolistApp'
import Style from '../styles/index.module.css';
import Loading from "../loding.gif";
import Data from "../components/Data";

const Home = () => {
  const {  checkIfWalletIsConnect,
    connectWallet,
    getToDoList,
    toDoList,
    change,
    currentAccount, 
    error,
    allToDoList,
    myList,
    allAddress,}= useContext(ToDoListContext);
  useEffect(()=>{
  checkIfWalletIsConnect();
  },[]);

  return (
   <div className={Style.home}>
   <div className={Style.navBar}>
   <Image src={Loading} alt="Logo" width={50} height={50} />
     <div className={Style.connect}>
       {!currentAccount ? (
        <button onClick={() => connectWallet()}>Connect Wallet</button>
       ):(
        <button>{currentAccount.slice(0,20)}...</button>
       )}
     </div>
   </div>

   </div>
  )
}

export default Home