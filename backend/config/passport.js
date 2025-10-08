import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/ModelUser.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const API_URL = process.env.API_URL || "http://localhost:7000";
const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

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
          user.authProvider = 'google';
          user.oauthId = profile.id;
          await user.save();
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });

        return done(null, { user, token });
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

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
