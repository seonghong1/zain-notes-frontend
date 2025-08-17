import { useAtom } from "jotai";
import { User, userAtom } from "@/atoms/userAtom";
import { getData } from "@/lib/api/httpClient";
import { useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const fetchUser = async () => {
    if (user) return;
    const res = await getData<User>("/auth/me");
    setUser(res);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, setUser, fetchUser };
};
