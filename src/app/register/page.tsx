"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const userBody = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
      };

      const signupResponse = await axios.post("/api/auth/signup", userBody);
      console.log(signupResponse, "ESTO ES SINGUPRESPONSE");

      const loginData = {
        email: signupResponse.data.user.email,
        password: formData.get("password"),
        redirect: false,
      };
      const res = await signIn("credentials", loginData);
      if (res?.ok) return router.push("dashboard");
      console.log(loginData, "ESTO ES RES");
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> Sign up</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />

        <button className="bg-indigo-500 px-4 py-2">Register</button>
      </form>

      {error && <div className="bg-red-500 text-white p-2 m-2"> {error}</div>}
    </div>
  );
};

export default Register;
