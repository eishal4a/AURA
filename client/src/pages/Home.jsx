import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);

  const fetchPosts = () => {
    API.get("/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

 const handlePost = async () => {
  if (!caption && !image) return;

  const tempPost = {
    _id: Date.now(),
    caption,
    image: image ? URL.createObjectURL(image) : null,
    likes: [],
    comments: [],
    user: {
      username: "You",
      profilePicture: "https://i.pravatar.cc/40"
    }
  };

  // 🔥 Instantly show post on top
  setPosts(prev => [tempPost, ...prev]);

  const formData = new FormData();
  formData.append("caption", caption);
  if (image) formData.append("image", image);

  setCaption("");
  setImage(null);

  try {
    await API.post("/posts", formData);
    // Optional: re-sync with server later
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <Navbar />

      <div className="w-full flex justify-center pt-28 pb-10">
        <div className="w-full max-w-2xl space-y-8 px-6">

          {/* CREATE POST */}
          <div className="glass p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/40"
                className="w-10 h-10 rounded-full"
              />

              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What’s on your aura today?"
                className="input-field flex-1"
              />
            </div>


            <div className="flex items-center justify-between">
              <label className="text-pink-500 cursor-pointer">
                📷 Add Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              <button
                onClick={handlePost}
                className="btn-primary px-6 py-2"
              >
                Post
              </button>
            </div>
          </div>

          {/* POSTS OR EMPTY STATE */}
          {posts.length === 0 ? (
            <div className="glass p-10 text-center text-white/40">
              No posts yet. Be the first to post on AURA ✨
            </div>
          ) : (
            posts.map(post => (
              <div key={post._id} className="glass p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.user.profilePicture}
                    className="w-10 h-10 rounded-full"
                  />
                  <h3>{post.user.username}</h3>
                </div>

                <p className="mb-4">{post.caption}</p>

                {post.image && (
                  <img
                    src={post.image}
                    className="rounded-xl mb-4"
                  />
                )}

                <div className="text-white/50">
                  ❤️ {post.likes.length}  💬 {post.comments.length}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
