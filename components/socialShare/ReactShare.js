import { API } from '../../config';
import { DOMAIN } from '../../config';
import {

    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";

import {
    FacebookShareCount,

    PinterestShareCount,
    RedditShareCount,

} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";



const ReactShare = ({ blog }) => {


    return (
        <div>
            <div>
                <FacebookShareButton url={`${DOMAIN}/blogs/${blog.slug}`} >
                   
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={`${DOMAIN}/blogs/${blog.slug}`}>
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
                <PinterestShareButton url="https://getbootstrap.com/" media={`${DOMAIN}/blog/photo/${blog.slug}`}>
                    <PinterestIcon size={40} round={true} />
                </PinterestShareButton>
                <RedditShareButton url={`${DOMAIN}/blogs/${blog.slug}`}>
                    <RedditIcon size={40} round={true} />
                </RedditShareButton>
                <TelegramShareButton url={`${DOMAIN}/blogs/${blog.slug}`} title={`${blog.title}`}>
                    <TelegramIcon size={40} round={true} />
                </TelegramShareButton>
                <TwitterShareButton url={`${DOMAIN}/blogs/${blog.slug}`}>
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
            </div>
            <div>
            
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )

}

export default ReactShare

