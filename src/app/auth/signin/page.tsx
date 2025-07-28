"use client";
import { postData } from "@/lib/api/httpClient";
import { AxiosError } from "axios";
import { useState } from "react";

export default function Home() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // 로그인 검증
  const validateForm = (): { status: boolean; message: string } => {
    if (userForm.email === "") {
      return { status: false, message: "이메일을 입력해주세요." };
    }
    if (userForm.password === "") {
      return { status: false, message: "비밀번호를 입력해주세요." };
    }
    return { status: true, message: "" };
  };
  // 로그인
  const signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, message } = validateForm();
    if (!status) {
      alert(message);
      return;
    }
    console.log(userForm);
    try {
      const response = await postData<{ email: string; password: string }, { token: string }>(
        "/auth/login",
        userForm
      );
      console.log(response);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        alert((axiosError.response?.data as { message: string }).message);
      } else {
        alert("로그인 실패");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action="" className="flex flex-col gap-2" onSubmit={signin}>
        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
