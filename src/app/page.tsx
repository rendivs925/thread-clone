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
      toast(`${label} not implemented yet`);
    }}
    className={clsx(
      "flex flex-col items-center transition-colors text-xs cursor-pointer",
      active ? "text-black" : "text-neutral-500 hover:text-black",
    )}
  >
    <Image src={icon} alt={label} width={20} height={20} />
    <span className="text-[10px] mt-1">{label}</span>
  </button>
);

const threads = [
  {
    user: {
      name: "josuaiwanwahyudi",
      avatar: "https://i.pravatar.cc/40?img=1",
      time: "10h",
    },
    content: `Confident atau confidence itu, dari bahasa latin con + fidere\n\nCon artinya "bersama" atau "dengan"\nFidere artinya "mempercayai", dimana fidere juga adalah akar utk kata "fidelity" yang artinya "kesetiaan"\n\nFidere mengandung nuansa setia dan percaya: faith(ful)\n\nSehingga arti keseluruhannya confidere adalah "dengan percaya"\n\nPertanyaannya: percaya sama siapa? Bukan sama diri sendiri, tapi kepada Tuhan (faithful)\n\nMaka, confident itu bukan soal percaya diri. Tapi soal percaya Tuhan yang setia 💪`,
    likes: 30,
    replies: 1,
    shares: 1,
  },
  {
    user: {
      name: "js_khairen",
      avatar: "https://i.pravatar.cc/40?img=2",
      time: "10h",
    },
    content:
      "Dunia sudah mau kiamat. Hubungan kalian dari 10 tahun lalu, masih sebatas foto bareng yang kau andai-andaikan kala malam. Hidup gini amat bro?",
    likes: 21,
    replies: 1,
    shares: 1,
  },
  {
    user: {
      name: "tribunkaltim",
      avatar: "https://i.pravatar.cc/40?img=3",
      time: "7h",
    },
    content:
      "Akhirnya Presiden Prabowo Subianto memutuskan 4 pulau yang sempat menjadi sengketa tetap milik Aceh.",
    link: "https://kaltim.tribunnews.com/2025/keputusan-prabowo",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Prabowo_Subianto_2023.jpg/640px-Prabowo_Subianto_2023.jpg",
    likes: 0,
    replies: 0,
    shares: 0,
  },
];

export default function ThreadsClone() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex min-h-screen text-black bg-white">
      <Toaster />

      {/* Sidebar */}
      <aside className="hidden sm:flex flex-col justify-between items-center w-16 py-6 fixed h-screen border-r border-neutral-200">
        <div className="flex flex-col items-center gap-6">
          <Image src="/threads-icon.svg" alt="Threads" width={28} height={28} />
          {["Home", "Search", "Post", "Likes", "Profile"].map((label) => (
            <SidebarIcon
              key={label}
              icon={`/icons/${label.toLowerCase()}.png`}
              label={label}
              active={activeTab === label}
              onClick={() => setActiveTab(label)}
            />
          ))}
        </div>
        <SidebarIcon icon="/icons/menu.png" label="Menu" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:ml-16 px-4 sm:px-8 pb-20 pt-6 flex justify-center bg-white">
        <div className="w-full max-w-2xl flex flex-col">
          <h1 className="text-xl font-bold text-center mb-6">Home</h1>
          <div className="space-y-5">
            {threads.map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 bg-white shadow-sm"
              >
                <Image
                  src={t.user.avatar}
                  alt={t.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex gap-2 items-center text-sm font-semibold">
                    {t.user.name}
                    <span className="text-neutral-500 font-normal">
                      · {t.user.time}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-[15px] text-neutral-800 mt-1 leading-relaxed">
                    {t.content}
                  </p>
                  {t.link && (
                    <a
                      href={t.link}
                      className="text-blue-600 text-sm mt-2 underline underline-offset-2 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.link}
                    </a>
                  )}
                  {t.image && (
                    <div className="rounded-xl overflow-hidden mt-3 border border-neutral-200">
                      <Image
                        src={t.image}
                        alt="thread-image"
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-6 mt-4 text-sm text-neutral-600">
                    <span className="cursor-pointer">❤️ {t.likes}</span>
                    <span className="cursor-pointer">💬 {t.replies}</span>
                    <span className="cursor-pointer">🔁 {t.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestion Sidebar */}
        <div className="hidden lg:block ml-8 w-80 mt-[52px] bg-neutral-100 border border-neutral-300 rounded-xl p-6 shadow-md self-start">
          <h2 className="text-lg font-bold mb-2 text-black">
            Log in or sign up for Threads
          </h2>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
            See what people are talking about and join the conversation.
          </p>
          <button
            onClick={() => toast("Instagram login not implemented yet")}
            className="w-full flex items-center justify-center gap-3 bg-white border border-neutral-300 rounded-xl py-3 hover:bg-neutral-50 transition"
          >
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={20}
              height={20}
            />
            <span className="font-semibold text-black">
              Continue with Instagram
            </span>
          </button>
          <p className="text-center text-sm text-neutral-500 mt-4">
            Log in with username instead
          </p>
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="fixed bottom-0 w-full sm:hidden bg-white border-t border-neutral-200 flex justify-around py-2 z-10">
        {["Home", "Search", "Post", "Likes", "Profile"].map((label) => (
          <SidebarIcon
            key={label}
            icon={`/icons/${label.toLowerCase()}.png`}
            label={label}
            active={activeTab === label}
            onClick={() => setActiveTab(label)}
          />
        ))}
      </div>
    </div>
  );
}
