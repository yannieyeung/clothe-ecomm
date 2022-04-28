import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../contexts/categories.context";
// import ProductCard from "../../components/product-card/product-card.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  console.log( categoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title] // this becomes an array
        return <CategoryPreview key={title} title={title} products={products}/>
      }
      // (
      //   <Fragment key={title}>
      //     <h2>{title}</h2>
      //     <div className="products-container">
      //       {categoriesMap[title].map((product) => {
      //         return <ProductCard key={product.id} eachProduct={product} />;
      //       })}
      //     </div>
      //   </Fragment>
      // )
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
