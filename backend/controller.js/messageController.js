const Message = require("../Models/messageModel");
const ConversationModel = require("../Models/conversationModel");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //socket.io will be implemente here

    // await conversation.save(); // Save the updated conversation
    // await newMessage.save();

    //this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {

    try {
    const {id : userToChatId} = req.params;
    const senderId = req.user._id

    const conversation = await ConversationModel.findOne({ 
        participants:{$all :[senderId,userToChatId]} 
    }).populate("messages")
    if (!conversation) {
      return res.status(404).json({msg:"No Conversation Found!"})
    }

    const messages = conversation.messages
    console.log(messages);  
    res.status(200).json(messages)

    } catch (error) {
        console.log("error in getMessages controller:", error.message);
        return res.status(400).send({msg:"Bad Request"})
    }
    


}

module.exports = { sendMessage ,getMessages };
