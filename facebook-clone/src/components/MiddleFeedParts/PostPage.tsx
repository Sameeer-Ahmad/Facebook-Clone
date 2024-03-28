import { Feed } from "./FeedSections/Feed";
import { Post } from "./FeedSections/Post";
import { Story } from "./FeedSections/Story";

export const PostPage=()=>{
    return(
        <>
        <Story/>
        <Feed/>
        {/* <Post/> */}
        </>
    );
}