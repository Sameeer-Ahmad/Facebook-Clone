

import { Box, Flex, Image, IconButton, Text, Center,Button } from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import { PiShareFatThin } from "react-icons/pi";
import { useEffect, useState } from "react";

//import Nav from "../../components/Navbar";

interface FeedItem {
  name: string;
  profileImage: string;
  postImage: string;
}

const items: FeedItem[] = [
  {
    name: "Anjali Sarma",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/374657080_122098732592015666_6722996700235901609_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=W7h8wl8lBw4AX9jGwqy&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfArK-eSB6ph6OoIyCEpsdcAauV0aaC1rbNzf6XJ9ofIaA&oe=660FBD6F",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434186298_122158424870015666_3079377625838593841_n.jpg?stp=dst-jpg_s640x640&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_0AEllGEgGEAX_mWQHS&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBHrsYwIEBcygK7-068yOuFcrwm1sth1rXHrrXokjRZ6g&oe=660F968D",
   
  },
  {
    name: "Jane Smith",
    profileImage: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/433442904_260974780416287_8068143103888301562_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uPZhxhp6sfEAX85cE2H&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfA7J7oNAoUSl1Ejc8weL0pSVBAjwd8MfCy1_rGVbEQppw&oe=660F88AF",
  },
  {
    name: "Vkd Fans",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/433919430_720827443553804_4181982651166635109_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GZa4JTifXu4AX-HbfyR&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfDdINZvVZknvxm_pK9FdQ_UIzue6mqUaadm70SMSe4SyQ&oe=660FA636",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/433919430_720827443553804_4181982651166635109_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GZa4JTifXu4AX-HbfyR&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfDdINZvVZknvxm_pK9FdQ_UIzue6mqUaadm70SMSe4SyQ&oe=660FA636",
  },
  {
    name: "Laba Hansta",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434205092_405416972235344_5684375019161596899_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=t8RHuaLpMLoAX-sLRee&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBjvu-Mc_m-zTM3tI5IlCy7j7FnkxxNF_Ow5HtgkhsfbQ&oe=660FA29E",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434205092_405416972235344_5684375019161596899_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=t8RHuaLpMLoAX-sLRee&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBjvu-Mc_m-zTM3tI5IlCy7j7FnkxxNF_Ow5HtgkhsfbQ&oe=660FA29E",
  },
  {
    name: "Bageswar Dham",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/357345277_127841440339162_1330571156122456338_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=klG3mUGEEboAX9L3CZ7&_nc_oc=AdiK2Tm-Su7XBjuFcGy2Xf-G3aNWU5wkpe8rTJxAqR8ld3CnNpfNRo2gz-lK5Npz6BiXyl9X6jQqruYW-_W9EdEC&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBYx3F8rX4LlDTQ09RKGfRe1mP7HRzsUSA2oYsTVjgmeA&oe=660F94DC",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434704375_297751020014869_8608481761492723318_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KvB86mGqUaUAX_tdRT3&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBidOTeM0ik5M-_eoqt_3o0xPpIEmCJUXQPA8_dG3fn_g&oe=660FACFC",
  },
  {
    name: "Rohit Fans",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434249281_789544756568254_8969836260176542579_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Hy7R3LsbAf8AX-VgiON&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfDOXkGw_qXa-Kx558mYs6xT8sZAMIOVYomdP4XnrYfKTw&oe=660F8A28",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434249281_789544756568254_8969836260176542579_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Hy7R3LsbAf8AX-VgiON&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfDOXkGw_qXa-Kx558mYs6xT8sZAMIOVYomdP4XnrYfKTw&oe=660F8A28",
  },
  {
    name: "Mems Dunia",
    profileImage: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/417698662_442173161709005_3883401760526014480_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wqnSS7CillAAX_fT6Sj&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfA38Lvtav1XwadspvibQXMQq0Nv38mwNULH9QryjUwexA&oe=660FA663",
  },
  {
    name: "Kavya Fans",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t1.6435-1/186504702_314237693605918_6329629272931421422_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=fXB7bw3WcZIAX8M6Tug&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBy_G4hK75XzxDC-Dqc-pgiC4cGZWm2nk8MsqoXoPeRkA&oe=66313ACD",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434388667_971370697892611_1184250870329444065_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2K0locAOmyQAX9Tr2Xv&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfDtMp3ACQj884v64bs1fpZplZ9WJ-nisE2OZs18SW_YPw&oe=660FBBA7",
  },
  {
    name: "Sport Art",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434753935_973873800975634_6095927457318138359_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_pMCQZkyiyoAX-ae26H&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfB3iJ7uv7LxcDD1IrSydGqwQRprYyi7OX8SJJeqwIMdAw&oe=660F91F7",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434753935_973873800975634_6095927457318138359_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_pMCQZkyiyoAX-ae26H&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfB3iJ7uv7LxcDD1IrSydGqwQRprYyi7OX8SJJeqwIMdAw&oe=660F91F7",
  },
  {
    name: "Bhagyashree",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/387832179_225860630502727_8003001706790115143_n.jpg?stp=c226.31.400.400a_dst-jpg_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TYSJzFeTjDYAX-D3vt0&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBm7QzJc71USO2UXxZjvFeiWBPiMRzjc3YyYzOAKXauaw&oe=660F94B2",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434630184_327991906956265_8072550764997443050_n.jpg?stp=dst-jpg_p526x296&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jUGddwHsyFkAX9FXI4J&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfDr6rwd9H42SBKp0ZYuKP0EllxhViRsPagNJunCJQfyjA&oe=660F9CE5",
  },
  {
    name: "Harsad Sarma",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/367394953_122098312856008768_2962888109671868306_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1W5wPjOK9UAAX-KIpy9&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfAL6OIf8yk2xPKTXmOIZjNqfJ9xNMzdZlTl_3N2KdXnJg&oe=660FA759",
    postImage: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "One Cricket",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/299480080_433674295447876_7606430404509531078_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zhwcZdApH6QAX--RtL0&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfDs93a1Bc7J_jIZgdmpfs4F3JeqrMw6hxp3LmouLsqxwA&oe=660F9DB0",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/432947817_811344871014148_793963366957763985_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=O8IYJDkg9GEAX8gJ9Hs&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfCoWoNijXvfh1YpMO_N3RNaUOlbdl9MDdA0SXsbEwrUyg&oe=660FB9FD",
  },
  {
    name: "Chennei Super Kings",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/299790619_5849673358384344_1277902966570664477_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GPs7ukgvkwsAX9WYI8H&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBrCWY2Fiyp-XbVFMk5Hx_bGUGQcVWFd_xwzhyyoEsvWQ&oe=660FB749",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434344188_931979708930846_8590113214515853206_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OCYDEr96F_8AX87ZMM6&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBOB9lpvFXcSSEs-qFpiT-15LxOJ0DD6ARWRMXVh9xIzA&oe=660FB626",
  },
  {
    name: "Jaddu Bhai",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434663257_384601581026473_7517045139851630579_n.jpg?stp=dst-jpg_s640x640&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xYEYclh5l_cAX-j900z&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfAXmgiUcGCotqqHd7eEDBI6yY9zOBzjBjX0hf0k5TG1Iw&oe=660FC066",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434663257_384601581026473_7517045139851630579_n.jpg?stp=dst-jpg_s640x640&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xYEYclh5l_cAX-j900z&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfAXmgiUcGCotqqHd7eEDBI6yY9zOBzjBjX0hf0k5TG1Iw&oe=660FC066",
  },
  {
    name: "Kajal Agrawal",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/433920192_399177969530426_6794144001691694409_n.jpg?stp=dst-jpg_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LnVtUIzgsvoAX_6P8Rv&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBZwkx6R_riVmCcpYs3BsPYzf2DUBYoM1OFtf4AU01ueQ&oe=660FC359",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434262164_396311206483769_6433856436989229396_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=W9mEG24lizoAX81VlwZ&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfAlsilTNIQcJH2TgviFSV_bjyn1tQtUjzvswahHmWWeDw&oe=660FB8A8",
  },
  {
    name: "Rani Sahu",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434130837_122150672894087234_4884632588092441523_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZZNp5_UPrU4AX_DbOKe&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfA9Bs53BPgKLFZLmfqXgmuum3Bhxy_clrJNcrQdeFr07w&oe=660FAF68",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434130837_122150672894087234_4884632588092441523_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZZNp5_UPrU4AX_DbOKe&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfA9Bs53BPgKLFZLmfqXgmuum3Bhxy_clrJNcrQdeFr07w&oe=660FAF68",
  },
  {
    name: "Chennei Super Kings",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/299790619_5849673358384344_1277902966570664477_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GPs7ukgvkwsAX9WYI8H&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBrCWY2Fiyp-XbVFMk5Hx_bGUGQcVWFd_xwzhyyoEsvWQ&oe=660FB749",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/435071635_832208145617638_9049054848230103734_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mT9kjoBpdJQAX-XsOqb&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBzRb0Azmod-G2PKGCMSIZEWAd8hIRw1QZ-9KfbCx440w&oe=660FA750",
  },
  {
    name: "Civil Services",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/335905005_5847443412019638_3918572050735468371_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9cvRDo_AgkwAX_UeRh2&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBty0Sm3gDUXjY44efQLXdME98TDndfZ5pFNG8OsRmzDQ&oe=660FC58A",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434330707_831375142344869_8017511185016565908_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WygHdQx6fhcAX_CzqRn&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfA-oNrMDCiaT4dKyeNIhCBhfhL-S7ZMyyEc9iJpUWw3CA&oe=660FB6BB",
  },
  {
    name: "Aditi Dalai",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/399911157_122097655736109552_4555033231246871421_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0BbGSX2b8E8AX_wvPhL&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfCp0iFccCjx-IIdgJ4v1exmjqBbBD9tWEfevbQIRwy9yw&oe=660FB5F5",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/432987534_122134609754109552_2062388061950239427_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=T-JdE8ggvgcAX_jQURT&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfASsxfcuFpiM-ckpxBZuiABT8qMEUNI0hy4UZeZd0Vnsw&oe=660F928D",
  },
  {
    name: "Express Cabin",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434288266_387953307336506_7806395588577825287_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=w80CqAp051IAX-Np1YZ&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfAF2xJfYJ3iNT-9LfKOoRsXsYM7JON7caNUz773rsHnQA&oe=660FBCA3",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/434288266_387953307336506_7806395588577825287_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=w80CqAp051IAX-Np1YZ&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfAF2xJfYJ3iNT-9LfKOoRsXsYM7JON7caNUz773rsHnQA&oe=660FBCA3",
  },
  {
    name: "Crush R",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/427996996_298313669928803_2734142542467006375_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YcBCMNjZcRgAX908HHP&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfA8Ldo2aY7E-ItRLXlUaP1uyLSaJq-eaCKRw6UqOor1Pg&oe=660FC6F9",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/433258864_320818574344979_63343510656846640_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=iP9Fz-XnLuoAX_0exz_&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBm47fLQKAhQLNhuVlxZPWJ7xc-9CGqjyn8GHBfRDCOxw&oe=660FAAD4",
  },
  {
    name: "Sallu Bhai",
    profileImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-1/253889377_265850802248370_6717121460274645936_n.jpg?stp=c57.0.200.200a_dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9u2aDDKreZkAX_SDp0H&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfBUqGDkm6UjVDtXftFI0PnYsOeViW3ad_qO6S7ta5IeQA&oe=660FC5F6",
    postImage: "https://scontent.fbbi3-1.fna.fbcdn.net/v/t39.30808-6/429775812_818226930344085_4221658536480540557_n.jpg?stp=dst-jpg_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zvZJqxk2_JMAX-XYE8S&_nc_ht=scontent.fbbi3-1.fna&oh=00_AfCXn5fsW74EGd0Eq7cwSmwWLzCbxvU6QeI3R3ueUaY1Sw&oe=660F982A",
  },
  // Add more items here...
];

const FeedCard = ({ name, profileImage, postImage }: FeedItem) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}  boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"} width={"50%"}>
      <Flex p={4}>
        <Image src={profileImage} alt={name} boxSize="50px" borderRadius="full" mr={2} />
        <Box>
          <Box fontWeight="bold">{name}</Box>
          <Text>{name}</Text>
         
        </Box>
      </Flex>
     
      <Image src={postImage} alt="Post Image" width={"100%"} maxHeight={"600px"}/>
      <Flex p={2} justifyContent="space-around">
      <IconButton
          aria-label="Like"
          icon={<BiLike color={isLiked ? "blue.500" : "gray.500"} />}
          onClick={() => setIsLiked(!isLiked)}
        />
        <IconButton aria-label="Comment" icon={<VscComment />} />
        <IconButton aria-label="Share" icon={<PiShareFatThin />} />
      </Flex>
    </Box>
  );
};

const Feed = () => {
  return (
    <>
   
        <Center display={"flex"} flexDir={"column"} >
      {items.map((item, index) => (
        <FeedCard key={index} {...item} />
      ))}
    </Center>
    </> 
  );
};

export default Feed;
