const User = require("../models/user");

async function handleUserSignup(req, res) {
  
  console.log(req.body)
  const { name, user_name, password } = req.body;
  console.log(user_name)


  await User.create({
    name,
    user_name,
    password,
  }).then(
    (user) =>{ 
      console.log(' sign up sucess')
      
})





  .catch(err => console.error(' signup error:', err));

  const user_db = await User.findOne({ user_name: user_name }).populate('friends');
  console.log(user_name+" self friend adding ")



  // user_db.friends.push(user_name); // to add self as freind 
  //  user_db.save().then(()=>{
  //   console.log(user_name+" self friend added")})

  

  return res.send("SIGN UP SUCESSFULL")
}

async function handleUserLogin(req, res) {
  console.log(req.body)
  const { user_name, password } = req.body;
  const user = await User.findOne({ user_name, password }).then(
    (u)=>{
      console.log("LOGIN ..|.. ");
      console.log(user_name);
      user_name_session=user_name
      console.log(" redirecting to home")

      req.session.user_id =  user_name_session;

     res.redirect("/home")})
    }

module.exports = {
  handleUserSignup,
  handleUserLogin,
};