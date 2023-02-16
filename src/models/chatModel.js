const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const chatSchema = new mongoose.Schema(
    {
        
        msg: {
            type: String,
            required: true,
            trim: true,
         },
        userId: {
            type: ObjectId,
            required: true,
            ref: "User",
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
