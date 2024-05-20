import { User, getAuth } from "firebase/auth";
import React, { FC, useEffect, useState } from "react";
import { db } from "../../firebase";
import { PiShareFatLight } from "react-icons/pi";
import {
  Timestamp,
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
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiChat, BiLike, BiShare } from "react-icons/bi";

import { ImEmbed2 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { HiSaveAs } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

interface Post {
  postId: string | any;
  user: User | null;
  username: string;
  caption: string;
  imageURL: string;
  noOfLikes: number;
  postUserId: string;
  timestamp: Timestamp | null;
  userImage:string
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
  userImage
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
const auth=getAuth();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    if (timestamp && timestamp.seconds) {
      new Date(timestamp.seconds * 1000);
    }
  }, [timestamp]);

  const addPost = async (post: Post) => {
    try {
      const postRef = doc(collection(db, "posts"), post.postId);
      await setDoc(postRef, { ...post, timestamp: new Date() });
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
    const likeRef = doc(collection(db, "posts", postId, "likes"), user?.uid);
    if (liked) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, {
        userId: user?.uid,
      });
    }
    setLiked(!liked);
  };
  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", postId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs as any);
      }
    );
    return () => {
      unSub();
    };
  }, [postId]);
  useEffect(() => {
    setLiked(likes.some((like) => like.id === user?.uid));
  }, [likes, user?.uid]);

  return (
    <>
      <Center>
        <Card
          mb={6}
          maxW={["200px", "300px", "300px", "350px", "350px", "350px"]}
          minW={["373px", "529px", "765px", "550px", "500px"]}
          borderRadius="lg"
          overflow="hidden"
        >
          <CardHeader>
            <Flex justify={"space-between"}>
              <Flex gap={"18px"}>
              <Avatar src={ userImage as any} />

                <Flex flexDir={"column"}>
                  <Heading mt={"10px"} fontWeight={"600"} size="sm">
                    {username}
                  </Heading>
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
                ></MenuButton>
                <MenuList p={2}>
                  <MenuItem gap={1}>
                    <HiSaveAs />
                    Save Post
                  </MenuItem>
                  <MenuItem gap={1}>
                    <ImEmbed2 />
                    Embeded
                  </MenuItem>
                  {user && user.uid === postUserId && (
                    <MenuItem gap={1} onClick={handleDelete}>
                      {" "}
                      <MdDeleteForever />
                      Delete the post
                    </MenuItem>
                  )}
                  <MenuItem gap={1}>
                    <IoIosNotifications />
                    turn on notifications for this post
                  </MenuItem>
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} ml={"15px"}>
              <Button bg={"none"} _hover={{ bg: "none" }}>
                <AiFillLike />
              </Button>
              {likes.length > 0 && <Text mt={"7px"}>{likes.length}</Text>}
            </Box>
            <Box display={"flex"} mr={"15px"}>
              {" "}
              {comments.length > 0 && <Text mt={"7px"}>{comments.length}</Text>}
              <Button
                bg={"none"}
                _hover={{ bg: "none" }}
                onClick={() => setShowComments(!showComments)}
              >
                <FaComment />
              </Button>
            </Box>
          </Box>
          <CardFooter flexDir="column" borderTop={"1px solid gray"} p={1}>
            <Flex justify="space-between">
              <Button flex="1" variant="ghost" gap={1} onClick={handleLike}>
                <BiLike />
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
              <Button flex="1" variant="ghost" leftIcon={<PiShareFatLight />}>
                Share
              </Button>
            </Flex>
            {showComments && (
              <>
                <Box as="form" onSubmit={handleSubmit}>
                  <Flex mb={"5px"} mt={"5px"} gap={"10px"}>
                  <Avatar src={auth.currentUser?.photoURL  as any} />

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
                      color={"black"}
                      p={"10px"}
                      borderRadius={"10px"}
                      w={"auto"}
                      flexDir={"column"}
                    >
                      <Text fontWeight={"600"}>{comment.username}</Text>
                      <Text >{comment.comment}</Text>
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

