import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Button, Card, SkeletonLoader } from '../../../components/ui';
import { useAuthMock, useNetworkStatus } from '../../../hooks';
import { hazardService } from '../../../services';
import { trackScreenView, trackUserAction } from '../../../utils/analytics';
import { t } from '../../../i18n';

interface SafetyDashboardProps {
  navigation: any;
}

export const SafetyDashboard: React.FC<SafetyDashboardProps> = ({ navigation }) => {
  const { user } = useAuthMock();
  const { isConnected } = useNetworkStatus();
  const [safetyMetrics, setSafetyMetrics] = useState<any>(null);
  const [criticalReports, setCriticalReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    trackScreenView('SafetyDashboard');
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Mock safety metrics
      const mockMetrics = {
        totalIncidents: 2,
        openHazards: 5,
        criticalAlerts: 1,
        complianceScore: 94,
        inspectionsDue: 3,
        trainingOverdue: 7,
      };

      const reports = await hazardService.getHazardReports({ severity: 'critical' });
      
      setSafetyMetrics(mockMetrics);
      setCriticalReports(reports);
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

  const handleViewReports = () => {
    trackUserAction('view_safety_reports');
    navigation.navigate('SafetyReports');
  };

  const handleManageAlerts = () => {
    trackUserAction('manage_alerts');
    navigation.navigate('SafetyAlerts');
  };

  const handleBroadcast = () => {
    trackUserAction('broadcast_alert');
    navigation.navigate('Broadcast');
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
          {getGreeting()}, {user?.name?.split(' ')[0]}! 🦺
        </Text>
        <Text style={styles.subtitle}>
          Safety Officer • {user?.department}
        </Text>
        <Text style={styles.certifications}>
          Certifications: {user?.certifications?.join(', ')}
        </Text>
        {!isConnected && (
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>📶 Offline Mode</Text>
          </View>
        )}
      </View>

      {/* Critical Alerts */}
      {safetyMetrics?.criticalAlerts > 0 && (
        <Card style={[styles.alertCard, styles.criticalAlert]}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertIcon}>🚨</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Critical Safety Alert</Text>
              <Text style={styles.alertText}>
                {safetyMetrics.criticalAlerts} critical issue(s) require immediate attention
              </Text>
            </View>
            <Button
              title="Review"
              onPress={handleViewReports}
              variant="danger"
              size="small"
            />
          </View>
        </Card>
      )}

      {/* Safety Overview */}
      <Card style={styles.overviewCard}>
        <Text style={styles.sectionTitle}>Safety Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#DC3545' }]}>
              {safetyMetrics?.totalIncidents}
            </Text>
            <Text style={styles.statLabel}>Total Incidents</Text>
            <Text style={styles.statSubtext}>This month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FF9800' }]}>
              {safetyMetrics?.openHazards}
            </Text>
            <Text style={styles.statLabel}>Open Hazards</Text>
            <Text style={styles.statSubtext}>Pending review</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#4CAF50' }]}>
              {safetyMetrics?.complianceScore}%
            </Text>
            <Text style={styles.statLabel}>Compliance Score</Text>
            <Text style={styles.statSubtext}>DGMS standards</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FF5722' }]}>
              {safetyMetrics?.inspectionsDue}
            </Text>
            <Text style={styles.statLabel}>Inspections Due</Text>
            <Text style={styles.statSubtext}>This week</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Safety Officer Actions</Text>
        <View style={styles.actionButtons}>
          <Button
            title="📊 Safety Reports"
            onPress={handleViewReports}
            variant="primary"
            style={styles.actionButton}
          />
          <Button
            title="⚠️ Manage Alerts"
            onPress={handleManageAlerts}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
        <View style={styles.actionButtons}>
          <Button
            title="📢 Broadcast Alert"
            onPress={handleBroadcast}
            variant="danger"
            style={styles.actionButton}
          />
          <Button
            title="📋 Site Inspection"
            onPress={() => trackUserAction('site_inspection')}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
      </Card>

      {/* Critical Reports */}
      <Card style={styles.reportsCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Critical Hazard Reports</Text>
          <Button
            title="View All"
            onPress={handleViewReports}
            variant="secondary"
            size="small"
          />
        </View>
        
        {criticalReports.length > 0 ? (
          criticalReports.map((report) => (
            <View key={report.id} style={styles.reportItem}>
              <View style={styles.reportHeader}>
                <Text style={styles.reportTitle} numberOfLines={1}>
                  {report.title}
                </Text>
                <View style={styles.criticalBadge}>
                  <Text style={styles.criticalText}>CRITICAL</Text>
                </View>
              </View>
              <Text style={styles.reportLocation}>📍 {report.location}</Text>
              <Text style={styles.reportBy}>
                Reported by {report.reportedBy} • {new Date(report.reportedAt).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>✅ No critical reports at this time</Text>
          </View>
        )}
      </Card>

      {/* Compliance Status */}
      <Card style={styles.complianceCard}>
        <Text style={styles.sectionTitle}>Compliance Status</Text>
        <View style={styles.complianceMetrics}>
          <View style={styles.complianceRow}>
            <Text style={styles.complianceLabel}>DGMS Regulations</Text>
            <View style={styles.complianceStatus}>
              <Text style={[styles.complianceValue, { color: '#4CAF50' }]}>Compliant</Text>
            </View>
          </View>
          <View style={styles.complianceRow}>
            <Text style={styles.complianceLabel}>Safety Training</Text>
            <View style={styles.complianceStatus}>
              <Text style={[styles.complianceValue, { color: '#FF9800' }]}>
                {safetyMetrics?.trainingOverdue} Overdue
              </Text>
            </View>
          </View>
          <View style={styles.complianceRow}>
            <Text style={styles.complianceLabel}>Equipment Certification</Text>
            <View style={styles.complianceStatus}>
              <Text style={[styles.complianceValue, { color: '#4CAF50' }]}>Up to Date</Text>
            </View>
          </View>
          <View style={styles.complianceRow}>
            <Text style={styles.complianceLabel}>Emergency Procedures</Text>
            <View style={styles.complianceStatus}>
              <Text style={[styles.complianceValue, { color: '#4CAF50' }]}>Verified</Text>
            </View>
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
  certifications: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    fontWeight: '500',
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
  alertCard: {
    margin: 16,
    marginBottom: 8,
  },
  criticalAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC3545',
    backgroundColor: '#FFF5F5',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertIcon: {
    fontSize: 24,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC3545',
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#DC3545',
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
  criticalBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#DC3545',
  },
  criticalText: {
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
  complianceCard: {
    margin: 16,
    marginBottom: 32,
  },
  complianceMetrics: {
    gap: 8,
  },
  complianceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  complianceLabel: {
    fontSize: 14,
    color: '#666',
  },
  complianceStatus: {
    alignItems: 'flex-end',
  },
  complianceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
