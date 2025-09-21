import React, { useState } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import type { UserData } from "../Components/Types";

type Props = { children: React.ReactNode };

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<UserData>({
    name: "",
    age: 0,
    date: "",
    gender: "",
  });

  const value: UserContextType = { data, setData };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
