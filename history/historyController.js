const express = require("express");
const router = express.Router();
const jwtDecode=require('jwt-decode');
const jwt=require('express-jwt');

let History = require("./History");

const attachUser=(req,res,next)=>{
  const token=req.headers.authorization;
  if(!token){
    return res.status(401)
    .json({message:'Authentication invalid'});
  }

  const decodedToken=jwtDecode(token.slice(7));

  if(!decodedToken){
    return res.status(401)
    .json({message:'There was a problem authorizing'});
  }
  else{
    req.user=decodedToken;
    next();
  }
}

router.use(attachUser);

const checkJwt=jwt({
  secret:process.env.JWT_SECRET,
  algorithms:['HS256'],
  issuer:'api.live-weather',
  audience:'api.live-weather'
});

router.use(checkJwt);

router.get("/", (req, res) => {
  const {sub}=req.user;
  History.find({user:sub})
    .sort({createdAt:-1})
    .limit(7)
    .exec((err,histories)=>{
      if(err){
        return res.status(400).json(err)
      }else{
        res.status(200).json(histories);
      }
    })
});

router.post("/", (req, res) => {
  const {sub}=req.user;
  const historyDto=Object.assign({},req.body,{user:sub})
  const history=new History(historyDto)
  const savedHistory = history.save()
    .then(savedHistory=>{
      res.status(200).json({message:"History saved"});
    })
    .catch(err=>{
      console.log(err)
      res.status(400).json({message:"Error saving history"})
    })
});

module.exports = router;
