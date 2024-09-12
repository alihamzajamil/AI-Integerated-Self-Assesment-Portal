// LoginPage.tsx
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";



type Props = {};

export default function LoginPage({}: Props) {

  const { login, loginLoading, loginErrorMessage, loginSuccessMessage } = useUserStore();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    const credentials = {
      emailOrUsername: emailOrUsername,
      password: password,
    }
  
      await login(credentials, router);
  
  };

  return (
    <section>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-8 min-w-[40%] min-h-[50%]">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <Button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </Button>
          {loginErrorMessage && (
            <p className="text-red-500 text-center mb-4">{loginErrorMessage}</p>
          )}
          {loginSuccessMessage && (
            <p className="text-green-500 text-center mb-4">{loginSuccessMessage}</p>
          )}
          <p className="text-center mb-4">or</p>
          <div>
            <p className="text-center mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-500 hover:text-blue-600"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
