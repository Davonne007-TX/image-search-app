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
    <div className="flex flex-col">
      <h1 className="mb-10 text-2xl font-serif text-center">Image Search</h1>
      <div className="flex justify-center items-center">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search For"
            className="w-96 outline-double"
            ref={searchInput}
          />
        </Form>
      </div>
      <Filters searchInput={searchInput} fetchImages={fetchImages} />

      <div className="images">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={images.alt_description}
            className="image"
          />
        ))}
      </div>
    </div>
  );
}
