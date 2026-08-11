import { UserProfile } from '../types';
import { INITIAL_USER_PREFERENCES } from '../data/mockData';

export interface AuthUser extends UserProfile {
  token?: string;
}

export interface CountryCode {
  code: string;
  country: string;
  flag: string;
  digits: number;
}

export class CountryCodes {
  static list: CountryCode[] = [
    { code: '+91', country: 'India', flag: '🇮🇳', digits: 10 },
    { code: '+1', country: 'United States', flag: '🇺🇸', digits: 10 },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧', digits: 10 },
    { code: '+971', country: 'UAE', flag: '🇦🇪', digits: 9 },
    { code: '+49', country: 'Germany', flag: '🇩🇪', digits: 11 },
    { code: '+81', country: 'Japan', flag: '🇯🇵', digits: 10 },
    { code: '+61', country: 'Australia', flag: '🇦🇺', digits: 9 },
    { code: '+65', country: 'Singapore', flag: '🇸🇬', digits: 8 }
  ];
}

// Simulated delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Send OTP to phone
  async sendPhoneOTP(countryCode: string, phoneNumber: string): Promise<{ success: boolean; message: string; mockOTP?: string }> {
    await delay(1000);
    if (!phoneNumber || phoneNumber.length < 7) {
      throw new Error('Please enter a valid mobile number');
    }
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[AUTH SERVICE] Simulated SMS sent to ${countryCode}${phoneNumber} with OTP: ${generatedOTP}`);
    return {
      success: true,
      message: `OTP sent successfully to ${countryCode} ${phoneNumber}`,
      mockOTP: generatedOTP // provided for test preview convenience
    };
  },

  // Verify Phone OTP
  async verifyPhoneOTP(countryCode: string, phoneNumber: string, otp: string): Promise<AuthUser> {
    await delay(1200);
    if (!otp || otp.length < 6) {
      throw new Error('Please enter the 6-digit verification code');
    }
    
    return {
      id: `usr-ph-${Date.now()}`,
      name: `User ${phoneNumber.slice(-4)}`,
      email: `user.${phoneNumber.slice(-4)}@stylesmart.ai`,
      phone: `${countryCode} ${phoneNumber}`,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      role: 'customer',
      preferences: {
        ...INITIAL_USER_PREFERENCES,
        sizePreferences: { tops: 'L', bottoms: '32', shoes: 'UK 9' }
      },
      styleScore: 85,
      styleArchetype: 'Futuristic Streetwear',
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          name: `User ${phoneNumber.slice(-4)}`,
          phone: `${countryCode} ${phoneNumber}`,
          street: '123 Fashion Street, Cyber City',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          type: 'Home',
          isDefault: true
        }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      token: `jwt-tok-${Math.random().toString(36).substring(2)}`
    };
  },

  // Email + Password Login
  async loginWithEmail(email: string, pass: string): Promise<AuthUser> {
    await delay(1000);
    if (!email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }
    if (pass.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const formattedName = email.split('@')[0].replace(/[\._]/g, ' ');
    const capitalizedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

    return {
      id: `usr-em-${Date.now()}`,
      name: capitalizedName,
      email,
      phone: '+91 9876543210',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      role: 'customer',
      preferences: {
        ...INITIAL_USER_PREFERENCES,
        sizePreferences: { tops: 'M', bottoms: '32', shoes: 'UK 9' }
      },
      styleScore: 88,
      styleArchetype: 'Smart Minimalist',
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          name: capitalizedName,
          phone: '+91 9876543210',
          street: '456 Design Avenue, Tech Park',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
          type: 'Home',
          isDefault: true
        }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      token: `jwt-tok-${Math.random().toString(36).substring(2)}`
    };
  },

  // Full User Registration with details
  async registerUser(data: {
    fullName: string;
    email: string;
    countryCode: string;
    phone: string;
    pass: string;
    otp: string;
  }): Promise<AuthUser> {
    await delay(1200);
    if (!data.fullName.trim()) throw new Error('Full Name is required');
    if (!data.email.includes('@')) throw new Error('Valid email address is required');
    if (data.pass.length < 8) throw new Error('Password must be at least 8 characters');
    if (data.otp.length < 6) throw new Error('Please enter the 6-digit phone verification OTP');

    return {
      id: `usr-reg-${Date.now()}`,
      name: data.fullName,
      email: data.email,
      phone: `${data.countryCode} ${data.phone}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      role: 'customer',
      preferences: {
        ...INITIAL_USER_PREFERENCES,
        sizePreferences: { tops: 'L', bottoms: '32', shoes: 'UK 9' }
      },
      styleScore: 90,
      styleArchetype: 'Contemporary Urban',
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          name: data.fullName,
          phone: `${data.countryCode} ${data.phone}`,
          street: '789 Boulevard View',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          type: 'Home',
          isDefault: true
        }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      token: `jwt-tok-${Math.random().toString(36).substring(2)}`
    };
  },

  // Password Reset Request
  async requestPasswordReset(identifier: string): Promise<string> {
    await delay(1000);
    if (!identifier) throw new Error('Please enter your email address or registered mobile number');
    return `Password reset verification link and OTP sent to ${identifier}`;
  },

  // Reset Password Confirmation
  async resetPassword(identifier: string, otp: string, newPass: string): Promise<boolean> {
    await delay(1000);
    if (otp.length < 6) throw new Error('Invalid verification OTP code');
    if (newPass.length < 8) throw new Error('New password must be at least 8 characters long');
    return true;
  }
};
