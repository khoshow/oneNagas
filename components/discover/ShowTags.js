import Link from "next/link";
import renderHTML from "react-render-html";
import moment, { now } from "moment";
import { API } from "../../config";
import { smartTrim } from "../../helpers/trim";

const ShowTags = ({ tags }) => {
  const showAllTags = () => {
    // const alternateName = (altUrl) => {
    //   if (altUrl) {
    //     return "User Profile photo";
    //   } else {
    //     return "";
    //   }
    // };

    const slug = tags.slug;
    console.log(slug);
    const hel = String(slug);

    return (
      <div className="">
        <div className="">
          <div className="discover-items">
            <div className="item-canvas">
              <Link href={`/tags/${tags.slug}`}>
                <a>
                  <h4 className="discover-item-name"> {tags.name}</h4>{" "}
                </a>
              </Link>
            </div>
            <div className="">
              <Link href={`/tags/${tags.slug}`}>
                <img
                  src={`${API}/tag-image/image/${hel}`}
                  className="discover-image"
                  alt={`${tags.slug}`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{showAllTags()}</div>;
};

export default ShowTags;
