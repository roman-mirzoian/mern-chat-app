import {useAuthContext} from '../../context/AuthContext'
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromCurrentUser = message.senderId === authUser._id;
	const profilePic = fromCurrentUser ? authUser.profilePicture : selectedConversation.profilePicture;
	const bubbleBgColor = fromCurrentUser ? 'bg-blue-500' : "";

	return (
		<div className={`chat ${fromCurrentUser ? "chat-end" : "chat-start" } `}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>

			<div className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{extractTime(message.createdAt)}</div>
		</div>
	);
};
export default Message;