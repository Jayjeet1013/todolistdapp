import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers, Signer } from "ethers";

//internal import
import { toDoListAddress, toDoListABI } from "./constants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);

  const [allAddress, setAllAddress] = useState([]);

  //------Connecting Metamask

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return setError("Please install Metamask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
    } else {
      setError("Please Install Metamask & connect,reload");
    }
  };

  //...connect wallet

  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please install Metamask");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(account[0]);
  };

  //...intracting with smart contract

  const toDoList = async (message) => {
    try {
      //connecting with smart contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);
      const crateList = await contract.createList(message);
      crateList.wait();

      console.log(crateList);
    } catch (error) {
      setError("Something wrong in creating list");
    }
  };

  const getToDoList = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      //get data
      const getAllAddress = await contract.getAddress();
      setAllAddress(getAllAddress);

      console.log(getAllAddress);

      getAllAddress.map(async (eL) => {
        const getSingleData = await contract.getCreatorData(eL);
        allToDoList.push(getToDoList);
        console.log(getSingleData);
      });

      const allMessage = await contract.getMessage();
      setMyList(allMessage);
    } catch (error) {
      setError("something is went wrong");
    }
  };

  //change state of todolist from false to true
  const change = async (address) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const state = await contract.toggle(address);
      state.wait();
      console.log(state);
    } catch (error) {
      setError("something wrong changing state");
    }
  };

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnect,
        connectWallet,
        getToDoList,
        toDoList,
        change,
        currentAccount, 
        error,
        allToDoList,
        myList,
        allAddress,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};
