const User = require("../models/user");



async function getFriends(req, res) {
    const user_id = req.session.user_id
    console.log(user_id+" IN HOME ")

    try {
        // Find the user by their ID and populate their friends' details
        const user_db = await User.findOne({ user_name: user_id }).populate('friends');
        console.log("freinds are")
        console.log(user_db.friends)

       

        // Return the friends' list
        res.status(200).json({
            success: true,
            friends: user_db.friends
        });
    } 
    catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ error: 'An error occurred while fetching friends' });
    }
}
async function addFriend(req, res) {
    const  user_id = req.body.user_id
    const friend_id  = req.body.friend_id

    // get friend name
   


    console.log(" ADDING FRIENDS ")

    try {
        // Find the user by their ID and populate their friends' details
        const user = await User.findOne({ user_name: user_id }).populate('friends'); 
        const freind_user = await User.findOne({ user_name: friend_id }).populate('friends'); 

       let friend_data={
            id:friend_id,
            name:freind_user.user_name
        }

        let user_data={
            id:user_id,
            name:user.user_name
        }

        user.friends.push(friend_data);
        freind_user.friends.push(user_data);

        await user.save().then(()=>{
            console.log(friend_id+" friend added")
        });

        await freind_user.save().then(()=>{
            console.log(user_id+" friend added")
        });

        const user_upd = await User.findOne({ user_name: user_id }).populate('friends'); 




       

        // Return the friends' list
        res.status(200).json({
            success: true,
            friends: user_upd.friends
        });
    } 
    catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ error: 'An error occurred while fetching friends' });
    }
}

async function sendMessage(req, res) {

    const  user_id = req.body.user_id
    const friend_id  = req.body.friend_id
    const message=req.body.message

    console.log(user_id+ friend_id + message)

    // io.on("connection", (socket) => {
    //     console.log(`User Connected: ${socket.id}`);
      
    //     // socket.on("join_room", (data) => {
    //     //   socket.join(data);
    //     // });
      
    //     socket.on("send_message", (data) => {
    //       socket.to(data.friend_id).emit("receive_message", message);
    //     });
    //   });
      
     



    res.status(200).json({
        success: true,
        "message": "message sent ..."
    });


}


 

module.exports = {
    getFriends,addFriend,sendMessage
  
};