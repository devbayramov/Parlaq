// OTP verification service using Plunk email API
const PLUNK_API_URL = 'https://api.useplunk.com/v1/track';
const PLUNK_API_KEY = 'sk_25e5f4bc0af36e85f38ca93b8e74b0030104204c5e80a677';

// In-memory storage for OTPs (in production, use a backend DB)
const otpStore = new Map<string, { code: string; timestamp: number; attempts: number }>();

// Generate a random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP to email via Plunk
export async function sendOTPToEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const otp = generateOTP();
    
    // Store OTP with timestamp (valid for 10 minutes)
    otpStore.set(email, {
      code: otp,
      timestamp: Date.now(),
      attempts: 0,
    });

    // Send OTP via Plunk email service
    const response = await fetch(PLUNK_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        event: 'email-otp-verification',
        email: email,
        data: {
          otp: otp,
          expiresIn: '10 minutes',
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PLUNK_API_KEY}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.',
      };
    }

    return {
      success: true,
      message: `OTP sent to ${email}. Check your email for the code.`,
    };
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: 'Network error. Please check your internet connection.',
    };
  }
}

// Verify OTP code
export function verifyOTP(email: string, otpCode: string): { valid: boolean; message: string } {
  const storedOTP = otpStore.get(email);

  if (!storedOTP) {
    return {
      valid: false,
      message: 'No OTP request found for this email. Please request a new OTP.',
    };
  }

  // Check if OTP has expired (10 minutes = 600000 ms)
  if (Date.now() - storedOTP.timestamp > 600000) {
    otpStore.delete(email);
    return {
      valid: false,
      message: 'OTP has expired. Please request a new OTP.',
    };
  }

  // Check attempts (max 5)
  if (storedOTP.attempts >= 5) {
    otpStore.delete(email);
    return {
      valid: false,
      message: 'Too many failed attempts. Please request a new OTP.',
    };
  }

  // Verify the code
  if (storedOTP.code === otpCode) {
    otpStore.delete(email);
    return {
      valid: true,
      message: 'Email verified successfully.',
    };
  }

  // Increment failed attempts
  storedOTP.attempts += 1;
  return {
    valid: false,
    message: `Invalid OTP. Attempts remaining: ${5 - storedOTP.attempts}`,
  };
}

// Clear OTP for an email
export function clearOTP(email: string): void {
  otpStore.delete(email);
}
