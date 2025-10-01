import { useState, useEffect } from 'react';
import { UserRole, USER_ROLES, MOCK_USERS, ROLE_PERMISSIONS } from '../config/roles';

interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  department: string;
  [key: string]: any;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthMock = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuthStatus = async () => {
      // Simulate network delay for splash screen
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always start unauthenticated to show login flow
      // In a real app, this would check AsyncStorage or secure storage for saved credentials
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    };

    checkAuthStatus();
  }, []);

  const login = async (role: UserRole): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate network request (reduced delay for better UX)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = MOCK_USERS[role];
      
      if (user) {
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.log('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const hasPermission = (permission: keyof typeof ROLE_PERMISSIONS[UserRole]): boolean => {
    if (!authState.user) return false;
    return ROLE_PERMISSIONS[authState.user.role][permission] || false;
  };

  const switchRole = async (newRole: UserRole): Promise<boolean> => {
    return await login(newRole);
  };

  return {
    ...authState,
    currentRole: authState.user?.role || null,
    login,
    logout,
    hasPermission,
    switchRole,
  };
};
