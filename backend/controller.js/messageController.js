const Message = require('../Models/messageModel')
const Conversation = require('../Models/conversationModel')

const sendMessage = async (req,res)=> {
    try {
        const {message} = req.body
        const {id:receiverId}=req.params
        const senderId = req.user._id

        let Conversation = await Conversation.findOne({
            participants:{$all :[senderId,receiverId]}
        })

        if(!Conversation){
            Conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            Conversation.messages.push(newMessage._id)
        }
        res.status(201).json('message', newMessage)

    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        return res.status(401).send({msg:"Error Occured"})
    }

}    

module.exports = { sendMessage };
