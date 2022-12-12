const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    nom: String,
    prenom: String,
    address: { 
        type: String,
        required: false
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      match:
        /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    password: { type: "string", required: false },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  }, { timestamps: true })
);

module.exports = User;