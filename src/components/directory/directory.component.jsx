import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ allCategories }) => {
  return (
    <div className="directory-container">
      {allCategories.map((category) => {
        return <DirectoryItem key={category.id} eachCategory={category} />;
      })}
    </div>
  );
};

export default Directory;
