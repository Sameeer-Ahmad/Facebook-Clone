import { Flex } from "@chakra-ui/react";
import Rightbar from "../Rightbar";
import  Sidebar  from "../Sidebar";
import { Feed } from "./FeedSections/Feed";
// import { Post } from "./FeedSections/Post";
import { Story } from "./FeedSections/Story";

export const PostPage=()=>{
    return(
        < >
     <Flex>
               
            <Sidebar />
             <Flex direction={"column"} width={"60%"}>
                    <Story/>
                    <Feed/>
            </Flex>
                <Rightbar />
            {/* <Post/> */}
        </Flex>
        </>
    );
}