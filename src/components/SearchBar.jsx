import { Form } from "react-bootstrap";
import { useRef } from "react";

export default function SearchBar() {
  const searchInput = useRef(null);

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput.current.value);
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
    </div>
  );
}
