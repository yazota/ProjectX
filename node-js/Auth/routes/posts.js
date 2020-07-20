const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {

   res.send(req.user);
   User.findbyOne({_Id: req.user})
  
   /*
    res.json({
        posts: {
             title: 'my first post',
             description: 'ransom data hahah'
            }
        });
*/
});

module.exports = router;