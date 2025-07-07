"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn, useSession } from "next-auth/react"; // <- useSession here
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import Image from "next/image";

export default function SignInDialog({ openDialog, closeDialog }) {
  const { setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);
  const convex = useConvex();
  const { data: session } = useSession(); // <- Session from NextAuth

  // Google login logic
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse?.access_token}`,
            },
          }
        );

        const { name, email, picture } = userInfo.data;

        // Store new user in Convex
        await CreateUser({
          name,
          email,
          picture,
          uid: uuid4(),
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userInfo.data));
        }

        const result = await convex.query(api.users.GetUser, { email });
        setUserDetail(result);
        closeDialog(false);
      } catch (error) {
        console.error("Google sign-in failed:", error);
      }
    },
    onError: (err) => {
      console.error("Google OAuth error", err);
    },
  });

  // GitHub user handling logic (after redirect)
  useEffect(() => {
    const handleGitHubSession = async () => {
      if (!session?.user?.email) return;

      const email = session.user.email;
      const name = session.user.name || "No Name";
      const picture = session.user.image || "";

      // Save in Convex
      await CreateUser({
        name,
        email,
        picture,
        uid: uuid4(),
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(session.user));
      }

      const result = await convex.query(api.users.GetUser, { email });
      setUserDetail(result);
      closeDialog(false);
    };

    handleGitHubSession();
  }, [session]);

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="w-50 h-40 mx-auto">
            <img src="./volt_logo.webp" alt="Volt Logo" />
          </DialogTitle>
          <DialogDescription className="text-center text-[15px] font-medium m-8 mx-12">
            To use DD-Prompt you must log into an existing account or create one
            using one of the options below
          </DialogDescription>
          <DialogDescription className="flex flex-col gap-4">
            {/* Google Login */}
            <Button
              className="text-white bg-blue-500 hover:bg-blue-600 mx-10"
              size="lg"
              onClick={() => login()}
            >
              <Image
                src="/icons8-google.png"
                alt="google"
                width={25}
                height={25}
              />
              &nbsp; Sign in with Google
            </Button>

            {/* GitHub Login using NextAuth */}
            <Button
              className="text-white bg-gray-800 hover:bg-gray-900 mx-10"
              size="lg"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <Image
                src="/github-mark-white.png"
                alt="github"
                width={20}
                height={20}
              />
              &nbsp; Sign in with GitHub
            </Button>

            <Button variant="ghost" className="mx-10" size="lg" disabled>
              Sign In with Email and Password
            </Button>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="text-center text-[15px] font-medium my-8 mx-12">
          By using DD-Prompt, you agree to the collection of usage data for analytics.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
