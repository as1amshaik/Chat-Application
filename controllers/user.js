const User = require("../models/user");

async function handleUserSignup(req, res) {
  
  console.log(req.body)
  const {  userName, password } = req.body;
   let name = userName
  let user_name=userName

  console.log(user_name)


  await User.create({
    
    name: name,
      user_name: user_name,
      password: password,
      friends: []
  }).then(
    (user) =>{ 
      console.log(' sign up sucess')
      return res.send(true)
      
}).catch(err => {console.error(' signup error:', err)
res.send(false)
});





  // user_db.friends.push(user_name); // to add self as freind 
  //  user_db.save().then(()=>{
  //   console.log(user_name+" self friend added")})

  

}

async function handleUserLogin(req, res) {


  console.log(req.body)
  const { userName, password } = req.body.formData;
  let user_name=userName
  // const user = await User.findOne({ user_name, password }).then(
  //   (u)=>{
  //     console.log("LOGIN ..|.. ");
  //     console.log(user_name);
  //     user_name_session=user_name
  //     console.log(" redirecting to home")

  //     req.session.user_id =  user_name_session;

    //  res.redirect("/home")})

    const user = await User.findOne({ user_name, password });
if (user) {
  console.log("LOGIN ..|.. ");
  console.log(user_name);
  const user_name_session = user_name; // Store the username in the session

  // console.log("Redirecting to home");
  // req.session.user_id = user_name_session; // Store user_id in session

  // res.redirect("/home"); // Redirect to the home page

  try {
    // Find the user by their ID and populate their friends' details
    const user_db = await User.findOne({ user_name: user_name }).populate('friends');
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
} else {
  console.log("Invalid credentials"); // Log if credentials are incorrect
  res.status(401).json({ success: false, message: 'Invalid username or password' }); // Return a response to the client with false
}





    }

module.exports = {
  handleUserSignup,
  handleUserLogin,
};