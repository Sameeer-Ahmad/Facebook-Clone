import { Flex } from "@chakra-ui/react";

import { Feed } from "./Feed";
import { PostPage } from "../PostPage";
import { Story } from "./Story";

import { FC, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";
import { Timestamp, collection, onSnapshot } from "firebase/firestore";
import Sidebar from "../../Sidebar";
import RightBar from "../../Rightbar";
import "firebase/compat/firestore";

interface Post {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  postUserId: string;
  userName: string;
  userImage:string,
  timestamp: Timestamp;
  uid: string;
}

export const Post: FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (user?.displayName) {
      document.title = `Facebook - ${user.displayName}`;
    }
  }, [user?.displayName]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData as Post[]);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Flex>
        <Sidebar />
        <Flex direction={"column"}>
          <Story />
          <Feed />
          {posts
            .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
            .map((post) => (
              <PostPage
                key={post.id}
                postId={post.id}
                user={user}
                username={post.userName}
                userImage={post.userImage}
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
