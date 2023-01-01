import React, {useState,useEffect,useContext} from 'react'
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseFill} from "react-icons/rx";
import {AiFillLock, AiFillUnlock} from "react-icons/ai";
import Image from 'next/image';


//internal import
import { ToDoListContext } from '../context/ ToDolistApp'
import Style from '../styles/index.module.css';
import Loading from "../loding.gif";
import Data from "../components/Data";

const Home = () => {
  const {checkIfWalletIsConnect,toDoList}= useContext(ToDoListContext);
  useEffect(()=>{
  checkIfWalletIsConnect();
  toDoList();
  },[]);
  return (
    <div>Home</div>
  )
}

export default Home