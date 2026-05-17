import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const connectDatabase = vi.fn()
const findById = vi.fn()
const findOneAndUpdate = vi.fn()
const sendMail = vi.fn()
const uploadToCloudinary = vi.fn()

vi.mock('@/lib/mongodb', () => ({
  connectDatabase,
}))

vi.mock('@/models/Profile', () => ({
  PROFILE_DOCUMENT_ID: 'portfolio-profile',
  ProfileModel: {
    findById,
    findOneAndUpdate,
  },
}))

vi.mock('@/lib/mailer', () => ({
  sendMail,
}))

vi.mock('@/lib/cloudinary', () => ({
  uploadToCloudinary,
}))

function makeRequest(path: string, init?: ConstructorParameters<typeof NextRequest>[1]) {
  return new NextRequest(`http://localhost${path}`, init)
}

async function readJson(response: Response) {
  return (await response.json()) as Record<string, unknown>
}

describe('App Router API routes', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    process.env.AUTH_SECRET = 'test-secret'
    process.env.MAIL_TO = 'owner@example.com'
  })

  afterEach(() => {
    delete process.env.AUTH_SECRET
    delete process.env.MAIL_TO
  })

  it('returns the public profile from GET /api/profile', async () => {
    findById.mockReturnValue({
      lean: vi.fn().mockResolvedValue({
        _id: 'portfolio-profile',
        fullName: 'Anh Khoa',
        username: 'akhoa',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    })

    const { GET } = await import('@/app/api/profile/route')
    const response = await GET()
    const data = await readJson(response)

    expect(response.status).toBe(200)
    expect(connectDatabase).toHaveBeenCalled()
    expect(data.profile).toMatchObject({
      fullName: 'Anh Khoa',
      username: 'akhoa',
    })
  })

  it('rejects unauthorized POST /api/profile requests', async () => {
    const { POST } = await import('@/app/api/profile/route')
    const response = await POST(
      makeRequest('/api/profile', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ fullName: 'Nope' }),
      })
    )
    const data = await readJson(response)

    expect(response.status).toBe(401)
    expect(data.error).toBe('Unauthorized')
  })

  it('validates the contact form payload', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: '',
          firstname: 'Anh',
          lastname: '',
          subject: 'Hello',
          message: '',
        }),
      })
    )
    const data = await readJson(response)

    expect(response.status).toBe(400)
    expect(data.error).toBe('Please complete all contact form fields.')
  })

  it('sets the OTP cookie when requesting a login code', async () => {
    const { POST } = await import('@/app/api/auth/request-code/route')
    const response = await POST()

    expect(response.status).toBe(200)
    expect(sendMail).toHaveBeenCalledOnce()
    expect(response.headers.get('set-cookie')).toContain('portfolio_otp=')
  })

  it('verifies a valid OTP code and sets the auth cookie', async () => {
    const { hashOtp } = await import('@/lib/auth')
    const otpCookie = encodeURIComponent(
      JSON.stringify({
        hash: hashOtp('123456'),
        exp: Date.now() + 60_000,
      })
    )

    const { POST } = await import('@/app/api/auth/verify-code/route')
    const response = await POST(
      makeRequest('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          cookie: `portfolio_otp=${otpCookie}`,
        },
        body: JSON.stringify({ code: '123456' }),
      })
    )
    const data = await readJson(response)

    expect(response.status).toBe(200)
    expect(data.ok).toBe(true)
    expect(response.headers.get('set-cookie')).toContain('portfolio_auth=')
  })

  it('rejects unauthenticated uploads', async () => {
    const { POST } = await import('@/app/api/upload/route')
    const response = await POST(
      makeRequest('/api/upload', {
        method: 'POST',
        body: new FormData(),
      })
    )
    const data = await readJson(response)

    expect(response.status).toBe(401)
    expect(data.error).toBe('Unauthorized')
  })

  it('validates upload kind before talking to Cloudinary', async () => {
    const { makeAuthToken } = await import('@/lib/auth')
    const authToken = makeAuthToken(Date.now() + 60_000)
    const formData = new FormData()
    formData.set('kind', 'invalid')
    formData.set('file', new File(['hello'], 'hello.txt', { type: 'text/plain' }))

    const { POST } = await import('@/app/api/upload/route')
    const response = await POST(
      makeRequest('/api/upload', {
        method: 'POST',
        headers: {
          cookie: `portfolio_auth=${authToken}`,
        },
        body: formData,
      })
    )
    const data = await readJson(response)

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid or missing kind (avatar | background | cv | project)')
    expect(uploadToCloudinary).not.toHaveBeenCalled()
  })
})
