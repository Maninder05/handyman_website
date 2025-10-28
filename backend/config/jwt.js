// Central helper to retrieve JWT secret consistently across the app
export function getJwtSecret() {
  // priority: JWT_SECRET, SEC_KEY, fallback to a dev-safe value
  return process.env.JWT_SECRET || process.env.SEC_KEY || "mysecret";
}

export default { getJwtSecret };
