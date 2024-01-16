export default function Filters({ searchInput, fetchImages }) {
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <div className="flex flex-row flex-wrap justify-center items-center mt-5 gap-10 text-xl bg-black p-2 text-white cursor-pointer font-serif">
      <div
        onClick={() => handleSelection("programming")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Programming
      </div>

      <div
        onClick={() => handleSelection("robots")}
        className="hover:bg-pink-600 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Robots
      </div>
      <div
        onClick={() => handleSelection("storms")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Storms
      </div>

      <div
        onClick={() => handleSelection("Space")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Space
      </div>
      <div
        onClick={() => handleSelection("ai")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        AI
      </div>
      <div
        onClick={() => handleSelection("nature")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Nature
      </div>
    </div>
  );
}
