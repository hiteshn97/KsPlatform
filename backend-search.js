import express from 'express';
import Post from 'models/posts';

const router = express.Router();

router.get('/', async (req, res) => {
  // console.log(mailOptions);
  /* smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         } */

  try {
    const posts = await Post.fetch({ searchString: req.query.term });
    res.send(posts);
  } catch (e) {
    throw e;
  }
});


export default router;
