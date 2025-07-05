"use client";

import Image from "next/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";

const SidebarIcon = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={() => {
      onClick?.();
      toast(`${label} is not implemented yet!!!`);
    }}
    className={clsx(
      "group flex flex-col items-center text-xs p-2 rounded-xl transition-all cursor-pointer",
      active
        ? "bg-neutral-200 text-black font-semibold"
        : "text-neutral-500 hover:text-black hover:bg-neutral-100",
    )}
  >
    <Image
      src={icon}
      alt={label}
      width={24}
      height={24}
      className="transition-transform duration-150 group-hover:scale-110"
    />
    <span className="text-[10px] mt-1">{label}</span>
  </button>
);

const threads = [
  {
    user: {
      name: "elisabeth.journals",
      avatar: "https://i.pravatar.cc/40?img=12",
      time: "3h",
    },
    content: `My therapist said: “You don’t need to feel guilty for resting. You're not a machine.”\n\nThat hit hard.\n\nProductivity is not a measure of your worth.`,
    likes: 128,
    replies: 14,
    shares: 9,
    sends: 5,
  },
  {
    user: {
      name: "visualsbyadam",
      avatar: "https://i.pravatar.cc/40?img=18",
      time: "6h",
    },
    content: "Golden hour in the Dolomites never disappoints 🌄",
    image:
      "https://images.unsplash.com/photo-1601758064225-6e9f3dd69f67?auto=format&fit=crop&w=1000&q=80",
    likes: 221,
    replies: 16,
    shares: 18,
    sends: 7,
  },
  {
    user: {
      name: "devsarcastic",
      avatar: "https://i.pravatar.cc/40?img=31",
      time: "1d",
    },
    content: `me: i need to focus more\nalso me: restructured my Notion dashboard for 3 hours straight\n\n#buildinpublic #devlife`,
    likes: 87,
    replies: 6,
    shares: 4,
    sends: 2,
  },
  {
    user: {
      name: "lebanon.travel",
      avatar: "https://i.pravatar.cc/40?img=26",
      time: "22h",
    },
    content:
      "Explore the colors of Beirut 🇱🇧✨ A city of contrasts, chaos, and beauty.",
    image:
      "https://images.unsplash.com/photo-1596464716121-1c7b1a09f8e1?auto=format&fit=crop&w=1000&q=80",
    likes: 109,
    replies: 8,
    shares: 6,
    sends: 3,
  },
  {
    user: {
      name: "startuplogic",
      avatar: "https://i.pravatar.cc/40?img=40",
      time: "4h",
    },
    content: `Hot take: Most “overnight success” stories are 5 years of failing quietly and then 1 viral moment. Stay consistent.`,
    likes: 172,
    replies: 20,
    shares: 10,
    sends: 6,
  },
];

export default function ThreadsClone() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Toaster />

      {/* Sidebar */}
      <aside className="hidden sm:flex flex-col justify-center items-center w-16 py-6 fixed h-full border-r border-neutral-200">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/images/instagram.png"
            alt="Threads"
            width={28}
            height={28}
          />
          {["Home", "Search", "Post", "Likes", "Profile"].map((label) => (
            <SidebarIcon
              key={label}
              icon={`/images/${label.toLowerCase()}.png`}
              label={label}
              active={activeTab === label}
              onClick={() => setActiveTab(label)}
            />
          ))}
        </div>
        <SidebarIcon icon="/images/menu.png" label="Menu" />
      </aside>

      {/* Main Content */}

      <main className="flex-1 sm:ml-16 px-4 sm:px-8 py-6 flex justify-center items-start bg-white">
        <div className="w-full max-w-2xl flex flex-col">
          <h1 className="text-base text-center font-semibold mb-4 px-1">
            Home Section
          </h1>
          <div className="space-y-5">
            {threads.map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-neutral-200 bg-white shadow-sm"
              >
                <Image
                  src={t.user.avatar}
                  alt={t.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {t.user.name}
                    <span className="text-neutral-500 font-normal">
                      · {t.user.time}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-[15px] text-neutral-800 mt-1 leading-relaxed">
                    {t.content}
                  </p>
                  {t.image && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200">
                      <Image
                        src={t.image}
                        alt="thread image"
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-6 mt-4 text-sm text-neutral-600">
                    <span className="cursor-pointer flex items-center gap-1">
                      <Image
                        src="/images/heart.png"
                        alt="Like"
                        width={16}
                        height={16}
                      />
                      {t.likes}
                    </span>
                    <span className="cursor-pointer flex items-center gap-1">
                      <Image
                        src="/images/chat.png"
                        alt="Reply"
                        width={16}
                        height={16}
                      />
                      {t.replies}
                    </span>
                    <span className="cursor-pointer flex items-center gap-1">
                      <Image
                        src="/images/repost.png"
                        alt="Repost"
                        width={16}
                        height={16}
                      />
                      {t.shares}
                    </span>
                    <span className="cursor-pointer flex items-center gap-1">
                      <Image
                        src="/images/send.png"
                        alt="Send"
                        width={16}
                        height={16}
                      />
                      {t.sends}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Login Card */}
        <div className="hidden lg:block ml-8 w-80 self-start">
          <div className="rounded-2xl border border-neutral-300 bg-neutral-100 p-6 shadow-md">
            <h2 className="text-lg font-bold mb-2">
              Log in or sign up for Threads
            </h2>
            <p className="text-sm text-neutral-600 mb-4">
              SEE WHAT PEOPLE ARE TALKING ABOUT AND JOIN THE CONVERSATION.
            </p>
            <button
              onClick={() => toast("Instagram login not implemented")}
              className="w-full flex items-center gap-3 justify-center border border-neutral-300 bg-white rounded-xl py-3 hover:bg-neutral-50 transition cursor-pointer"
            >
              <Image
                src="/images/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
              />
              <span className="font-semibold">Continue with Instagram</span>
            </button>
            <p className="text-center text-sm text-neutral-500 mt-4 cursor-pointer">
              Log in with username instead
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 w-full sm:hidden bg-white border-t border-neutral-200 flex justify-around py-2 z-10">
        {["Home Page", "Search", "Post", "Likes", "Profile"].map((label) => (
          <SidebarIcon
            key={label}
            icon={`/images/${label.toLowerCase()}.png`}
            label={label}
            active={activeTab === label}
            onClick={() => setActiveTab(label)}
          />
        ))}
      </div>
    </div>
  );
}
