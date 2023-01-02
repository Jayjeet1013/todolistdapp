import React, {useContext} from 'react'
import { RiSendPlaneFill, RiCloseFill} from "react-icons/ri";
import {AiFillLock, AiFillUnlock} from "react-icons/ai";

//internal import

import { ToDoListContext } from '../context/ ToDolistApp';
import Style from "../styles/index.module.css";


const Data = () => {

  const {change} = useContext(ToDoListContext);
  return (
    <div>Data</div>
  )
}

export default Data