"use client";
import { useState } from "react";
import { postData } from "@/lib/api/httpClient";

export default function SignUp() {
  const [userForm, setUserForm] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const validateForm = (): { status: boolean; message: string } => {
    // 이름 작성 검증
    if (userForm.nickname === "") {
      return { status: false, message: "닉네임을 입력해주세요." };
    }

    // 이메일 작성 검증
    if (userForm.email === "") {
      return { status: false, message: "이메일을 입력해주세요." };
    }

    // 비밀번호 작성 검증
    if (userForm.password === "") {
      return { status: false, message: "비밀번호를 입력해주세요." };
    }

    // 비밀번호 확인 및 일치 검증
    if (userForm.password !== userForm.confirmPassword || userForm.confirmPassword === "") {
      return { status: false, message: "비밀번호가 일치하지 않습니다." };
    }

    return { status: true, message: "" };
  };

  // 회원가입
  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, message } = validateForm();
    if (!status) {
      alert(message);
      return;
    }

    try {
      const response = await postData<
        { nickname: string; email: string; password: string },
        { token: string }
      >("/users/signup", userForm);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <form action="" className="flex flex-col gap-2" onSubmit={signup}>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          placeholder="닉네임"
          name="nickname"
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded-md p-2"
          type="email"
          placeholder="이메일"
          name="email"
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded-md p-2"
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 rounded-md p-2"
          type="password"
          placeholder="비밀번호 확인"
          name="confirmPassword"
          onChange={handleChange}
        />
        <button
          className="hover:bg-main-dark cursor-pointer bg-main text-white p-2 rounded-md"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
