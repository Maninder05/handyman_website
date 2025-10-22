import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // optional for OAuth users
    userType: { type: String, enum: ["customer", "handyman"], required: true },
    authProvider: { type: String, default: "local" }, // local, google, facebook

    // --- session / OAuth ---
    sessionToken: { type: String },          // random token assigned at login/signup
    sessionExpiresAt: { type: Date },        // session expiry (sliding)
    oauthId: { type: String },               // provider ID (google/facebook)
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
