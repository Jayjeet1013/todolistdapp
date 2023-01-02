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
  const [message, setMessage] = useState('')

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
  getToDoList();
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
   <div className={Style.home_box}>
      <div className={Style.home_completed}>
       <h2>To Do History List</h2>
       <div>
        {myList.map((el,i)=>(
          <div className={Style.home_completed_list}>
             <MdVerified className={Style.iconColor}/>
             <p>{el.slice(0,30)}..</p>
          </div>
        ))}
       </div>
      </div>
      <div className={Style.home_create}>
         <div className={Style.home_create_box}>
           <h2>Create BlockChain ToDoList</h2>
           <div className={Style.home_create_input}>
            <input type='Text' placeholder='Enter YOur TOdo' onChange={(e) => setMessage(e.target.value)}/>
            {currentAccount ? (

            <RiSendPlaneFill className={Style.iconBlack} onClick={() => toDoList(message)}/>
             
            ):(
              <RiSendPlaneFill 
              className={Style.iconBlack}
              onClick={() => connectWallet()} />
            )} 
           </div>
           <Data
            allToDoList={allToDoList}
            allAddress={allAddress}
            myList={myList}
           />
         </div>
      </div>
   </div>
   </div>
  )
}

export default Home