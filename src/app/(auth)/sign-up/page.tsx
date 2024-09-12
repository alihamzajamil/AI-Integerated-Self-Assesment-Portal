'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";

import Link from "next/link";
import { useRouter } from "next/navigation";


type Props = {};


export default function SignupPage({}: Props) {
  const {
    fullName,
    setFullName,
    userName,
    setUserName,
    email,
    setEmail,
    educationLevel,
    setEducationLevel,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    registerLoading,
    registerErrorMessage,
    registerSuccessMessage,
    register,
  } = useUserStore();
  const router = useRouter();

  const handleRegister = async () => {
    const formData = {
      fullName: fullName,
      userName: userName,
      email: email,
      educationLevel: educationLevel,
      password: password,
      confirmPassword: confirmPassword,
    }
      await register(formData, router);
  
  };

  return (
    <section>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-8 min-w-[40%] min-h-[50%]">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Education Level"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
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
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <Button
            onClick={handleRegister}
            disabled={registerLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
          >
            {registerLoading ? "Registering..." : "Register"}
          </Button>
          {registerErrorMessage && (
            <p className="text-red-500 text-center mb-4">{registerErrorMessage}</p>
          )}
          {registerSuccessMessage && (
            <p className="text-green-500 text-center mb-4">{registerSuccessMessage}</p>
          )}
          <p className="text-center mb-4">or</p>
          <div>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
