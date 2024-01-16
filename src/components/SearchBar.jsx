import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect, useRef, useState, useCallback } from "react";
import Filters from "./Filters";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

export default function SearchBar() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        console.log("data", data);
        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
        // console.log(page); //trying to console log the page number
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  //reset search
  const resetSearch = () => {
    setPage(1); //in progress
    fetchImages();
  };

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };

  //back to start search
  const startSearching = () => {
    resetSearch();
  };

  return (
    <div className="mt-8 flex flex-col">
      <a href="/" onClick={startSearching}>
        <h1 className="mb-10 text-6xl text-center font-ops">Image Search</h1>
      </a>
      <div className="flex justify-center items-center">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type to start searching..."
            className="w-80 outline-double font-lemon max-w-sm focus:ring-4 focus:ring-pink-400"
            ref={searchInput}
          />
        </Form>
      </div>
      <Filters searchInput={searchInput} fetchImages={fetchImages} />

      <div className="flex justify-center items-center">
        {loading && (
          <div className="flex text-3xl flex-col lg:text-5xl justify-center items-center mt-20 font-mono">
            Start Searching...
            <img
              src="/images/magnifyGlass.jpg"
              className="max-w-sn lg:max-w-2xl mt-10 rounded"
            />
          </div>
        )}
        {!loading && (
          <div className="grid mt-8 gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mb-10">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={images.alt_description}
                className="w-52 h-52 rounded-lg transition-transform hover:transform hover:-translate-y-3"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-5 mb-5">
        {page > 1 && (
          <Button
            onClick={() => setPage(page - 1)}
            className="bg-black text-xl p-2 rounded cursor-pointer border-black hover:text-pink-400"
          >
            Previous
          </Button>
        )}
        {page < totalPages && (
          <Button
            onClick={() => setPage(page + 1)}
            className="bg-black p-2 text-xl rounded cursor-pointer hover:text-pink-400"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
