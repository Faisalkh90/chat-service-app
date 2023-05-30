import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//hash password before saving it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  /*
    -generate random salt to hash password
    - 10 is the number of rounds to generate the salt => 2^10 = 1024 rounds of hashing the password
   */
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// attach methods to user mode
// compare users hashed passwords
userSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
