
import { Box, Heading } from "@chakra-ui/react";



import { Flex, Heading } from "@chakra-ui/react";
import { Feed } from "./Feed";
import { PostPage } from "../PostPage";
import { Story } from "./Story";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import Sidebar from "../../Sidebar";
import RightBar from "../../Rightbar";
interface Post {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  userName: string;
  uid: string;
}

export const Post = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  document.title = "facebook";
  if (user === undefined) {
    navigate("/login");
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any;
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchPosts();
  }, []);
  console.log(posts);

  return (
    <>
      <Flex>

        <Sidebar />
        <Flex direction={"column"} width={"60%"}>
          <Story />
          <Feed />
          {posts.map(({ id, caption, imageUrl, userName, likes, uid }) => (
            <PostPage
              key={id}
              postId={id}
              user={user}
              username={userName}
              caption={caption}
              imageURL={imageUrl}
              noOfLikes={likes}
              postUserId={uid}
            />
          ))}
        </Flex>
        <RightBar />
        {/* <Post/> */}
      </Flex>
      {/* <Story />
      <PostPage/> */}

      {/* <Feed /> */}

    </>
  );
};

