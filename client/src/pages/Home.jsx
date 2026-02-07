import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);
const { user } = useAuth();
const [openComments, setOpenComments] = useState(null);

  const fetchPosts = () => {
    API.get("/posts")
     .then(res => setPosts(res.data.posts || res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);
const handleDelete = async (postId) => {
  try {
    await API.delete(`/posts/${postId}`);
    fetchPosts(); // refresh feed
  } catch (err) {
    console.log(err);
  }
};
const handleLike = async (postId) => {
  try {
    await API.put(`/posts/like/${postId}`);
    fetchPosts();
  } catch (err) {
    console.log(err);
  }
};

 const handlePost = async () => {
  if (!caption && !image) return;

const tempPost = {
  _id: Date.now(),
  caption,
  image: image ? URL.createObjectURL(image) : null,
  likes: [],
  comments: [],
  username: user?.fullName || "You",
  userProfilePicture: user?.profilePicture || "https://via.placeholder.com/40"
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
  src={user?.profilePicture || "https://via.placeholder.com/40"}
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
          (Array.isArray(posts) ? posts : []).map(post => (
              <div key={post._id} className="glass p-6">
                <div className="flex items-center gap-3 mb-3">
                 <img src={post.userProfilePicture} />
<h3>{post.username}</h3>

                </div>

                <p className="mb-4">{post.caption}</p>

                {post.image && (
                  <img
                    src={post.image}
                    className="rounded-xl mb-4"
                  />
                )}

                <div className="text-white/50 flex gap-4">
  <button onClick={() => handleLike(post._id)}>
   ❤️ {post.likes?.length || 0}

  </button>

  <button
  onClick={() =>
    setOpenComments(openComments === post._id ? null : post._id)
  }
>
 
💬 {post.comments?.length || 0}


</button>


</div>

                <button
  onClick={() => handleDelete(post._id)}
  className="text-red-500 mt-2"
>
  Delete
</button>
<div className="space-y-2 max-h-40 overflow-y-auto">
  {post.comments.map((c) => (
    <div key={c._id} className="flex items-center justify-between text-sm text-white/80">

      <div className="flex items-center gap-2">
        <img
          src={c.userProfilePicture || "https://via.placeholder.com/30"}
          className="w-6 h-6 rounded-full"
        />
        <span className="font-semibold">{c.username}</span>
        <span>{c.text}</span>
      </div>

      <button
        className="text-red-400 text-xs"
        onClick={async () => {
          try {
            await API.delete(`/posts/comment/${post._id}/${c._id}`);
            fetchPosts();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Delete
      </button>

    </div>
  ))}
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
