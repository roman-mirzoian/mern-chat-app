 import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

 const Messages = () => {
	const {loading, messages} = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();
	
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
	
 	return (
 		<div className='px-4 flex-1 overflow-auto'>
			{loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}

			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}

 			{!loading && messages.length > 0 &&
				messages.map((message) => (
					<div 
						key={message._id}
						ref={lastMessageRef}
						>
						<Message 
							message={message}
							/>
					</div>
				))
			}
 		</div>
 	);
 };
 export default Messages;