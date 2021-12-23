import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    isFav: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contacts = mongoose.model("Contacts", contactSchema);

export default Contacts;
