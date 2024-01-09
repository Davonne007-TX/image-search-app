import { Form } from "react-bootstrap";

export default function SearchBar() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-10 text-2xl font-serif">Image Search</h1>
      <div className="search-section">
        <Form>
          <Form.Control
            type="search"
            placeholder="Search For"
            className="w-96 outline-double"
          />
        </Form>
      </div>
    </div>
  );
}
