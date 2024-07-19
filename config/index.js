const { env } = process;

const config = {
  PORT: +env.PORT || 7000,
  jwtSecretKey: env.JWT_SECRET_KEY,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
};

module.exports = config;
