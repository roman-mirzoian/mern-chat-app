import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // SOCKET IO functionality will go here

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log(`Error in sendMessage controller: ${error}`);
        
        res.status(500).json({ error: "Internal Server error." });
    }
}; 

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        
        if(!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.log(`Error in getMessage controller: ${error}`);
        
        res.status(500).json({ error: "Internal Server error." });
    }
};