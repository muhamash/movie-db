const mongoose = require("mongoose");

const whiteListSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        movieIds: {
            type: [ String ],
            default: [],
        },
    }
);

export const whiteListModel = mongoose?.models?.whiteLists ?? mongoose.model( "whiteLists", whiteListSchema );