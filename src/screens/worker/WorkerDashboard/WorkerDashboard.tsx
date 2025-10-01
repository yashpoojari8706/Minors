import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, SkeletonLoader } from '../../../components/ui';
import { Checklist, VideoReel } from '../../../components/features';
import { useAuthMock, useNetworkStatus } from '../../../hooks';
import { checklistService, videoService } from '../../../services';
import { trackScreenView, trackUserAction } from '../../../utils/analytics';
import { t } from '../../../i18n';

interface WorkerDashboardProps {
  navigation: any;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ navigation }) => {
  const { user } = useAuthMock();
  const { isConnected } = useNetworkStatus();
  const [checklist, setChecklist] = useState<any>(null);
  const [videoOfTheDay, setVideoOfTheDay] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    trackScreenView('WorkerDashboard');
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [checklistData, videoData] = await Promise.all([
        checklistService.getChecklistForRole('worker'),
        videoService.getVideoOfTheDay(),
      ]);
      
      setChecklist(checklistData);
      setVideoOfTheDay(videoData);
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

  const handleChecklistItemToggle = async (itemId: string) => {
    if (!checklist) return;
    
    const updatedItems = checklist.items.map((item: any) => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    const completedCount = updatedItems.filter((item: any) => item.completed).length;
    const completionPercentage = (completedCount / updatedItems.length) * 100;
    
    setChecklist({
      ...checklist,
      items: updatedItems,
      completionPercentage,
    });

    trackUserAction('checklist_item_toggle', itemId);
    
    // Update backend
    await checklistService.updateChecklistItem(checklist.id, itemId, !checklist.items.find((item: any) => item.id === itemId)?.completed);
  };

  const handleReportHazard = () => {
    trackUserAction('report_hazard_clicked');
    navigation.navigate('ReportHazard');
  };

  const handleWatchVideo = () => {
    trackUserAction('video_watch');
    // Navigate to dedicated video of the day screen
    navigation.navigate('VideoOfTheDay');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <SkeletonLoader width="60%" height={24} />
            <SkeletonLoader width="40%" height={16} style={{ marginTop: 8 }} />
          </View>
          <SkeletonLoader width="100%" height={200} style={{ margin: 16 }} />
          <SkeletonLoader width="100%" height={150} style={{ margin: 16 }} />
          <SkeletonLoader width="100%" height={100} style={{ margin: 16 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {getGreeting()}, {user?.name?.split(' ')[0]}!
        </Text>
        <Text style={styles.subtitle}>
          {user?.department} • {user?.shift} Shift
        </Text>
        {!isConnected && (
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>Offline Mode</Text>
          </View>
        )}
      </View>

      {/* Today's Checklist */}
      {checklist && (
        <Checklist
          title={t('dashboard.todaysChecklist')}
          items={checklist.items}
          onToggleItem={handleChecklistItemToggle}
          completionPercentage={checklist.completionPercentage}
        />
      )}

      {/* Video of the Day */}
      {videoOfTheDay && (
        <VideoReel
          title={videoOfTheDay.title}
          thumbnail={videoOfTheDay.thumbnail}
          duration={videoOfTheDay.duration}
          category={videoOfTheDay.category}
          onPress={handleWatchVideo}
          isWatched={videoOfTheDay.isWatched}
          isVideoOfTheDay={true}
        />
      )}

      {/* Quick Actions */}
      <Card style={styles.quickActions}>
        <Text style={styles.sectionTitle}>{t('dashboard.quickActions')}</Text>
        <View style={styles.actionButtons}>
          <Button
            title="Report Hazard"
            onPress={handleReportHazard}
            variant="danger"
            style={styles.actionButton}
          />
          <Button
            title="View All Checklists"
            onPress={() => navigation.navigate('DailyChecklist')}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
        <View style={styles.actionButtons}>
          <Button
            title="Browse Videos"
            onPress={() => navigation.navigate('Videos')}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="My Reports"
            onPress={() => navigation.navigate('Reports')}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
      </Card>

      {/* Safety Stats */}
      <Card style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Your Safety Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Days Safe</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[
              styles.statNumber, 
              { color: checklist?.completionPercentage >= 100 ? '#4CAF50' : '#FF6B35' }
            ]}>
              {checklist?.completionPercentage ? Math.round(checklist.completionPercentage) : 0}%
            </Text>
            <Text style={styles.statLabel}>Today's Checklist</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Videos Watched</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Hazards Reported</Text>
          </View>
        </View>
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 0,
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
  quickActions: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
  },
  statsCard: {
    margin: 16,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '40%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});
