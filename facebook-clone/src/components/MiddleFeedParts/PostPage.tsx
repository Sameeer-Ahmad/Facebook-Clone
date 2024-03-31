import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

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
        <>
        
       
        {/* <Post/> */}
        </>
    );
}
