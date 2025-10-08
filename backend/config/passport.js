import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/ModelUser.js';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL || "http://localhost:7000";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${API_URL}/api/users/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("Google profile didn't return email"), null);

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            username: profile.displayName || email.split('@')[0],
            email,
            userType: 'customer',
            authProvider: 'google',
            oauthId: profile.id,
          });
          await user.save();
        } else {
          // update provider info if needed
          user.authProvider = 'google';
          user.oauthId = profile.id;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${API_URL}/api/users/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("Facebook profile didn't return email"), null);

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            username: profile.displayName || email.split('@')[0],
            email,
            userType: 'customer',
            authProvider: 'facebook',
            oauthId: profile.id,
          });
          await user.save();
        } else {
          user.authProvider = 'facebook';
          user.oauthId = profile.id;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// no serialize/deserialize needed because we are not using sessions here (session: false)
export default passport;
