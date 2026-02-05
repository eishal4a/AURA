import Navbar from "../components/Navbar";

const Messages = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center pt-28 pb-10">
        <div className="w-full max-w-5xl glass p-6 flex gap-6">
          <div className="w-1/3 border-r border-white/10 pr-4">
            {[1,2,3].map(i => (
              <div key={i} className="mb-4 text-white/70">User {i}</div>
            ))}
          </div>
          <div className="flex-1 text-white/40">
            Select a conversation
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
