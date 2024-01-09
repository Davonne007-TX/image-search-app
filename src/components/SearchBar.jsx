import axios from "axios";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import Filters from "./Filters";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

export default function SearchBar() {
  const searchInput = useRef(null);

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
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-10 text-2xl font-serif">Image Search</h1>
      <div className="search-section">
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
    </div>
  );
}
