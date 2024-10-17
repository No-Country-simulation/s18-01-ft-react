import { useParams } from 'react-router-dom';

const RoomName = () => {
  const { roomName } = useParams();

  const firstLetterToUpper = str => {
    const letter = str.split(' ');
    if (letter.length === 0) return '';
    return (
      letter[0].charAt(0).toUpperCase() +
      letter[0].slice(1) +
      ' ' +
      letter.slice(1).join(' ').toLowerCase()
    );
  };

  const formattedRoomName = firstLetterToUpper(roomName.replace(/-/g, ' '));

  return <h1 className="text-xl font-semibold">Sala: {formattedRoomName}</h1>;
};

export default RoomName;
