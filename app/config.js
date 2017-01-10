const defaults = {
  PORT: 3000,
  GOOGLE_MAPS_KEY: '',
};

export function fromEnv(attribute) {
  return process.env[attribute] || defaults[attribute];
}