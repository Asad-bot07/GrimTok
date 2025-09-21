import { createContext, useState, type ReactNode } from "react";
import type { UserData } from "../Components/Types";

type UserContextType = {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type props = { children: ReactNode };

export const UserContextProvider: React.FC<props> = ({ children }) => {
  const [data, setData] = useState<UserData>({
    name: "",
    age: 0,
    date: "",
    gender: "",
  });

  return(
    <UserContext.Provider value={{data, setData}}>
        {children}
    </UserContext.Provider>
  )

};
