import "./styles.css";
import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { PAGE_SIZE } from "./constants";

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };

  const handleLeftArrowClick = () => {
    if (currentPage !== 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (currentPage !== noOfPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !products.length ? (
    <h1>No Products Found</h1>
  ) : (
    <div className="App">
      <h1>Adding Pagination</h1>
      <div className="pagination-container">
        <span className="pagination-arrow" onClick={handleLeftArrowClick}>
          ⬅️
        </span>
        {[...Array(noOfPages).keys()].map((n) => {
          return (
            <span
              className={`page-number ${
                n === currentPage && "selected-page-number"
              }`}
              key={n}
              onClick={() => setCurrentPage(n)}
            >
              {n}
            </span>
          );
        })}
        <span className="pagination-arrow" onClick={handleRightArrowClick}>
          ➡️
        </span>
      </div>
      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}
