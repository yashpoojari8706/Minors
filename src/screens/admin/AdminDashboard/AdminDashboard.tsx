import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Button, Card, SkeletonLoader } from '../../../components/ui';
import { useAuthMock, useNetworkStatus } from '../../../hooks';
import { trackScreenView, trackUserAction } from '../../../utils/analytics';
import { t } from '../../../i18n';

interface AdminDashboardProps {
  navigation: any;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigation }) => {
  const { user } = useAuthMock();
  const { isConnected } = useNetworkStatus();
  const [systemMetrics, setSystemMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    trackScreenView('AdminDashboard');
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Mock system metrics
      const mockMetrics = {
        totalUsers: 156,
        activeUsers: 142,
        totalIncidents: 8,
        resolvedIncidents: 6,
        systemUptime: 99.8,
        complianceScore: 96,
        videosWatched: 1247,
        checklistsCompleted: 89,
        hazardsReported: 23,
        trainingCompletion: 87,
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSystemMetrics(mockMetrics);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleContentManagement = () => {
    trackUserAction('content_management');
    navigation.navigate('ContentManagement');
  };

  const handleUserManagement = () => {
    trackUserAction('user_management');
    navigation.navigate('UserManagement');
  };

  const handleAnalytics = () => {
    trackUserAction('view_analytics');
    navigation.navigate('Analytics');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (isLoading) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width="60%" height={24} />
          <SkeletonLoader width="40%" height={16} style={{ marginTop: 8 }} />
        </View>
        <SkeletonLoader width="100%" height={150} style={{ margin: 16 }} />
        <SkeletonLoader width="100%" height={200} style={{ margin: 16 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {getGreeting()}, {user?.name?.split(' ')[0]}! 👨‍💼
        </Text>
        <Text style={styles.subtitle}>
          {user?.title} • {user?.department}
        </Text>
        {!isConnected && (
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>📶 Offline Mode</Text>
          </View>
        )}
      </View>

      {/* System Overview */}
      <Card style={styles.overviewCard}>
        <Text style={styles.sectionTitle}>System Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{systemMetrics?.activeUsers}</Text>
            <Text style={styles.statLabel}>Active Users</Text>
            <Text style={styles.statSubtext}>of {systemMetrics?.totalUsers} total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#4CAF50' }]}>
              {systemMetrics?.systemUptime}%
            </Text>
            <Text style={styles.statLabel}>System Uptime</Text>
            <Text style={styles.statSubtext}>This month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FF9800' }]}>
              {systemMetrics?.totalIncidents}
            </Text>
            <Text style={styles.statLabel}>Total Incidents</Text>
            <Text style={styles.statSubtext}>
              {systemMetrics?.resolvedIncidents} resolved
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#2196F3' }]}>
              {systemMetrics?.complianceScore}%
            </Text>
            <Text style={styles.statLabel}>Compliance Score</Text>
            <Text style={styles.statSubtext}>Overall rating</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Administrative Actions</Text>
        <View style={styles.actionButtons}>
          <Button
            title="📊 Analytics"
            onPress={handleAnalytics}
            variant="primary"
            style={styles.actionButton}
          />
          <Button
            title="👥 User Management"
            onPress={handleUserManagement}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
        <View style={styles.actionButtons}>
          <Button
            title="🎥 Content Management"
            onPress={handleContentManagement}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="⚙️ System Settings"
            onPress={() => trackUserAction('system_settings')}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
      </Card>

      {/* Engagement Metrics */}
      <Card style={styles.engagementCard}>
        <Text style={styles.sectionTitle}>User Engagement</Text>
        <View style={styles.engagementMetrics}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Videos Watched</Text>
            <Text style={styles.metricValue}>{systemMetrics?.videosWatched}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Checklists Completed</Text>
            <Text style={styles.metricValue}>{systemMetrics?.checklistsCompleted}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Hazards Reported</Text>
            <Text style={styles.metricValue}>{systemMetrics?.hazardsReported}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Training Completion</Text>
            <Text style={styles.metricValue}>{systemMetrics?.trainingCompletion}%</Text>
          </View>
        </View>
      </Card>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <Text style={styles.sectionTitle}>Recent System Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>👤</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>12 new users registered this week</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>🎥</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>New safety video uploaded: "Emergency Procedures"</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>📊</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Monthly safety report generated</Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>⚠️</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>System maintenance completed successfully</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* System Health */}
      <Card style={styles.healthCard}>
        <Text style={styles.sectionTitle}>System Health</Text>
        <View style={styles.healthMetrics}>
          <View style={styles.healthItem}>
            <View style={styles.healthIndicator}>
              <View style={[styles.healthDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.healthLabel}>Database</Text>
            </View>
            <Text style={styles.healthStatus}>Operational</Text>
          </View>
          <View style={styles.healthItem}>
            <View style={styles.healthIndicator}>
              <View style={[styles.healthDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.healthLabel}>API Services</Text>
            </View>
            <Text style={styles.healthStatus}>Operational</Text>
          </View>
          <View style={styles.healthItem}>
            <View style={styles.healthIndicator}>
              <View style={[styles.healthDot, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.healthLabel}>Analytics</Text>
            </View>
            <Text style={styles.healthStatus}>Degraded</Text>
          </View>
          <View style={styles.healthItem}>
            <View style={styles.healthIndicator}>
              <View style={[styles.healthDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.healthLabel}>File Storage</Text>
            </View>
            <Text style={styles.healthStatus}>Operational</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  offlineIndicator: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFF3CD',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  offlineText: {
    fontSize: 12,
    color: '#856404',
  },
  overviewCard: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  statSubtext: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
    textAlign: 'center',
  },
  quickActions: {
    margin: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
  },
  engagementCard: {
    margin: 16,
  },
  engagementMetrics: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activityCard: {
    margin: 16,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  activityIcon: {
    fontSize: 20,
    width: 24,
    textAlign: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  healthCard: {
    margin: 16,
    marginBottom: 32,
  },
  healthMetrics: {
    gap: 12,
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  healthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthLabel: {
    fontSize: 14,
    color: '#666',
  },
  healthStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
