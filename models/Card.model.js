const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const cardSchema = new Schema(
  {
    name: String,
    image: String,
    mana_cost:  String,
    cmc: Number,
    type_line: String,
    oracle_text: String,
    power: String,
    toughness: String,
    apiId: String
  },
  {
    timestamps: true,
  }
);


module.exports = model("Card", cardSchema);
