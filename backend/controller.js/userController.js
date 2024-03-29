const User = require("../Models/userModel");

const getUserforSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id; // to avoid same user in sidebar
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("error in getuserforsidebar", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
module.exports = { getUserforSideBar };
