// Analytics and logging service - ready for Firebase Analytics integration

interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

interface ErrorLog {
  error: Error;
  context?: Record<string, any>;
  timestamp: string;
  userId?: string;
  level: 'error' | 'warning' | 'info';
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private errors: ErrorLog[] = [];
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  trackEvent(name: string, parameters?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name,
      parameters,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.events.push(event);
    
    // Console logging for development
    console.log('📊 Analytics Event:', {
      event: name,
      params: parameters,
      user: this.userId,
      session: this.sessionId,
    });

    // In production, this would send to Firebase Analytics
    // analytics().logEvent(name, parameters);
  }

  logError(error: Error, context?: Record<string, any>, level: ErrorLog['level'] = 'error') {
    const errorLog: ErrorLog = {
      error,
      context,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      level,
    };

    this.errors.push(errorLog);

    // Console logging for development
    console.error('🚨 Error Log:', {
      message: error.message,
      stack: error.stack,
      context,
      level,
      user: this.userId,
    });

    // In production, this would send to Firebase Crashlytics
    // crashlytics().recordError(error);
  }

  // Predefined event tracking methods for common actions
  trackScreenView(screenName: string, screenClass?: string) {
    this.trackEvent('screen_view', {
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  }

  trackUserAction(action: string, target?: string, value?: number) {
    this.trackEvent('user_action', {
      action,
      target,
      value,
    });
  }

  trackChecklistCompletion(checklistId: string, completionPercentage: number, timeSpent: number) {
    this.trackEvent('checklist_completed', {
      checklist_id: checklistId,
      completion_percentage: completionPercentage,
      time_spent_seconds: timeSpent,
    });
  }

  trackVideoWatched(videoId: string, duration: number, watchTime: number) {
    this.trackEvent('video_watched', {
      video_id: videoId,
      video_duration: duration,
      watch_time: watchTime,
      completion_rate: (watchTime / duration) * 100,
    });
  }

  trackHazardReported(hazardId: string, severity: string, category: string) {
    this.trackEvent('hazard_reported', {
      hazard_id: hazardId,
      severity,
      category,
    });
  }

  trackLogin(method: string, role: string) {
    this.trackEvent('login', {
      method,
      role,
    });
  }

  trackLogout(sessionDuration: number) {
    this.trackEvent('logout', {
      session_duration_seconds: sessionDuration,
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    this.trackEvent('performance_metric', {
      metric,
      value,
      unit,
    });
  }

  // Get analytics data for debugging
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getErrors(): ErrorLog[] {
    return [...this.errors];
  }

  clearData() {
    this.events = [];
    this.errors = [];
  }
}

// Global analytics instance
export const analytics = new AnalyticsService();

// Convenience functions
export const trackEvent = (name: string, parameters?: Record<string, any>) => 
  analytics.trackEvent(name, parameters);

export const logError = (error: Error, context?: Record<string, any>, level?: ErrorLog['level']) => 
  analytics.logError(error, context, level);

export const trackScreenView = (screenName: string, screenClass?: string) => 
  analytics.trackScreenView(screenName, screenClass);

export const trackUserAction = (action: string, target?: string, value?: number) => 
  analytics.trackUserAction(action, target, value);
