"use client";

import Head from "next/head";
import Image from "next/image"; // Using Next/Image for optimized images
import { useState, FormEvent, ChangeEvent, useEffect } from "react";

// --- 1. Define Data Structures (Interfaces) ---
interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
}

interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  // replies: Post[]; // For a more advanced version
}

// --- 2. Mock Current User ---
const currentUser: User = {
  id: "user_current",
  name: "You",
  username: "currentuser",
  avatarUrl: "https://i.pravatar.cc/40?u=currentuser", // Placeholder avatar
};

// --- 3. Initial Mock Posts ---
const initialPosts: Post[] = [
  {
    id: "post_1",
    author: {
      id: "user_1",
      name: "Alice Wonderland",
      username: "alicew",
      avatarUrl: "https://i.pravatar.cc/40?u=alicew",
    },
    content: "Just had a lovely tea party! ☕️ #wonderland #teatime",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 15,
  },
  {
    id: "post_2",
    author: {
      id: "user_2",
      name: "Bob The Builder",
      username: "bobthebuilder",
      avatarUrl: "https://i.pravatar.cc/40?u=bobtheb",
    },
    content:
      "Can we fix it? Yes, we can! Started a new Next.js project today. #coding #nextjs",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 28,
  },
  {
    id: "post_3",
    author: {
      id: "user_3",
      name: "Charlie Chaplin",
      username: "charliec",
      avatarUrl: "https://i.pravatar.cc/40?u=charliec",
    },
    content: "A day without laughter is a day wasted. 😄",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    likes: 102,
  },
];

// --- 4. Helper Function for Time Formatting ---
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

// --- 5. Main Page Component ---
const MiniThreadsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate fetching initial posts
  useEffect(() => {
    // In a real app, you might fetch this from an API
    // For now, sort by timestamp descending
    const sortedInitialPosts = [...initialPosts].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    );
    setPosts(sortedInitialPosts);
    setIsLoading(false);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostContent(event.target.value);
  };

  const handleSubmitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPostContent.trim()) return; // Don't post empty content

    const newPost: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Simple unique ID
      author: currentUser,
      content: newPostContent.trim(),
      timestamp: new Date(),
      likes: 0,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the top
    setNewPostContent(""); // Clear input
  };

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  return (
    <>
      <Head>
        <title>Mini Threads</title>
        <meta name="description" content="A mini threads clone" />
        <link rel="icon" href="/favicon.ico" />{" "}
        {/* Make sure you have a favicon.ico in public/ */}
      </Head>

      <div className="container">
        <header className="header">
          <h1>Mini Threads</h1>
        </header>

        <main className="main-content">
          {/* --- Post Input Form --- */}
          <div className="post-form-container">
            <div className="post-form-author">
              <Image
                src={currentUser.avatarUrl}
                alt={`${currentUser.name}'s avatar`}
                width={40}
                height={40}
                className="avatar"
              />
            </div>
            <form onSubmit={handleSubmitPost} className="post-form">
              <textarea
                value={newPostContent}
                onChange={handleInputChange}
                placeholder="Start a new thread..."
                rows={3}
              />
              <button type="submit" disabled={!newPostContent.trim()}>
                Post
              </button>
            </form>
          </div>

          {/* --- Feed Separator --- */}
          <hr className="feed-separator" />

          {/* --- Posts Feed --- */}
          <div className="feed">
            {isLoading ? (
              <p>Loading threads...</p>
            ) : posts.length === 0 ? (
              <p>No threads yet. Start one!</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-author-avatar">
                    <Image
                      src={post.author.avatarUrl}
                      alt={`${post.author.name}'s avatar`}
                      width={40}
                      height={40}
                      className="avatar"
                    />
                  </div>
                  <div className="post-content-area">
                    <div className="post-header">
                      <span className="post-author-name">
                        {post.author.name}
                      </span>
                      <span className="post-author-username">
                        @{post.author.username}
                      </span>
                      <span className="post-timestamp">
                        · {formatTimeAgo(post.timestamp)}
                      </span>
                    </div>
                    <p className="post-text">{post.content}</p>
                    <div className="post-actions">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="action-button like-button"
                      >
                        ❤️ {post.likes > 0 ? post.likes : ""}
                      </button>
                      {/* Add more actions here like reply, share */}
                      <button className="action-button">💬</button>
                      <button className="action-button">🔁</button>
                      <button className="action-button">🔗</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* --- 6. Styles (using <style jsx>) --- */}
      <style jsx global>{`
        body {
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
          background-color: #f0f2f5; /* Light gray background, similar to some social apps */
          color: #1c1e21; /* Dark gray text */
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          min-height: 100vh;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
        .header {
          padding: 1rem;
          border-bottom: 1px solid #ddd;
          text-align: center;
          background-color: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .header h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        .main-content {
          padding: 0;
        }

        /* Post Input Form */
        .post-form-container {
          display: flex;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }
        .post-form-author {
          margin-right: 0.75rem;
        }
        .avatar {
          border-radius: 50%;
          object-fit: cover; /* Ensure image covers the area without distortion */
        }
        .post-form {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .post-form textarea {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          resize: vertical; /* Allow vertical resizing */
          min-height: 60px;
        }
        .post-form textarea:focus {
          outline: none;
          border-color: #007bff; /* Highlight on focus */
        }
        .post-form button {
          align-self: flex-end;
          padding: 0.5rem 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        }
        .post-form button:hover:not(:disabled) {
          background-color: #0056b3;
        }
        .post-form button:disabled {
          background-color: #a0cfff;
          cursor: not-allowed;
        }

        .feed-separator {
          border: none;
          border-top: 8px solid #f0f2f5; /* Thicker separator */
          margin: 0;
        }

        /* Feed and Posts */
        .feed {
          display: flex;
          flex-direction: column;
        }
        .post-card {
          display: flex;
          padding: 1rem;
          border-bottom: 1px solid #eee;
          transition: background-color 0.2s ease;
        }
        .post-card:hover {
          background-color: #f9f9f9;
        }
        .post-author-avatar {
          margin-right: 0.75rem;
          flex-shrink: 0; /* Prevent avatar from shrinking */
        }
        .post-content-area {
          flex-grow: 1;
        }
        .post-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
          flex-wrap: wrap; /* Allow wrapping for smaller screens */
        }
        .post-author-name {
          font-weight: bold;
          margin-right: 0.3rem;
        }
        .post-author-username {
          color: #555;
          margin-right: 0.3rem;
        }
        .post-timestamp {
          color: #777;
          font-size: 0.8rem;
        }
        .post-text {
          margin: 0.5rem 0;
          font-size: 0.95rem;
          line-height: 1.4;
          white-space: pre-wrap; /* Preserve line breaks and spaces */
          word-break: break-word; /* Prevent long words from breaking layout */
        }
        .post-actions {
          display: flex;
          gap: 1rem; /* Spacing between buttons */
          margin-top: 0.75rem;
        }
        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          font-size: 1.1rem; /* Make icons a bit larger */
          color: #555;
          display: flex;
          align-items: center;
        }
        .action-button:hover {
          color: #007bff;
        }
        .like-button:hover {
          color: #e0245e; /* Twitter's heart color */
        }
      `}</style>
    </>
  );
};

export default MiniThreadsPage;
