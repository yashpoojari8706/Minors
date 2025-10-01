import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { HazardReportForm, HazardReportData } from '../../../components/features';
import { hazardService } from '../../../services';
import { trackScreenView, trackUserAction } from '../../../utils/analytics';

interface ReportHazardScreenProps {
  navigation: any;
}

export const ReportHazardScreen: React.FC<ReportHazardScreenProps> = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    trackScreenView('ReportHazard');
  }, []);

  const handleSubmit = async (reportData: HazardReportData) => {
    setIsSubmitting(true);
    
    try {
      trackUserAction('hazard_report_submit', undefined, 1);
      
      const reportId = await hazardService.submitHazardReport(reportData);
      
      Alert.alert(
        'Report Submitted',
        `Your hazard report has been submitted successfully. Report ID: ${reportId}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Submission Failed',
        'Failed to submit hazard report. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    trackUserAction('hazard_report_cancel');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HazardReportForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      
      {isSubmitting && (
        <View style={styles.overlay}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Submitting Report...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
