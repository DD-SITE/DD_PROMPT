import { HelpCircle, LogOut, Wallet } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";

function SideBarFooter() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const SignOut = () => {
    setUserDetail(undefined);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  const options = [
    {
      name: "Feedback",
      icon: Wallet,
      link: "https://divyamdixit.vercel.app/", 
    },
    { name: "DD-Frame", icon: HelpCircle, link: "https://dd-frame.vercel.app/" },
    {
      name: "Logout",
      icon: LogOut,
      fun: SignOut,
    },
  ];

  return (
    <div className="ml-2 mb-3 w-full flex flex-col">
      {options.map((option, index) => (
        <Button
          key={index}
          className="w-full justify-start flex gap-2 bg-black text-white hover:bg-gray-800"
          onClick={() => {
            if (option.link) {
              window.open(option.link, "_blank"); 
            } else if (option.fun) {
              option.fun();
            }
          }}
        >
          <option.icon size={18} />
          <p className="text-sm">{option.name}</p>
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
