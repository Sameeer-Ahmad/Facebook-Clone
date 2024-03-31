import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "../Sidebar";
import { Flex } from "@chakra-ui/layout";
import { Story } from "./FeedSections/Story";
import { Feed } from "./FeedSections/Feed";
import RightBar from "../Rightbar";

interface Post{

    postId:string;
    user:User|null;
    username:string;
    caption:string;
    imageURL:string;
    noOfLikes:number;
    postUserId:string;
}
export const PostPage:FC<Post>=({postId,user,username,caption,imageURL,noOfLikes,postUserId})=>{

    const [comments,setComments]=useState<string[]>([]);
    const [comment,setComment]=useState<string>("");
    const [show,setShow]=useState<boolean>(false);
    const [liked,setLiked]=useState<string>("textForLike");
    const [posterImage,setPosterImage]=useState<string>("");
  const[postuser,setPostUser]=useState<User|null>()

  useEffect(()=>{
    if(postUserId){
       const fetchData=async()=>{
        const querySnapshot=await getDocs(collection(db,"users"));
        querySnapshot.forEach((doc)=>{
            if(doc.id===postUserId){
                setPostUser(doc.data() as User)
            }
        })
       } 
       fetchData()
    }
  },[postUserId])
  console.log( "postuser", postuser);
  
    return(
        < >
     <Flex>
               
            <Sidebar />
             <Flex direction={"column"} width={"60%"}>
                    <Story/>
                    <Feed/>
            </Flex>
                <RightBar />
            {/* <Post/> */}
        </Flex>
        </>
    );
}
