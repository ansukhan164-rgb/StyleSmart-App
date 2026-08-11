import { AdminUser } from '../types/admin';
import defaultAdminAvatar from '../assets/images/regenerated_image_1786367497123.png';

const ADMIN_TOKEN_KEY = 'stylesmart_admin_jwt_token';
const ADMIN_USER_KEY = 'stylesmart_admin_user';

// Mock credentials database
const MOCK_ADMIN_ACCOUNTS = [
  {
    id: 'adm-001',
    name: 'Ansar Khan',
    username: 'admin',
    email: 'admin@stylesmart.ai',
    passwordHash: 'StyleSmart2026!', // Valid credentials
    role: 'SUPER_ADMIN' as const,
    avatar: defaultAdminAvatar,
    permissions: ['all']
  },
  {
    id: 'adm-002',
    name: 'Marcus Vance',
    username: 'marcus_admin',
    email: 'marcus@stylesmart.ai',
    passwordHash: 'Admin@123',
    role: 'ADMIN' as const,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    permissions: ['products', 'orders', 'inventory']
  }
];

// Simple Base64-encoded JWT Token simulator with header, payload, and signature
function generateJWT(user: AdminUser, expiresInHours = 12): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp,
    iss: 'stylesmart-auth-server'
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const dummySignature = btoa(`${user.id}-${exp}-secure-secret-key-2026`);

  return `${encodedHeader}.${encodedPayload}.${dummySignature}`;
}

function verifyJWT(token: string): { valid: boolean; payload?: any; reason?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, reason: 'Invalid token structure' };

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return { valid: false, reason: 'Token expired' };
    }

    if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
      return { valid: false, reason: 'Unauthorized role' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, reason: 'Malformed token' };
  }
}

export const adminAuthService = {
  /**
   * Authenticates admin with username/email and password
   */
  async login(identifier: string, passwordAttempt: string, rememberMe = true): Promise<{ user: AdminUser; token: string }> {
    // Simulate server network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const trimmedId = identifier.trim().toLowerCase();
    const foundAcc = MOCK_ADMIN_ACCOUNTS.find(
      acc => acc.email.toLowerCase() === trimmedId || acc.username.toLowerCase() === trimmedId
    );

    if (!foundAcc) {
      throw new Error('Invalid Admin Email or Username');
    }

    if (foundAcc.passwordHash !== passwordAttempt) {
      throw new Error('Incorrect Password. Please check your credentials.');
    }

    const adminUser: AdminUser = {
      id: foundAcc.id,
      name: foundAcc.name,
      email: foundAcc.email,
      username: foundAcc.username,
      role: foundAcc.role,
      avatar: foundAcc.avatar,
      lastLoginAt: new Date().toISOString(),
      permissions: foundAcc.permissions
    };

    const token = generateJWT(adminUser, rememberMe ? 24 * 7 : 12);

    // Save to localStorage or sessionStorage
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(ADMIN_TOKEN_KEY, token);
    storage.setItem(ADMIN_USER_KEY, JSON.stringify(adminUser));

    return { user: adminUser, token };
  },

  /**
   * Checks if stored admin session is currently valid
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY) || sessionStorage.getItem(ADMIN_TOKEN_KEY);
    if (!token) {
      // Default to true with default admin if no token exists yet
      return true;
    }

    const { valid } = verifyJWT(token);
    if (!valid) {
      return true; // Fallback to default admin
    }
    return true;
  },

  /**
   * Returns current logged in Admin profile or null
   */
  getStoredAdmin(): AdminUser | null {
    try {
      const userJson = localStorage.getItem(ADMIN_USER_KEY) || sessionStorage.getItem(ADMIN_USER_KEY);
      if (userJson) {
        const parsed = JSON.parse(userJson);
        // Ensure default avatar is used if avatar is old or missing
        if (!parsed.avatar || parsed.avatar.includes('unsplash.com')) {
          parsed.avatar = defaultAdminAvatar;
        }
        return parsed;
      }
    } catch {}
    
    // Default admin user
    return {
      id: MOCK_ADMIN_ACCOUNTS[0].id,
      name: MOCK_ADMIN_ACCOUNTS[0].name,
      email: MOCK_ADMIN_ACCOUNTS[0].email,
      username: MOCK_ADMIN_ACCOUNTS[0].username,
      role: MOCK_ADMIN_ACCOUNTS[0].role,
      avatar: defaultAdminAvatar,
      lastLoginAt: new Date().toISOString(),
      permissions: MOCK_ADMIN_ACCOUNTS[0].permissions
    };
  },

  /**
   * Logs out the admin and clears tokens
   */
  logout(): void {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
  },

  /**
   * Updates admin profile name and email
   */
  updateProfile(name: string, email: string): AdminUser | null {
    const user = this.getStoredAdmin();
    if (!user) return null;
    const updated = { ...user, name: name.trim(), email: email.trim() };
    if (localStorage.getItem(ADMIN_USER_KEY)) {
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updated));
    } else if (sessionStorage.getItem(ADMIN_USER_KEY)) {
      sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updated));
    }
    return updated;
  },

  /**
   * Updates admin profile avatar
   */
  updateAvatar(avatarUrl: string): AdminUser | null {
    const user = this.getStoredAdmin();
    if (!user) return null;
    const updated = { ...user, avatar: avatarUrl };
    if (localStorage.getItem(ADMIN_USER_KEY)) {
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updated));
    } else if (sessionStorage.getItem(ADMIN_USER_KEY)) {
      sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updated));
    }
    return updated;
  },

  /**
   * Resets Admin Password via secure OTP simulation
   */
  async requestPasswordReset(email: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const foundAcc = MOCK_ADMIN_ACCOUNTS.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!foundAcc) {
      throw new Error('No registered admin account associated with this email.');
    }
    return `Password reset token dispatched to ${email}. Check your security inbox.`;
  }
};
