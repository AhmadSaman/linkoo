import { ApiError, Provider, Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase from "../utils/supabase";

interface Props {
  children: ReactNode;
}
export interface Values {
  signUp: () => Promise<{
    user: User | null;
    session: Session | null;
    error: ApiError | null;
  }>;
  signIn: () => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider | undefined;
    url?: string | null | undefined;
    error: ApiError | null;
  }>;
  signOut: () => Promise<{
    error: ApiError | null;
  }>;
  user: User | null;
}

const AuthContext = createContext<Values | null>(null);

export const AuthProvider: ({ children }: Props) => JSX.Element = ({
  children,
}: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const values: Values = {
    signUp: () => supabase.auth.signUp({ provider: "google" }),
    signIn: () => supabase.auth.signIn({ provider: "google" }),
    signOut: () => supabase.auth.signOut(),
    user,
  };
  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth: () => Values | null = () => {
  return useContext(AuthContext);
};
