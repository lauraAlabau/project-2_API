const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const Card = require("../models/Card.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const CardsApi = new Api()



/**********************************************************************/
/* SEARCH */
// GET
router.get('/search', (req, res) => {
    res.render('search-card.hbs', { userInSession: req.session.currentUser });
  });

router.post('/search', (req, res) => {
    console.log('Prueba')
    CardsApi
      .getCardSearch(req.body.q)
      .then((cardList) =>{
          //res.send(cardList.data.data)
        res.render('search-card', {cards: cardList.data.data, userInSession: req.session.currentUser})
      })
      .catch((error) => { console.log (error)})
})


/**********************************************************************/
/* ADD FAVOURITES */
router.post("/add-favorite", isLoggedIn ,(req, res) =>{
  const query = { name, image, mana_cost, cmc, type_line, oracle_text, power, toughness, apiId } = req.body
  const idToCheck = req.body.apiId;
  Card
    .find({apiId: idToCheck})
	  .then (charArray => {
		//comprobar si ese apiId ya esta en db cards
      if (charArray.length === 0) {
        Card
          .create(query)
          .then(result => {
             User
              .findByIdAndUpdate(req.user._id,{$push : {favourites : result._id}})
              .then(()=>{
                res.redirect("/userProfile")
              })
          })
          .catch(err => console.log(err))
      } else {
        User
          .findById(req.user._id)
          .then((user)=>{
            if (!user.favourites.includes(charArray[0]._id)){
              User
                .findByIdAndUpdate(req.user._id,{$push : {favourites : charArray[0]._id}})
                .then(()=>{
                  res.redirect("/search")
                })
            }else{res.redirect("/userProfile")}
          })
          .catch((err)=>{
            console.log(err)
          })        
		  }
	  }) 
})



router.post("/delete-favourite",isLoggedIn,(req,res)=>{
  const {id} = req.body
  User
    .findByIdAndUpdate(req.user._id,{$pull : {favourites : id}})
    .then(()=>{
      res.redirect("/userProfile")
  })
  .catch(err => console.log(err))
})

/**********************************************************************/
/* ADD DECK */
router.post("/add-deck", isLoggedIn ,(req, res) =>{
  const query2 = { name, image, mana_cost, cmc, type_line, oracle_text, power, toughness, apiId } = req.body
  const idToCheck2 = req.body.apiId;
 Card
    .find({apiId: idToCheck2})
    .then (cardArray => {
    //comprobar si ese apiId ya esta en db cards
      if (cardArray.length === 0) {
        Card
          .create(query2)
          .then(result => {
            User
              .findByIdAndUpdate(req.user._id,{$push : {decks : result._id}})
              .then(()=>{
                res.redirect("/userDeck")
              })
          })
            .catch(err => console.log(err))
      } else {
        User
          .findById(req.user._id)
          .then((user)=>{
            if (!user.decks.includes(cardArray[0]._id)){
              User
                .findByIdAndUpdate(req.user._id,{$push : {decks : cardArray[0]._id}})
                .then(()=>{
                  res.redirect("/search")
                })
            }else{res.redirect("/userDeck")}
          })
          .catch((err)=>{
            console.log(err)
          })        
      }
    }) 
})


router.post("/delete-card",isLoggedIn,(req,res)=>{
  const {id} = req.body
  User
    .findByIdAndUpdate(req.user._id,{$pull : {decks : id}})
    .then(()=>{
      res.redirect("/userDeck")
  })
  .catch(err => console.log(err))
})

/**********************************************************************/
/* ADD SIDEBOARD */
router.post("/add-sb", isLoggedIn ,(req, res) =>{
  const query3 = { name, image, mana_cost, cmc, type_line, oracle_text, power, toughness, apiId } = req.body
  const idToCheck3 = req.body.apiId;
 Card
    .find({apiId: idToCheck3})
    .then (sbArray => {
    //comprobar si ese apiId ya esta en db cards
      if (sbArray.length === 0) {
        Card
          .create(query3)
          .then(result2 => {
            User
              .findByIdAndUpdate(req.user._id,{$push : {sideboard : result2._id}})
              .then(()=>{
                res.redirect("/userDeck")
              })
          })
            .catch(err => console.log(err))
      } else {
        User
          .findById(req.user._id)
          .then((user)=>{
            if (!user.sideboard.includes(sbArray[0]._id)){
              User
                .findByIdAndUpdate(req.user._id,{$push : {sideboard : sbArray[0]._id}})
                .then(()=>{
                  res.redirect("/search")
                })
            }else{res.redirect("/userDeck")}
          })
          .catch((err)=>{
            console.log(err)
          })        
      }
    }) 
})


router.post("/delete-card-deck",isLoggedIn,(req,res)=>{
  const {id} = req.body
  User
    .findByIdAndUpdate(req.user._id,{$pull : {sideboard : id}})
    .then(()=>{
      res.redirect("/userDeck")
  })
  .catch(err => console.log(err))
})

/**********************************************************************/
/* EXPORT */
module.exports = router;