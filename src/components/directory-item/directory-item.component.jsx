import { Body, BackgroundImage, DirectoryItemContainer } from './directory-item.styles.jsx'

const DirectoryItem = ({ eachCategory }) => {

    const { imageUrl, title} = eachCategory;

return (
  <DirectoryItemContainer>
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