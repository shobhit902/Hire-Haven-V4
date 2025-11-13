import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const createOrGetChat = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID is required" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    })
      .populate("participants", "_id fullName email profilePic");

    // Create new chat if not exists
    if (!chat) {
      chat = await Chat.create({ participants: [senderId, receiverId] });
      chat = await chat.populate("participants", "_id fullName email profilePic");
    }

    // ✅ Identify the receiver user object
    const receiverUser = chat.participants.find(
      (p) => String(p._id) === String(receiverId)
    );

    res.status(200).json({
      success: true,
      chat,
      receiverUser, // send this for frontend convenience
    });
  } catch (error) {
    console.error("Error in createOrGetChat:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
