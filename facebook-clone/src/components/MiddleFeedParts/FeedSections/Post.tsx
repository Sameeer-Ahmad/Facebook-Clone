

import { Flex, Heading } from "@chakra-ui/react";

import { Feed } from "./Feed";
import { PostPage } from "../PostPage";
import { Story } from "./Story";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";

import { Timestamp, collection,onSnapshot } from "firebase/firestore";
import Sidebar from "../../Sidebar";
import RightBar from "../../Rightbar";

import 'firebase/compat/firestore';

import {  doc, getDocs } from "firebase/firestore";

interface Post {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  postUserId: string;
  userName: string;
  timestamp: Timestamp;
  uid: string; 
  // postUserId: string;
}

export const Post = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (user?.displayName) {
        document.title = `Facebook - ${user.displayName}`;
    }
}, [user?.displayName]);
  if (user === undefined) {
    navigate("/login");
  }
 
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postData as Post[]);
      console.log("postdata", postData); 
      
    });
    
    return unsubscribe; // Unsubscribe from snapshot listener when component unmounts or re-renders
  }, []);

  // This console.log won't show the updated posts immediately after the state is set
  // console.log("post ", posts);

  console.log("post " ,posts);
  // console.log(timestamp);
  
  // console.log("pso ", posts);

  return (
    <>
      <Flex>

        <Sidebar />
        <Flex direction={"column"} width={"60%"}>
          <Story />
          <Feed />

          {posts.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds).map(post => (
  <PostPage 
    key={post.id}
    postId={post.id}
    user={user}
    username={post.userName}
    caption={post.caption}
    imageURL={post.imageUrl}
    noOfLikes={post.likes}
    postUserId={post.uid}
    timestamp={post.timestamp}
  />
))}

        </Flex>
        <RightBar />
      </Flex>

    </>
  );
};

