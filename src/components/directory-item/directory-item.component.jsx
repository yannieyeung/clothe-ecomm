import { Body, BackgroundImage, DirectoryItemContainer } from './directory-item.styles.jsx'
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ eachCategory }) => {

    const { imageUrl, title, route } = eachCategory;

    const navigate = useNavigate();

    const navigateHandler = () => navigate(route)

return (
  <DirectoryItemContainer onClick={navigateHandler}>
          <BackgroundImage imageUrlProps={imageUrl} />
          <Body>
            <h2>{title}</h2>
            <p>Shop now</p>
          </Body>
        </DirectoryItemContainer>



    // <div className="directory-item-container">
    //       <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}} />
    //       <div className="body">
    //         <h2>{title}</h2>
    //         <p>Shop now</p>
    //       </div>
    //     </div>
);

}

export default DirectoryItem