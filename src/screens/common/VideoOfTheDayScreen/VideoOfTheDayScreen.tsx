import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { trackScreenView } from '../../../utils/analytics';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface VideoOfTheDayScreenProps {
  navigation: any;
}

interface VideoItem {
  id: string;
  uri: string;
  title: string;
  description: string;
}

export const VideoOfTheDayScreen: React.FC<VideoOfTheDayScreenProps> = ({ navigation }) => {
  const [video, setVideo] = useState<VideoItem | null>(null);
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  const [status, setStatus] = useState<any>({});
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    trackScreenView('VideoOfTheDay');
    loadRandomVideo();
  }, []);

  // Handle screen focus/blur for video optimization
  useFocusEffect(
    React.useCallback(() => {
      setIsScreenFocused(true);
      
      return () => {
        setIsScreenFocused(false);
      };
    }, [])
  );

  // Play/pause video based on screen focus
  useEffect(() => {
    if (isScreenFocused && videoRef.current && video) {
      videoRef.current.playAsync();
    } else if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
  }, [isScreenFocused, video]);

  const loadRandomVideo = async () => {
    try {
      // Pre-load all video assets (static requires)
      const video1 = Asset.fromModule(require('../../../assets/feed/vdo1.mp4'));
      const video2 = Asset.fromModule(require('../../../assets/feed/vdo2.mp4'));
      const video3 = Asset.fromModule(require('../../../assets/feed/vdo3.mp4'));
      const video4 = Asset.fromModule(require('../../../assets/feed/vdo4.mp4'));
      const video5 = Asset.fromModule(require('../../../assets/feed/vdo5.mp4'));

      // Download all assets
      await Promise.all([
        video1.downloadAsync(),
        video2.downloadAsync(),
        video3.downloadAsync(),
        video4.downloadAsync(),
        video5.downloadAsync(),
      ]);

      // Define video descriptions with their corresponding assets
      const videoOptions = [
        {
          id: '1',
          asset: video1,
          title: 'Mining Safety Training - Equipment Handling',
          description: 'Learn proper techniques for handling mining equipment safely. This comprehensive training covers pre-operation checks, safe operating procedures, and emergency protocols to ensure worker safety in mining operations.',
        },
        {
          id: '2',
          asset: video2,
          title: 'Underground Safety Procedures',
          description: 'Essential safety protocols for underground mining operations. Covers ventilation systems, gas detection, emergency evacuation procedures, and communication protocols in underground environments.',
        },
        {
          id: '3',
          asset: video3,
          title: 'Emergency Response Protocol',
          description: 'Critical emergency response procedures every mining worker must know. Includes fire safety, medical emergencies, equipment failures, and coordinated evacuation strategies.',
        },
        {
          id: '4',
          asset: video4,
          title: 'Personal Protective Equipment',
          description: 'Complete guide to proper PPE usage in mining operations. Learn about helmet safety, respiratory protection, eye protection, and specialized equipment for different mining environments.',
        },
        {
          id: '5',
          asset: video5,
          title: 'Hazard Recognition Training',
          description: 'Develop skills to identify and assess potential hazards in mining operations. Covers geological hazards, equipment-related risks, environmental dangers, and proactive safety measures.',
        },
      ];

      // Select random video
      const randomIndex = Math.floor(Math.random() * videoOptions.length);
      const selectedVideo = videoOptions[randomIndex];

      setVideo({
        id: selectedVideo.id,
        title: selectedVideo.title,
        description: selectedVideo.description,
        uri: selectedVideo.asset.localUri || selectedVideo.asset.uri,
      });

    } catch (error) {
      console.error('Error loading video of the day:', error);
      
      // Fallback video
      setVideo({
        id: 'fallback',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: 'Mining Safety Training',
        description: 'Essential safety training for all mining personnel. Learn the fundamentals of safe mining practices.',
      });
    }
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    setStatus(status);
    
    if (status.error) {
      console.error('Video playback error:', status.error);
    }
    
    // Auto-replay when video ends
    if (status.didJustFinish && isScreenFocused) {
      videoRef.current?.replayAsync();
    }
  };

  const togglePlayPause = () => {
    if (!isScreenFocused) return;
    
    if (status.isPlaying) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!video) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Ionicons name="videocam" size={60} color="#FF6B35" />
          <Text style={styles.loadingText}>Loading Video of the Day...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video of the Day</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: video.uri }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={isScreenFocused}
            isLooping={false}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            useNativeControls={false}
          />
          
          {/* Play/Pause Overlay */}
          <TouchableOpacity 
            style={styles.playPauseOverlay}
            onPress={togglePlayPause}
            activeOpacity={0.7}
          >
            {!status.isPlaying && (
              <View style={styles.playButton}>
                <Ionicons name="play" size={50} color="white" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoDescription}>{video.description}</Text>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={togglePlayPause}>
              <Ionicons 
                name={status.isPlaying ? "pause" : "play"} 
                size={20} 
                color="#FF6B35" 
              />
              <Text style={styles.actionButtonText}>
                {status.isPlaying ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={loadRandomVideo}>
              <Ionicons name="refresh" size={20} color="#FF6B35" />
              <Text style={styles.actionButtonText}>New Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginTop: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 34, // Same width as back button for centering
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    width: screenWidth,
    height: screenWidth * 0.56, // 16:9 aspect ratio
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playPauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 40,
    padding: 15,
  },
  videoInfo: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  videoDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
    minWidth: 120,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FF6B35',
    fontWeight: '500',
    marginLeft: 8,
  },
});
