import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChecklistItemData } from './Checklist';

interface ChecklistItemProps {
  item: ChecklistItemData;
  onToggle: () => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        item.completed && styles.completedContainer
      ]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        {item.completed && <View style={styles.checkmark} />}
      </View>
      
      <View style={styles.content}>
        <Text style={[
          styles.title,
          item.completed && styles.completedText
        ]}>
          {item.title}
          {item.required && <Text style={styles.required}> *</Text>}
        </Text>
        
        {item.description && (
          <Text style={[
            styles.description,
            item.completed && styles.completedText
          ]}>
            {item.description}
          </Text>
        )}
        
        {item.category && (
          <Text style={styles.category}>{item.category}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  completedContainer: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF6B35',
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    lineHeight: 20,
  },
  category: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
    marginTop: 4,
  },
  required: {
    color: '#DC3545',
    fontWeight: '600',
  },
});
