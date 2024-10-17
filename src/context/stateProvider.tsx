"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface StateContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  zoom: boolean;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;

  //chat
  idRoomChat:string;
  setIdRoomChat: React.Dispatch<React.SetStateAction<string>>;
  showSearchFriends:boolean;
  setShowSearchFriends: React.Dispatch<React.SetStateAction<boolean>>;
  showChatList:boolean;
  setShowChatList: React.Dispatch<React.SetStateAction<boolean>>;


}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("white");
  const [color, setColor] = useState<string>("black");
  const [zoom, setZoom] = useState<boolean>(false);



  //chat 
  const [idRoomChat, setIdRoomChat] = useState<string>("");
  const [showSearchFriends, setShowSearchFriends] = useState<boolean>(false);
  const [showChatList, setShowChatList] = useState<boolean>(true);

  const state: StateContextType = {
    theme,
    setTheme,
    zoom,
    setZoom,
    color,
    setColor,
    idRoomChat,
    setIdRoomChat,
    showSearchFriends,
    setShowSearchFriends,
    showChatList,
    setShowChatList,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateValue = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return context;
};
