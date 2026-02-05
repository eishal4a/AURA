import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateUserState } = useAuth();

  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ Load posts + set initial bio & image
  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setPreview(user.profilePicture || "");
    }

    API.get("/users/me").then((res) => {
      setPosts(res.data.posts);
    });
  }, [user]);

  // ✅ Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Save profile
const saveProfile = async () => {
  try {
    const formData = new FormData();
    formData.append("bio", bio);
    if (imageFile) formData.append("image", imageFile);

    const res = await API.put("/users/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // ✅ Update context user
    updateUserState(res.data);

    // ✅ Update preview & bio locally
    setPreview(res.data.profilePicture);
    setBio(res.data.bio || "");

    setEditing(false);
  } catch (err) {
    console.log(err);
  }
};

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div className="w-full flex justify-center pt-28 pb-10">
        <div className="w-full max-w-4xl px-6">

          {/* PROFILE HEADER */}
          <div className="glass p-8 text-center mb-10">
            <img
  src={
    preview && !preview.includes("undefined")
      ? preview
      : "https://via.placeholder.com/150"
  }
  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
/>

            {editing ? (
              <>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mb-3"
                />

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="input-field mb-3"
                  placeholder="Your bio"
                />

                <button onClick={saveProfile} className="btn-primary">
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-white/40">{user.bio}</p>

                <button
                  onClick={() => setEditing(true)}
                  className="text-pink-500 mt-4"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>

          {/* USER POSTS */}
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <img
                key={post._id}
                src={post.image}
                className="rounded-xl object-cover w-full h-48"
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
