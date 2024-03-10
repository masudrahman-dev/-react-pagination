import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const items = [...Array(1000)].map((l, i) => i + 1);

function Items({ currentItems }) {
  return (
    <div className="flex justify-center gap-6">
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <br />
      <br />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowLeft />}
        className="flex items-center justify-center gap-3"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel={<ArrowRight />}
        renderOnZeroPageCount={null}
        activeClassName="bg-black text-white "
        previousClassName="  rounded-md  p-2 border hover:border-2 hover:border-gray-500"
        nextClassName="  rounded-md  p-2 border hover:border-2 hover:border-gray-500"
        pageClassName="hover:bg-gray-200  rounded-md  px-3 p-1"
      />
    </>
  );
}

const App = () => {
  return (
    <div className="container mx-auto mt-20">
      <div>
        <PaginatedItems itemsPerPage={4} />
      </div>
    </div>
  );
};

export default App;
