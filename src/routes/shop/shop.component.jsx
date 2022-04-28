import { Fragment, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
// import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  console.log( categoriesMap);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}/>
      <Route path=":category" element={<Category />}/>
    </Routes>

    // <div className="shop-container">
    //   {Object.keys(categoriesMap).map((title) => {
    //     const products = categoriesMap[title] // this becomes an array
    //     return <CategoryPreview key={title} title={title} products={products}/>
    //   }
    //   // (
    //   //   <Fragment key={title}>
    //   //     <h2>{title}</h2>
    //   //     <div className="products-container">
    //   //       {categoriesMap[title].map((product) => {
    //   //         return <ProductCard key={product.id} eachProduct={product} />;
    //   //       })}
    //   //     </div>
    //   //   </Fragment>
    //   // )
    //   )}
    // </div>
  );
};

export default Shop;
