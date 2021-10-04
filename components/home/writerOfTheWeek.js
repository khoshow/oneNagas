

import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';


const WriterOfTheWeek = ({ blog }) => {

    return (
        <div className="recent-blogs-card row">
           
                <div className="col-md-8" >
                    <div className="">
                        <h5 className="">{blog.title}</h5>

                        <div className="">
                            Posted {moment(blog.updatedAt).fromNow()} by{' '}
                            <Link href={`/profile/${blog.postedBy.username}`}>
                                <a className="">{blog.postedBy.username}</a>
                            </Link>
                        </div>
                    </div>
                </div>
          
            <div className="col-md-4 card-image-div">
                <img className="card-image" src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
            </div>
        </div>

    )

}

export default WriterOfTheWeek