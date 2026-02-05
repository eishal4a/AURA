import Navbar from "../components/Navbar";

const Notifications = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center pt-28 pb-10">
        <div className="w-full max-w-3xl glass p-6 space-y-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="p-4 border-b border-white/10 text-white/70">
              Someone liked your post
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
