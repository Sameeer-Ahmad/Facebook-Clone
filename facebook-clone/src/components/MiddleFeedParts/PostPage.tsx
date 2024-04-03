import { User, deleteUser, getAuth } from "firebase/auth";
import React, { FC, useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiChat, BiLike, BiShare } from "react-icons/bi";

const auth = getAuth();
const user = auth.currentUser;
interface Post {
  postId: string | any;
  user: User | null;
  username: string;
  caption: string;
  imageURL: string;
  noOfLikes: number;
  postUserId: string;
  timestamp: Timestamp | null;
}

export const PostPage: FC<Post> = ({
  postId,
  user,
  username,
  caption,
  imageURL,
  noOfLikes,
  postUserId,
  timestamp,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [show, setShow] = useState<string>("like");
  console.log(
    "postinfo",
    username,
    caption,
    imageURL,
    noOfLikes,
    postUserId,
    timestamp
  );

  // deleteUser(user).then(() => {
  //   // User deleted.
  // }).catch((error) => {
  //   // An error ocurred
  //   // ...
  // });
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      console.log("Post deleted successfully!");
      // Handle any additional logic after deleting the post, such as removing it from the state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      console.log("Date: ", date);
    }
  }, [timestamp]);

  const addPost = async (post: Post) => {
    try {
      const postRef = doc(collection(db, "posts"), post.postId);
      await setDoc(postRef, { ...post, timestamp: new Date() });
      console.log("Post added successfully!");
      setPosts((prevPosts: Post[]) => [post, ...prevPosts]);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, "posts", postId, "comments");
      const querySnapshot = await getDocs(query(commentsRef));
      const commentsData = querySnapshot.docs.map((doc: any) => doc.data());
      setComments(commentsData.reverse());
      const unsubscribe = onSnapshot(query(commentsRef), (snapshot) => {
        const newCommentsData: Comment[] = snapshot.docs.map(
          (doc) => doc.data() as Comment
        );
        setComments(newCommentsData.reverse());
      });
      return unsubscribe;
    };
    fetchComments();
  }, [postId]);

  const addComment = async (comment: {
    id: string;
    comment: string;
    timestamp: Date;
    username: string;
    photoURL: string;
  }) => {
    try {
      const commentRef = doc(
        collection(db, "posts", postId, "comments"),
        comment.id
      );
      await setDoc(commentRef, comment);
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const likesRef = collection(db, "posts", postId, "likes");
      const querySnapshot = await getDocs(query(likesRef));
      const likesData = querySnapshot.docs.map((doc: any) => doc.data());
      setLikes(likesData);
      const unsubscribe = onSnapshot(query(likesRef), (snapshot) => {
        const newLikesData: Like[] = snapshot.docs.map(
          (doc) => doc.data() as Like
        );
        setLikes(newLikesData);
      });
      return unsubscribe;
    };
    fetchLikes();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const commentId = Date.now().toString();
      const comment = {
        id: commentId,
        comment: newComment,
        timestamp: new Date(),
        username: user?.displayName || "",
        photoURL: user?.photoURL || "",
      };
      setComments((prevComments) => [comment, ...prevComments]);
      await addComment(comment);
      setNewComment("");
    }
  };
  const handleLike = async () => {
    try {
      // Check if the user has already liked the post
      const alreadyLiked = likes.some((like) => like.id === user?.uid);

      if (alreadyLiked) {
        // If the user has already liked the post, remove the like
        const likeIndex = likes.findIndex((like) => like.id === user?.uid);
        const likeId = likes[likeIndex].id;
        await deleteDoc(doc(db, "posts", postId, "likes", likeId));
      } else {
        // If the user has not liked the post, add the like
        const like = {
          userId: user?.uid,
          // Add any other relevant information about the like
          timestamp: new Date(),
        };
        await addDoc(collection(db, "posts", postId, "likes"), like);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <>
      <Center>
        <Card
          mb={6}
          maxW="350px"
          minW="500px"
          borderRadius="lg"
          overflow="hidden"
        >
          <CardHeader>
            <Flex justify={"space-between"}>
              <Flex gap={"18px"}>
                <Avatar src={user?.photoURL || ""} />
                <Flex flexDir={"column"}>
                  <Heading mt={"15px"} size="sm">
                    {username}
                  </Heading>
                  {/* <TimeAgo date={timestamp ? new Date(timestamp.toDate()).toLocaleString() : ''} /> */}
                  <Text>
                    {timestamp
                      ? new Date(timestamp.toDate()).toLocaleString()
                      : ""}
                  </Text>
                </Flex>
              </Flex>
              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                >
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  {user && user.uid === postUserId && (
                    <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
                  )}
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <Text ml={"24px"} mb={"10px"}>
            {caption}
          </Text>
          <Image
            h="300px"
            borderTop={"1px solid gray"}
            objectFit="contain"
            src={imageURL}
            alt=""
          />
          <CardFooter flexDir="column" borderTop={"1px solid gray"}>
            <Flex justify="space-between">
              <Button
                flex="1"
                variant="ghost"
                leftIcon={<BiLike />}
                onClick={handleLike}
              >
                Like
              </Button>
              <Button
                flex="1"
                variant="ghost"
                leftIcon={<BiChat />}
                onClick={() => setShowComments(!showComments)}
              >
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </Flex>
            {showComments && (
              <>
                <Box as="form" onSubmit={handleSubmit}>
                  <Flex mb={"5px"} mt={"5px"} gap={"10px"}>
                    <Avatar src={user?.photoURL as any} />
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewComment(e.target.value)
                      }
                    />
                  </Flex>
                </Box>
                {comments.map((comment: Comment) => (
                  <Flex key={comment.id} mb={"3px"} mt={"3px"} gap={"10px"}>
                    <Avatar src={comment.photoURL} />
                    <Flex
                      bg={"rgb(240,242,245)"}
                      p={"10px"}
                      borderRadius={"10px"}
                      w={"auto"}
                      flexDir={"column"}
                    >
                      <Text fontWeight={"600"}>{comment.username}</Text>
                      <Text>{comment.comment}</Text>
                    </Flex>
                  </Flex>
                ))}
              </>
            )}
          </CardFooter>
        </Card>
      </Center>
    </>
  );
};

