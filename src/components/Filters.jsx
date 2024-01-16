export default function Filters({ searchInput, fetchImages }) {
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <div className="flex flex-row flex-wrap justify-center items-center mt-5 gap-10 text-xl bg-black p-2 text-white cursor-pointer font-serif">
      <div
        onClick={() => handleSelection("laptops")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Laptops
      </div>

      <div
        onClick={() => handleSelection("storms")}
        className="hover:bg-pink-600 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Storms
      </div>
      <div
        onClick={() => handleSelection("Nature")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Nature
      </div>

      <div
        onClick={() => handleSelection("Space")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Space
      </div>
      <div
        onClick={() => handleSelection("dogs")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Dogs
      </div>
      <div
        onClick={() => handleSelection("shoes")}
        className="hover:bg-pink-700 transition-colors duration-300 px-2 py-1 rounded-full"
      >
        Shoes
      </div>
    </div>
  );
}
