const router = require("express").Router();

/**********************************************************************/
/**********************************************************************/


/* HOME */
// GET 
router.get("/", (req, res, next) => {
  res.render("index", { userInSession: req.session.currentUser });
});

/**********************************************************************/




module.exports = router;
