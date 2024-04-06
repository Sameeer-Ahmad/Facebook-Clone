import React, { useState } from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';



interface CardProps {
  imageSrc: string;
  name: string;
  onButtonClick: () => void;
}




const Card: React.FC<CardProps> = ({ imageSrc, name, onButtonClick }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [requestPending, setRequestPending] = useState<boolean>(false);

  const handleAddFriendClick = () => {
    setVisible(true);
    setRequestPending(true);
  };

  const handleCancelClick = () => {
    setVisible(false);
    setRequestPending(false);
  };

  return (

    <Box
      boxShadow={["none","rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"]}
      borderRadius="lg"
      overflow="hidden"
      background="white"
      display={"flex"}
      flexDir={["row","column"]}
      alignItems={"center"}
      pl={[2,0,0]}
    >
      
      <Image height={["60px","130px","220px"]}  width={["60px","150px","250px"]} src={imageSrc} alt={name} borderRadius={["50%","md","lg"]}  />
      <Box p="6">
      <Text textAlign={["start","center"]} fontWeight="bold" fontSize="lg" mb={2}>
          {name}
        </Text>
        <Flex flexDir={["row","column","column"]} gap={"5px"} flexWrap={"wrap"}>
          {visible ? (
            <Text>Request sent</Text>
          ) : (
            <Button onClick={handleAddFriendClick} background={"rgb(235,245,255)"} color={"rgb(18,111,213)"}>
              Add friend
            </Button>
          )}
          {requestPending ? (
            <Button onClick={handleCancelClick} background={"rgb(235,245,255)"} color={"rgb(18,111,213)"}>
              Cancel
            </Button>
          ) : (
            <Button background={"rgb(228,230,235)"} color={"black"}>
              Remove
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
const cardDataArray: { imageSrc: string; name: string }[] = [
  { imageSrc: 'https://img.freepik.com/free-photo/portrait-handsome-young-man_158595-264.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Amlan Routh' },
  { imageSrc: 'https://img.freepik.com/free-photo/young-model-casual-fall-winter-outfits_114579-17538.jpg?w=740&t=st=1711835798~exp=1711836398~hmac=d4a53625196d4fc163e2626bd43651b1f6dfd167ffd961ab81a34b8d30f2af6d', name: 'John Doy' },
  { imageSrc: 'https://img.freepik.com/free-photo/portrait-young-handsome-man_1303-9778.jpg?w=1380&t=st=1711835858~exp=1711836458~hmac=95d207e67f0318ace157cdcea65b9337b0b25eb01674cd0fad530814faeeefd9', name: 'Sameer' },
  { imageSrc: 'https://img.freepik.com/premium-photo/portrait-young-elegant-man_103153-1409.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Tenkaru Badhei' },
  { imageSrc: 'https://img.freepik.com/premium-photo/portrait-handsome-man_186382-10866.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Nilamani Sahu' },
  { imageSrc: 'https://img.freepik.com/premium-photo/shot-young-man-with-his-arms-folded-standing-alone-city_762026-56484.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Gopal Badhei' },
  { imageSrc: 'https://img.freepik.com/premium-photo/male-models-pose-great-photoshoot-high-fashion-magazine-cover_563241-4413.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Alok Behera' },
  { imageSrc: 'https://img.freepik.com/premium-photo/portrait-handsome-young-man_1030147-21.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Chandan Ganda' },
  { imageSrc: 'https://img.freepik.com/premium-photo/handsome-boy_884653-12061.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Mantu Chhuria' },
  { imageSrc: 'https://img.freepik.com/premium-photo/man-wearing-trendy-high-quality-checked-double-pocket-shirt-fashion-photography_758367-107414.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Sudam Karna' },
  { imageSrc: 'https://img.freepik.com/free-photo/vertical-shot-handsome-male-with-black-coat-watch_181624-38993.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Balgopal Sahu' },
  { imageSrc: 'https://img.freepik.com/premium-photo/man-wearing-trendy-high-quality-checked-double-pocket-shirt-fashion-photography_758367-67076.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Hemant Kukur' },
  { imageSrc: 'https://img.freepik.com/premium-photo/man-wearing-trendy-high-quality-checked-double-pocket-shirt-fashion-photography_758367-67120.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Sachin Jhankar' },
  { imageSrc: 'https://img.freepik.com/premium-photo/man-with-success-fist-hand-gesture_839035-231642.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Santanu Padhan' },
  { imageSrc: 'https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-blue-shirt-clothes-fashion-man-posing-crossed-arms_158538-4980.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Amar Mahakur' },
  { imageSrc: 'https://img.freepik.com/premium-photo/smiling-young-man-mexican-descent-against-neutral-background_731930-133159.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=ais', name: 'Roshan Pradhan' },
  { imageSrc: 'https://img.freepik.com/free-photo/beautiful-girl-stands-park_8353-5084.jpg?t=st=1711836114~exp=1711839714~hmac=28e98d93349306ccceb6e3b2010ad431af77e02ccf1422c91288be8ce4c48de5&w=740', name: 'Dibya Pradhan' },
  { imageSrc: 'https://img.freepik.com/free-photo/smiling-brunette-woman-white-dress-poses-garden_1304-5443.jpg?t=st=1711836163~exp=1711839763~hmac=9ee56e6bed5d392515ffecd63b918e4fa1a9803ab387c7965d2911c217fe39c3&w=740', name: 'Monalisha Sethy' },
  { imageSrc: 'https://img.freepik.com/free-photo/female-model-with-white-t-shirt-posing_114579-14031.jpg?w=740', name: 'Puja Sarma' },
  { imageSrc: 'https://img.freepik.com/free-photo/portrait-smiling-beautiful-brunette-woman-cute-dress-red-lips-flowers-background-concept-professional-photossesion-modern-greenhouse_7502-8441.jpg?t=st=1711836252~exp=1711839852~hmac=fab896b4b3b5738e655ddab47eb866348b84ad61569111bfdc205f97cc85290b&w=740', name: 'Sonali Mahakur' },
  { imageSrc: 'https://img.freepik.com/premium-photo/indian-woman-wearing-red-saree-studio_175634-18416.jpg?w=740', name: 'Payal Deheri' },
  { imageSrc: 'https://img.freepik.com/premium-photo/thoughtful-young-woman-looking-away_1048944-14649731.jpg?w=740', name: 'Shruti sahu' },
  { imageSrc: 'https://img.freepik.com/free-photo/smiling-young-lady-designed-t-shirt-good-mood-dreaming-with-long-hair-white_140725-14615.jpg?t=st=1711836332~exp=1711839932~hmac=c60c1162c714395986b49e896be90a71e12ac41d6585934489b4f7a58db21adb&w=740', name: 'Anjali' },
  { imageSrc: 'https://images.pexels.com/photos/730055/pexels-photo-730055.jpeg?auto=compress&cs=tinysrgb&w=600', name: 'Punam Pandey' },
  { imageSrc: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600', name: 'Jannat Sagar' },
  
];

const AddFriends: React.FC = () => {
  
   
  const handleButtonClick = (cardName: string) => {
    console.log(cardName);
  };

  return (
    <>
    
   
    
    <Box display="grid" gridTemplateColumns={{ base: "1fr",sm:"repeat(3,1fr)" ,md: "repeat(4, 1fr)", lg: "repeat(6, 1fr)" }} gap="10px" mt={4} p={4}>
  {cardDataArray.map((card, index) => (
    <Card
      key={index}
      imageSrc={card.imageSrc}
      name={card.name}
      onButtonClick={() => handleButtonClick(card.name)}
    />
  ))}
</Box>
    </>
  );
};

export default AddFriends;

