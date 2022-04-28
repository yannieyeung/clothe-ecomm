import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} eachProduct={product} />;
          })}
      </div>
    </Fragment>
  );
};

export default Category;
