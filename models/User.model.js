const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required.'],
    unique: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required.']
  },
  favourites:  [{	
    type: Schema.Types.ObjectId,
		ref: "Card"
  }],

  decks:[{	
    type: Schema.Types.ObjectId,
		ref: "Card"
  }],

  sideboard:[{	
    type: Schema.Types.ObjectId,
		ref: "Card"
  }]

});

const User = model("User", userSchema);

module.exports = User;
