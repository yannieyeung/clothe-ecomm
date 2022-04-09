import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ allCategories }) => {
  return (
    <div className="directory-container">
      {allCategories.map((category) => {
        return <CategoryItem key={category.id} eachCategory={category} />;
      })}
    </div>
  );
};

export default Directory;