interface Comment {
  id: string;
  comment: string;
  timestamp: Date;
  username: string;
  photoURL: string;


}
interface Like {
  id: string;
  like: string;
  timestamp: Date;
  username: string;
  photoURL: string;
}

export default PostPage;

/*
   {/* <Center>
        <Card
          mb={6}
          maxW="350px"
          minW="500px"
          borderRadius="lg"
          overflow="hidden"
        >
          <CardHeader>
           <Flex justify={"space-between"} >
           <Flex  gap={'18px'}>
              <Avatar src={user?.photoURL || ""} />
              <Heading mt={"15px"} size="sm">{username}</Heading>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            /></Flex>
          </CardHeader>
          <Text ml={"24px"} mb={"10px"}>
            {caption}
          </Text>
          <Image
            h="300px"
            borderTop={"1px solid gray"}
            objectFit="contain"
            src={imageURL}
            alt=""
          />
          <CardFooter flexDir="column" borderTop={"1px solid gray"}>
            <Flex justify="space-between">
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button
                flex="1"
                variant="ghost"
                leftIcon={<BiChat />}
                onClick={() => setShowComments(!showComments)}
              >
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </Flex>
            {showComments && (
              <>
                <Box as="form" >
                  <Flex mb={"5px"} mt={"5px"} gap={"10px"}>
                    <Avatar src={user?.photoURL as any} />
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewComment(e.target.value)
                      }
                    />
                  </Flex>
                </Box>
                {comments.map((comment: Comment) => (
                  <Flex key={comment.id} mb={"3px"} mt={"3px"} gap={"10px"}>
                    <Avatar src={comment.photoURL} />
                    <Flex
                      bg={"rgb(240,242,245)"}
                      p={"10px"}
                      borderRadius={"10px"}
                      w={"auto"}
                      flexDir={"column"}
                    >
                      <Text fontWeight={"600"}>{comment.username}</Text>
                      <Text>{comment.comment}</Text>
                    </Flex>
                  </Flex>
                ))}
              </>
            )}
          </CardFooter>
          
        </Card>
      </Center> */

/**
 * 
 * 
  const addPost = async (post: Post) => {
    try {
      const postRef = doc(collection(db, "posts"), post.postId);
      await setDoc(postRef, { ...post, timestamp: new Date() });
      console.log("Post added successfully!");
      setPosts((prevPosts: Post[]) => [post, ...prevPosts]);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };
  

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, "posts", postId, "comments");
      const querySnapshot = await getDocs(query(commentsRef));
      const commentsData = querySnapshot.docs.map((doc: any) => doc.data());
      setComments(commentsData.reverse());

      const unsubscribe = onSnapshot(query(commentsRef), (snapshot) => {
        const newCommentsData: Comment[] = snapshot.docs.map(
          (doc) => doc.data() as Comment
        );
        setComments(newCommentsData.reverse());
      });

      return unsubscribe;
    };

    fetchComments();
  }, [postId]);

  const addComment = async (comment: {
    id: string;
    comment: string;
    timestamp: Date;
    username: string;
    photoURL: string;
  }) => {
    try {
      const commentRef = doc(
        collection(db, "posts", postId, "comments"),
        comment.id
      );
      await setDoc(commentRef, comment);
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };


  useEffect(() => {
    const fetchLikes = async () => {
      const likesRef = collection(db, "posts", postId, "likes");
      const querySnapshot = await getDocs(query(likesRef));
      const likesData = querySnapshot.docs.map((doc: any) => doc.data());
      setLikes(likesData);
  
      const unsubscribe = onSnapshot(query(likesRef), (snapshot) => {
        const newLikesData: Like[] = snapshot.docs.map(
          (doc) => doc.data() as Like
        );
        setLikes(newLikesData);
      });
  
      return unsubscribe;
    };
  
    fetchLikes();
  }, [postId]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const commentId = Date.now().toString();
      const comment = {
        id: commentId,
        comment: newComment,
        timestamp: new Date(),
        username: user?.displayName || "",
        photoURL: user?.photoURL || "",
      };
      setComments((prevComments) => [comment, ...prevComments]);
      await addComment(comment);
      setNewComment("");
    }
  };

 * 
 */
