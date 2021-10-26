import Link from "next/link";
import renderHTML from "react-render-html";
import moment, { now } from "moment";
import { API } from "../../config";
import { smartTrim } from "../../helpers/trim";

const ShowCategories = ({ categories }) => {
  const showAllCategories = () => {
    // const alternateName = (altUrl) => {
    //   if (altUrl) {
    //     return "User Profile photo";
    //   } else {
    //     return "";
    //   }
    // };

    const slug = categories.slug;
    // console.log(slug);
    const hel = String(slug);

    return (
   
          <div className="discover-items" >
            <div className="item-canvas">
              <Link href={`/categories/${categories.slug}`}>
                <a>
                  <h4 className="discover-item-name"> {categories.name}</h4>
                </a>
              </Link>
            </div>
            <div className="">
              <Link href={`/categories/${categories.slug}`}>
                <img
                  src={`${API}/category-image/image/${hel}`}
                  className="discover-image"
                
                  alt={`${categories.slug}`}
                />
              </Link>
            </div>
          </div>
      
    );
  };

  return <div>{showAllCategories()}</div>;
};

export default ShowCategories;
