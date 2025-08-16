import { atom } from "jotai";

export interface User {
  email: string;
  nickname: string;
}

export const userAtom = atom<User | null>(null);
