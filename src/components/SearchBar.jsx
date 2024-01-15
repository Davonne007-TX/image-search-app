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

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
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

  return (
    <div className="mt-8">
      <h1 className="mb-10 text-6xl text-center font-ops">Image Search</h1>
      <div className="flex justify-center items-center">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type to start searching..."
            className="w-96 outline-double font-lemon"
            ref={searchInput}
          />
        </Form>
      </div>
      <Filters searchInput={searchInput} fetchImages={fetchImages} />

      <div className="flex justify-center items-center">
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
      </div>

      <div className="flex justify-center items-center gap-5 mb-5">
        {page > 1 && (
          <Button
            onClick={() => setPage(page - 1)}
            className="bg-black font-serif text-pink-500 p-2 text-xl rounded cursor-pointer border-black hover:text-white"
          >
            Previous
          </Button>
        )}
        {page < totalPages && (
          <Button
            onClick={() => setPage(page + 1)}
            className="bg-black font-serif text-pink-500 text-xl p-2 rounded cursor-pointer"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
