"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.target, "ESTO ES E");

    try {
      const formData = new FormData(e.currentTarget);

      const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      };

      const res = await signIn("credentials", loginData);

      if (res?.error) return setError(res.error as string);

      if (res?.ok) return router.push("dashboard");
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="justify-center h-[cal(100vh-4rem)] flex items-center">
      <form onSubmit={handleSubmit}>
        <h1> Log in</h1>
        <input
          type="email"
          placeholder="email"
          name="email"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />

        <button className="bg-indigo-500 px-4 py-2">LogIn</button>
      </form>

      {error && <div className="bg-red-500 text-white p-2 m-2"> {error}</div>}
    </div>
  );
};

export default LogIn;
