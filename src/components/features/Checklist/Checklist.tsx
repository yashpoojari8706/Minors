import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../ui';
import { ChecklistItem } from './ChecklistItem';

export interface ChecklistItemData {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  required: boolean;
  category?: string;
}

interface ChecklistProps {
  title: string;
  items: ChecklistItemData[];
  onToggleItem: (itemId: string) => void;
  completionPercentage?: number;
}

export const Checklist: React.FC<ChecklistProps> = ({
  title,
  items,
  onToggleItem,
  completionPercentage = 0,
}) => {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${completionPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(completionPercentage)}%</Text>
        </View>
      </View>
      
      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    minWidth: 35,
  },
  itemsContainer: {
    maxHeight: 300,
  },
});
