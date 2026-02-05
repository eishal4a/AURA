import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    API.get("/users/me").then(res => {
      setUser(res.data);
      setBio(res.data.bio || "");
      setProfilePicture(res.data.profilePicture || "");
    });
  }, []);

  const saveProfile = async () => {
  try {
    const formData = new FormData();
    formData.append("bio", bio);

    if (profilePicture) {
      formData.append("image", profilePicture);
    }

    const res = await API.put("/users/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUser(res.data);
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
              src={profilePicture}
              className="w-28 h-28 rounded-full mx-auto mb-4"
            />

            {editing ? (
              <>
              <input
  type="file"
  onChange={(e) => setProfilePicture(e.target.files[0])}
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
            {user.posts.map((post) => (
              <img
                key={post._id}
                src={post.image}
                className="rounded-xl"
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
