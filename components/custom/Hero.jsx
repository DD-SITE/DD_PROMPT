"use client";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

function Hero() {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const fileInputRef = useRef(null); // hidden file input

  useEffect(() => {
    const user = localStorage.getItem("userDetail");
    if (user) {
      setUserDetail(JSON.parse(user));
    }
  }, []);

  const onGenerate = async (userInput) => {
    if (!userDetail) {
      setOpenDialog(true);
      return;
    }
    const msg = { role: "user", content: userInput };
    setMessages(msg);

    try {
      const workspaceId = await CreateWorkspace({
        user: userDetail._id,
        messages: [msg],
      });
      router.push(`/workspace/${workspaceId}`);
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      alert("Only .txt files are supported.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      setUserInput(file.name + "\n\n" + fileContent);
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-42 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

      <div className="p-5 border border-gray-800 rounded-xl max-w-xl w-full mt-3">
        <div className="flex gap-2">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            value={userInput}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>

        {/* Attachment icon with tooltip */}
        <div
          className="upload-wrapper"
          onMouseEnter={() => {
            const tooltip = document.getElementById("tooltip");
            if (tooltip) tooltip.style.display = "block";
          }}
          onMouseLeave={() => {
            const tooltip = document.getElementById("tooltip");
            if (tooltip) tooltip.style.display = "none";
          }}
          style={{ position: "relative", display: "inline-block", marginTop: "10px" }}
        >
          <Link
            className="cursor-pointer"
            onClick={triggerFileInput}
          />
          <span
            id="tooltip"
            style={{
              display: "none",
              position: "absolute",
              bottom: "125%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#000",
              color: "#fff",
              padding: "5px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              whiteSpace: "nowrap",
              zIndex: 999,
            }}
          >
            Upload .txt file only
          </span>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap max-w-2xl justify-center items-center gap-3">
        {Lookup.SUGGSTIONS.map((sugg, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(sugg)}
            className="p-2 border border-gray-700 hover:border-gray-100 rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
          >
            {sugg}
          </h2>
        ))}
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;
