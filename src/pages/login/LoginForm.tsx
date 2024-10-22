"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/constants/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate} from "react-router-dom";
export function LoginForm() {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShouldRedirect(true); }

    console.log("Page initiée!");
    return () => {
      console.log("Page quittée!");
    };
  }, []); 

  if (shouldRedirect) {
    return <Navigate to="*" />;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.email && input.password.length >= 6) {
      try {
        await login(input.email, input.password);
        navigate("/dashbord");
      } catch (err) {
        setError("Login failed. Please check your credentials.");
      }
    } else {
      setError("Please provide a valid email and a password with at least 6 characters.");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`Redirect to ${provider} OAuth login`);
    // Logique pour la redirection OAuth
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Foody
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            value={input.email}
            placeholder="projectmayhem@fc.com"
            aria-describedby="admin-email"
            aria-invalid={error ? "true" : "false"}
            onChange={handleInput}
            type="email"
          />
          <div id="admin-email" className="sr-only">
            Please enter a valid email address.
          </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            value={input.password}
            placeholder="••••••••"
            aria-describedby="admin-password"
            aria-invalid={error ? "true" : "false"}
            onChange={handleInput}
            type="password"
          />
          <div id="admin-password" className="sr-only">
            Your password should be at least 6 characters long.
          </div>
        </LabelInputContainer>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <OAuthButton provider="GitHub" onClick={() => handleOAuthLogin("GitHub")} />
          <OAuthButton provider="Google" onClick={() => handleOAuthLogin("Google")} />
          <OAuthButton provider="OnlyFans" onClick={() => handleOAuthLogin("OnlyFans")} />
        </div>
      </form>
    </div>
  );
}

const OAuthButton = ({
  provider,
  onClick,
}: {
  provider: string;
  onClick: () => void;
}) => {
  const icons: { [key: string]: React.ReactNode } = {
    GitHub: <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />,
    Google: <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />,
    OnlyFans: <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />,
  };

  return (
    <button
      className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900"
      type="button"
      onClick={onClick}
    >
      {icons[provider]}
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">{provider}</span>
      <BottomGradient />
    </button>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
