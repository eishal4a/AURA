import Navbar from "../components/Navbar";

const Explore = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center pt-28 pb-10">
        <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="glass h-60 rounded-2xl flex items-center justify-center text-white/40"
            >
              Post {i + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
