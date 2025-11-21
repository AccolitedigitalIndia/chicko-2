import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { storage } from "@/lib/storage";

const USER_STORAGE_KEY = "lumiere-user";

export interface User {
  name: string;
  email?: string;
  joinDate?: string;
}

interface UserContextType {
  user: User;
  updateUserName: (name: string) => void;
  updateUserEmail: (email: string) => void;
  isNewUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  name: "",
  joinDate: new Date().toISOString(),
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = storage.get<User | null>(USER_STORAGE_KEY, null);
    return savedUser || DEFAULT_USER;
  });

  const [isNewUser, setIsNewUser] = useState(() => {
    return !storage.get<User | null>(USER_STORAGE_KEY, null);
  });

  useEffect(() => {
    storage.set(USER_STORAGE_KEY, user);
  }, [user]);

  const updateUserName = (name: string) => {
    setUser((prev) => ({ ...prev, name }));
    setIsNewUser(false);
  };

  const updateUserEmail = (email: string) => {
    setUser((prev) => ({ ...prev, email }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUserName,
        updateUserEmail,
        isNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
