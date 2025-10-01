export const NAVIGATION_ROUTES = {
  // Auth Stack
  AUTH: 'Auth',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  
  // Main App
  MAIN: 'Main',
  
  // Role-based Stacks
  WORKER_STACK: 'WorkerStack',
  SUPERVISOR_STACK: 'SupervisorStack',
  SAFETY_OFFICER_STACK: 'SafetyOfficerStack',
  ADMIN_STACK: 'AdminStack',
  
  // Common Screens
  HOME: 'Home',
  PROFILE: 'Profile',
  VIDEOS: 'Videos',
  REPORTS: 'Reports',
  
  // Worker Screens
  WORKER_DASHBOARD: 'WorkerDashboard',
  DAILY_CHECKLIST: 'DailyChecklist',
  REPORT_HAZARD: 'ReportHazard',
  
  // Supervisor Screens
  SUPERVISOR_DASHBOARD: 'SupervisorDashboard',
  TEAM_CHECKLISTS: 'TeamChecklists',
  HAZARD_REVIEWS: 'HazardReviews',
  
  // Safety Officer Screens
  SAFETY_DASHBOARD: 'SafetyDashboard',
  SAFETY_REPORTS: 'SafetyReports',
  SAFETY_ALERTS: 'SafetyAlerts',
  BROADCAST: 'Broadcast',
  
  // Admin Screens
  ADMIN_DASHBOARD: 'AdminDashboard',
  CONTENT_MANAGEMENT: 'ContentManagement',
  USER_MANAGEMENT: 'UserManagement',
  ANALYTICS: 'Analytics',
  
  // Shared Screens
  VIDEO_PLAYER: 'VideoPlayer',
  HAZARD_DETAILS: 'HazardDetails',
  SETTINGS: 'Settings',
} as const;

export type NavigationRoute = typeof NAVIGATION_ROUTES[keyof typeof NAVIGATION_ROUTES];
