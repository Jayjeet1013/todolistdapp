import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {ethers, Signer } from 'ethers'

//internal import
import {toDoListAddress,toDoListABI} from './constants'

const fetchContract =(signerOrProvider) => 
new ethers.Contract(toDoListAddress,toDoListABI,signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({children}) => {
      
    const [currentAccount, setCurrentAccount] = useState('');
    const [error, setError] = useState('');
    const [allToDoList, setAllToDoList] = useState([]);
    const [myList, setMyList] = useState([]);
     
    const [allAddress, setAllAddress] = useState([]);

     //------Connecting Metamask

     const checkIfWalletIsConnect = async() =>{
        if(!window.ethereum) return setError("Please install Metamask");

        const account = await window.ethereum.request({method:"eth_accounts"});
        
       if(account.length) {
        setCurrentAccount(account[0]);
        console.log(account[0]);
       }else{
        setError("Please Install Metamask & connect,reload");
       }

     };

    //  useEffect(()=>{
    //     checkIfWalletIsConnect();
    //  },[]);

    return(
        <ToDoListContext.Provider value={{ checkIfWalletIsConnect}}>
            {children}
        </ToDoListContext.Provider>
    )
}
