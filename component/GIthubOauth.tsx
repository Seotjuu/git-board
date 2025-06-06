"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { BiLogoGithub } from "react-icons/bi";

const GithubOauth = () => {
    return (
        <button className={"bg-[#24292e] text-white rounded-xl flex items-center justify-between gap-5 p-2 ring-3 shadow-xl hover:brightness-90 hover:ring-gray-500"}
            onClick={() => signIn("github", {
                callbackUrl: "/dashboard",
            })}
        >
            <BiLogoGithub size={30} />
            Login with GitHub
        </button>
    );
};

export default GithubOauth;
