import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Button, Card, SkeletonLoader } from '../../../components/ui';
import { useAuthMock, useNetworkStatus } from '../../../hooks';
import { hazardService } from '../../../services';
import { trackScreenView, trackUserAction } from '../../../utils/analytics';
import { t } from '../../../i18n';

interface SupervisorDashboardProps {
  navigation: any;
}

export const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ navigation }) => {
  const { user } = useAuthMock();
  const { isConnected } = useNetworkStatus();
  const [teamStats, setTeamStats] = useState<any>(null);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    trackScreenView('SupervisorDashboard');
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Mock team stats
      const mockTeamStats = {
        totalMembers: 12,
        presentToday: 11,
        checklistsCompleted: 9,
        pendingReports: 3,
        safetyScore: 92,
      };

      const reports = await hazardService.getHazardReports({ status: 'open' });
      
      setTeamStats(mockTeamStats);
      setRecentReports(reports.slice(0, 3));
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

  const handleViewTeamChecklists = () => {
    trackUserAction('view_team_checklists');
    navigation.navigate('TeamChecklists');
  };

  const handleReviewHazards = () => {
    trackUserAction('review_hazards');
    navigation.navigate('HazardReviews');
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
          Supervisor • {user?.team} • {user?.department}
        </Text>
        {!isConnected && (
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>📶 Offline Mode</Text>
          </View>
        )}
      </View>

      {/* Team Overview */}
      <Card style={styles.overviewCard}>
        <Text style={styles.sectionTitle}>Team Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{teamStats?.presentToday}</Text>
            <Text style={styles.statLabel}>Present Today</Text>
            <Text style={styles.statSubtext}>of {teamStats?.totalMembers} members</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{teamStats?.checklistsCompleted}</Text>
            <Text style={styles.statLabel}>Checklists Done</Text>
            <Text style={styles.statSubtext}>
              {Math.round((teamStats?.checklistsCompleted / teamStats?.presentToday) * 100)}% completion
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{teamStats?.safetyScore}%</Text>
            <Text style={styles.statLabel}>Safety Score</Text>
            <Text style={styles.statSubtext}>This week</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FF9800' }]}>{teamStats?.pendingReports}</Text>
            <Text style={styles.statLabel}>Pending Reviews</Text>
            <Text style={styles.statSubtext}>Require attention</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Supervisor Actions</Text>
        <View style={styles.actionButtons}>
          <Button
            title="📋 Team Checklists"
            onPress={handleViewTeamChecklists}
            variant="primary"
            style={styles.actionButton}
          />
          <Button
            title="🔍 Review Hazards"
            onPress={handleReviewHazards}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
        <View style={styles.actionButtons}>
          <Button
            title="📊 Team Reports"
            onPress={() => navigation.navigate('Reports')}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="🎯 Safety Briefing"
            onPress={() => trackUserAction('safety_briefing')}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
      </Card>

      {/* Recent Hazard Reports */}
      <Card style={styles.reportsCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Hazard Reports</Text>
          <Button
            title="View All"
            onPress={() => navigation.navigate('HazardReviews')}
            variant="secondary"
            size="small"
          />
        </View>
        
        {recentReports.length > 0 ? (
          recentReports.map((report) => (
            <View key={report.id} style={styles.reportItem}>
              <View style={styles.reportHeader}>
                <Text style={styles.reportTitle} numberOfLines={1}>
                  {report.title}
                </Text>
                <View style={[
                  styles.severityBadge,
                  { backgroundColor: getSeverityColor(report.severity) }
                ]}>
                  <Text style={styles.severityText}>{report.severity.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.reportLocation}>📍 {report.location}</Text>
              <Text style={styles.reportBy}>Reported by {report.reportedBy}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>✅ No pending hazard reports</Text>
          </View>
        )}
      </Card>

      {/* Team Performance */}
      <Card style={styles.performanceCard}>
        <Text style={styles.sectionTitle}>This Week's Performance</Text>
        <View style={styles.performanceMetrics}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Safety Incidents</Text>
            <Text style={[styles.metricValue, { color: '#4CAF50' }]}>0</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Near Misses Reported</Text>
            <Text style={styles.metricValue}>3</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Training Completed</Text>
            <Text style={styles.metricValue}>8/12</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Equipment Inspections</Text>
            <Text style={styles.metricValue}>12/12</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return '#DC3545';
    case 'high': return '#FF5722';
    case 'medium': return '#FF9800';
    case 'low': return '#4CAF50';
    default: return '#6C757D';
  }
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  reportsCard: {
    margin: 16,
  },
  reportItem: {
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reportLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  reportBy: {
    fontSize: 11,
    color: '#999',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  performanceCard: {
    margin: 16,
    marginBottom: 32,
  },
  performanceMetrics: {
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
});
