"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    id && GetWorkspaceData();
  }, []);

  const GetWorkspaceData = async () => {
    const workspace = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(workspace.messages);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });

    let response;
    try {
      response = result.data.result;
    } catch (error) {
      response = "something went wrong: " + error;
    }

    const aiResp = {
      role: "ai",
      content: response,
    };
    setMessages((prev) => [...prev, aiResp]);
    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });
    setLoading(false);
  };

  const onGenerate = async (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;

      const fileMessage = {
        role: "user",
        content: `📎 Uploaded file: **${file.name}**\n\n\`\`\`\n${content}\n\`\`\``,
      };

      setMessages((prev) => [...prev, fileMessage]);
    };

    reader.readAsText(file); // Can change to readAsDataURL for image files
  };

  return (
    <div className="relative h-[88vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll pl-5">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
              style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            >
              {message?.role === "user" &&
                (userDetail?.picture ? (
                  <Image
                    src={userDetail.picture}
                    alt="User"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[35px] h-[35px] bg-gray-400 rounded-full" />
                ))}
              <div className="flex flex-col">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

      {/* input section */}
      <div className="flex gap-2 items-end pl-5">
        {userDetail?.picture ? (
          <Image
            src={userDetail.picture}
            alt="user"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <div
            className="w-[30px] h-[30px] rounded-full bg-gray-400 cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
        <div className="p-5 border border-gray-800 rounded-xl max-w-xl w-full mt-3">
          <div className="flex gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
              />
            )}
          </div>
          <div className="mt-2">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".txt,.md,.json"
              />
              <Link className="text-blue-400 hover:text-blue-600" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
