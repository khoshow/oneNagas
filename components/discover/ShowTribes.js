import Link from "next/link";
import renderHTML from "react-render-html";
import moment, { now } from "moment";
import { API } from "../../config";
import { smartTrim } from "../../helpers/trim";

const ShowTribes = ({ tribes }) => {
  const showAllTribes = () => {
    // const alternateName = (altUrl) => {
    //   if (altUrl) {
    //     return "User Profile photo";
    //   } else {
    //     return "";
    //   }
    // };

    const slug = tribes.slug;
    console.log(slug);
    const hel = String(slug);

    return (
      <div className="">
        <div className="">
          <div className="discover-items">
            <div className="item-canvas">
              <Link href={`/tribes/${tribes.slug}`}>
                <a>
                  <h4 className="discover-item-name"> {tribes.name}</h4>{" "}
                </a>
              </Link>
            </div>
            <div className="">
              <Link href={`/tribes/${tribes.slug}`}>
                <img
                  src={`${API}/naga-tribe-photo/photo/${hel}`}
                  className="discover-image"
                  alt={`${tribes.slug}`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{showAllTribes()}</div>;
};

export default ShowTribes;
