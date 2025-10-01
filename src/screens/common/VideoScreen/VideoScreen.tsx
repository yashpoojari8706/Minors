import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import { useFocusEffect } from '@react-navigation/native';
import { VideoFeed } from '../../../components/features';
import { trackScreenView } from '../../../utils/analytics';

interface VideoScreenProps {
  navigation: any;
}

interface VideoItem {
  id: string;
  uri: string;
  title?: string;
}

export const VideoScreen: React.FC<VideoScreenProps> = ({ navigation }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isScreenFocused, setIsScreenFocused] = useState(false);

  useEffect(() => {
    trackScreenView('VideoScreen');
    loadVideos();
  }, []);

  // Handle screen focus/blur for video optimization
  useFocusEffect(
    React.useCallback(() => {
      console.log('VideoScreen focused - enabling video playback');
      setIsScreenFocused(true);
      
      return () => {
        console.log('VideoScreen blurred - disabling video playback');
        setIsScreenFocused(false);
      };
    }, [])
  );

  const loadVideos = async () => {
    try {
      // Load and resolve local video assets
      const video1 = Asset.fromModule(require('../../../assets/feed/vdo1.mp4'));
      const video2 = Asset.fromModule(require('../../../assets/feed/vdo2.mp4'));
      const video3 = Asset.fromModule(require('../../../assets/feed/vdo3.mp4'));
      const video4 = Asset.fromModule(require('../../../assets/feed/vdo4.mp4'));
      const video5 = Asset.fromModule(require('../../../assets/feed/vdo5.mp4'));

      // Download/cache the assets
      await Promise.all([
        video1.downloadAsync(),
        video2.downloadAsync(),
        video3.downloadAsync(),
        video4.downloadAsync(),
        video5.downloadAsync(),
      ]);

      const videoList: VideoItem[] = [
        {
          id: '1',
          uri: video1.localUri || video1.uri,
          title: 'Mining Safety Training - Equipment Handling',
        },
        {
          id: '2',
          uri: video2.localUri || video2.uri,
          title: 'Underground Safety Procedures',
        },
        {
          id: '3',
          uri: video3.localUri || video3.uri,
          title: 'Emergency Response Protocol',
        },
        {
          id: '4',
          uri: video4.localUri || video4.uri,
          title: 'Personal Protective Equipment',
        },
        {
          id: '5',
          uri: video5.localUri || video5.uri,
          title: 'Hazard Recognition Training',
        },
      ];

      console.log('Videos loaded:', videoList.map(v => ({ id: v.id, uri: v.uri })));
      setVideos(videoList);
    } catch (error) {
      console.error('Error loading videos:', error);
      
      // Fallback to sample videos if local videos fail
      const fallbackVideoList: VideoItem[] = [
        {
          id: '1',
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          title: 'Sample Video 1 - Mining Safety Training',
        },
        {
          id: '2',
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          title: 'Sample Video 2 - Underground Safety',
        },
      ];
      
      console.log('Using fallback videos');
      setVideos(fallbackVideoList);
    }
  };

  return (
    <View style={styles.container}>
      <VideoFeed videos={videos} isScreenFocused={isScreenFocused} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
