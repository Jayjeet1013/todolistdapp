import React, {useState,useEffect,useContext} from 'react'

//internal import
import { ToDoListContext } from '../context/ ToDolistApp'

const Home = () => {
  const {checkIfWalletIsConnect}= useContext(ToDoListContext);
  useEffect(()=>{
  checkIfWalletIsConnect();
  },[]);
  return (
    <div>Home</div>
  )
}

export default Home