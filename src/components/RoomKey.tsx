import copyImg from '../assets/images/copy.svg'

import '../styles/room-key.scss'

type Props = {
  code: string;
}

export function RoomKey(props: Props) {
  
  function handleCopyRoomKey() {
    navigator.clipboard.writeText(props.code)
  }
  
  return (
    <button className="room-key" onClick={handleCopyRoomKey}>
      <div>
        <img src={copyImg} alt="Copy room key" />
      </div>
      <span>#{props.code}</span>
    </button>
  )
}