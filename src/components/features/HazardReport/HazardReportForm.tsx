import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Input, Card } from '../../ui';

interface HazardReportFormProps {
  onSubmit: (report: HazardReportData) => void;
  onCancel: () => void;
}

export interface HazardReportData {
  title: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  photos?: string[];
  voiceNote?: string;
}

export const HazardReportForm: React.FC<HazardReportFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<HazardReportData>({
    title: '',
    description: '',
    location: '',
    severity: 'medium',
    category: '',
  });

  const [errors, setErrors] = useState<Partial<HazardReportData>>({});

  const validateForm = () => {
    const newErrors: Partial<HazardReportData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const severityOptions = [
    { value: 'low', label: 'Low', color: '#4CAF50' },
    { value: 'medium', label: 'Medium', color: '#FF9800' },
    { value: 'high', label: 'High', color: '#FF5722' },
    { value: 'critical', label: 'Critical', color: '#DC3545' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={styles.title}>Report Safety Hazard</Text>
        
        <Input
          label="Hazard Title *"
          value={formData.title}
          onChangeText={(title) => setFormData({ ...formData, title })}
          error={errors.title}
          placeholder="Brief description of the hazard"
        />

        <Input
          label="Detailed Description *"
          value={formData.description}
          onChangeText={(description) => setFormData({ ...formData, description })}
          error={errors.description}
          placeholder="Provide detailed information about the hazard"
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <Input
          label="Location *"
          value={formData.location}
          onChangeText={(location) => setFormData({ ...formData, location })}
          error={errors.location}
          placeholder="Specific location where hazard was observed"
        />

        <Input
          label="Category"
          value={formData.category}
          onChangeText={(category) => setFormData({ ...formData, category })}
          placeholder="e.g., Equipment, Environmental, Structural"
        />

        <View style={styles.severityContainer}>
          <Text style={styles.label}>Severity Level *</Text>
          <View style={styles.severityOptions}>
            {severityOptions.map((option) => (
              <Button
                key={option.value}
                title={option.label}
                onPress={() => setFormData({ ...formData, severity: option.value as any })}
                variant={formData.severity === option.value ? 'primary' : 'secondary'}
                size="small"
                style={[
                  styles.severityButton,
                  formData.severity === option.value && { backgroundColor: option.color }
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.mediaSection}>
          <Text style={styles.label}>Attachments (Coming Soon)</Text>
          <View style={styles.mediaButtons}>
            <Button
              title="📷 Add Photos"
              onPress={() => Alert.alert('Coming Soon', 'Photo upload will be available soon')}
              variant="secondary"
              size="small"
              style={styles.mediaButton}
            />
            <Button
              title="🎤 Voice Note"
              onPress={() => Alert.alert('Coming Soon', 'Voice recording will be available soon')}
              variant="secondary"
              size="small"
              style={styles.mediaButton}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Cancel"
            onPress={onCancel}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="Submit Report"
            onPress={handleSubmit}
            variant="primary"
            style={styles.actionButton}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  severityContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  severityOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  severityButton: {
    flex: 1,
    minWidth: 70,
  },
  mediaSection: {
    marginBottom: 24,
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mediaButton: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
