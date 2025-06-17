"use client";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const threads = [
  {
    name: "hosean",
    username: "hosean",
    avatar: "https://i.pravatar.cc/100?u=hosean",
    content:
      "おはよう御座います♪\n今日は33℃まで上がる☀️予報ですね。\n腰痛いが頑張ります！\n本日も宜しくお願いします！\n#紫陽花",
    image:
      "https://images.unsplash.com/photo-1718880186680-d8fd7572f23e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
    time: "17h",
    likes: 61,
    comments: 10,
  },
  {
    name: "Bob The Builder",
    username: "bobthebuilder",
    avatar: "https://i.pravatar.cc/100?u=bob",
    content:
      "Can we fix it? Yes, we can! Started a new Next.js project today. #coding #nextjs",
    time: "30m",
    likes: 28,
    comments: 4,
  },
  {
    name: "Alice Wonderland",
    username: "alicew",
    avatar: "https://i.pravatar.cc/100?u=alice",
    content: "Just had a lovely tea party! 🍵 #wonderland #teatime",
    time: "2h",
    likes: 15,
    comments: 2,
  },
  {
    name: "Charlie Chaplin",
    username: "charliec",
    avatar: "https://i.pravatar.cc/100?u=charlie",
    content: "A day without laughter is a day wasted. 😁",
    time: "3d",
    likes: 102,
    comments: 10,
  },
];

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen flex justify-center px-4">
      <Toaster />
      <div className="w-full max-w-xl py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">Mini Threads</h1>

        {/* New Thread Input */}
        <div className="flex items-start gap-3 mb-6">
          <Image
            src="https://i.pravatar.cc/100?u=current"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full border border-neutral-700 shadow-sm cursor-pointer"
          />
          <div className="flex-1">
            <textarea
              rows={3}
              className="w-full p-3 bg-neutral-900 rounded-xl text-sm focus:outline-none placeholder:text-neutral-500 resize-none"
              placeholder="Start a new thread..."
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => toast("Post functionality not implemented")}
                className="bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm font-medium px-5 py-2 rounded-full"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Thread List */}
        {threads.map((thread, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 py-5 border-t border-neutral-800"
          >
            <Image
              src={thread.avatar}
              alt={`${thread.name} avatar`}
              width={40}
              height={40}
              className="rounded-full border border-neutral-700 shadow-sm cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{thread.name}</span>
                <span className="text-neutral-500">
                  @{thread.username} · {thread.time} ago
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm mt-1 leading-relaxed">
                {thread.content}
              </p>

              {/* Optional Image */}
              {thread.image && (
                <div className="mt-3 rounded-xl overflow-hidden border border-neutral-800">
                  <Image
                    src={thread.image}
                    alt="Thread media"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-6 mt-3 text-sm text-neutral-400">
                <button
                  onClick={() => toast("Like clicked")}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  ❤️ {thread.likes}
                </button>
                <button
                  onClick={() => toast("Comment clicked")}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  💬 {thread.comments}
                </button>
                <button
                  onClick={() => toast("Share not implemented")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  🔁
                </button>
                <button
                  onClick={() => toast("Link not implemented")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  🔗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
