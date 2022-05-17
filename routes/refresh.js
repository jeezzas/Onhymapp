
router.post("/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
    //find the correspondant Admin of the token
    const admin = Admin.findById(req.body.id,  (err, docs)=> {
      if (err){
          console.log(err);
      }
      else{
          console.log("Result : ", docs);
      }
  });
  
  //Checking if the token passed in the req.body is in the database
  const oldToken = RefreshToken.findOne({token : refreshToken}, (err, docs)=> {
    if (err){
        console.log(err);
    }
    else{
        console.log("Token is found : ", docs);
    }
  });
  
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if(!oldToken){
      return res.status(403).json("Refresh token is not valid!");
    }
   
  
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
      err && console.log(err);
      user = admin;
      //creating a new accessToken  (there s a problem here , the admin id isnt passed with the token !!!!! )
      const newAccessToken = generateLoginToken(admin);
  
      //Replace the Old token passed in the body.req by the new created token "newAccessToken"
      oldToken.replaceOne({token: refreshToken},{ token : newAccessToken},(err, result)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Replace One' , result);
        }});
      
        //return the accessToken 
  
      res.status(200).json({
        accessToken: newAccessToken
      });
    });
  
    //if everything is ok, create new access token, refresh token and send to user
  });
  