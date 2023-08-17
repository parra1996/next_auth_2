"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  console.log(session, status);
  return (
    <div className="">
      <h1> Dashboard </h1>
    </div>
  );
}
