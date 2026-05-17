export function getRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing ${name} env var`)
  }

  return value
}

export const DEPLOY_REQUIRED_ENV_VARS = [
  'AUTH_SECRET',
  'MONGODB_URI',
  'MAIL',
  'MAIL_APP_PASSWORD',
  'MAIL_TO',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
] as const
