import axios from "axios";
import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
import Filters from "./Filters";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

export default function SearchBar() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //api
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log("Data:", data);
      setImages(data.results);
      setTotalPages(data.total_Pages);
    } catch (error) {
      console.error("Error", error);
    }
  };

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  };

  return (
    <div className="mt-8">
      <h1 className="mb-10 text-4xl font-serif text-center font-lemon">
        Image Search
      </h1>
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
        <div className="grid mt-8 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mb-10">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={images.alt_description}
              className="w-48 h-48 rounded-lg transition-transform hover:transform hover:-translate-y-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
