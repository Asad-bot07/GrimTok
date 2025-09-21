import { createContext } from "react";
import type { UserData } from "../Components/Types";

export type UserContextType = {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
