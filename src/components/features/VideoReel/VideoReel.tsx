import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Asset } from 'expo-asset';
import { Card } from '../../ui';

interface VideoReelProps {
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  onPress: () => void;
  isWatched?: boolean;
  isVideoOfTheDay?: boolean;
}

export const VideoReel: React.FC<VideoReelProps> = ({
  title,
  thumbnail,
  duration,
  category,
  onPress,
  isWatched = false,
  isVideoOfTheDay = false,
}) => {
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (isVideoOfTheDay) {
      generateVideoThumbnail();
    }
  }, [isVideoOfTheDay]);

  const generateVideoThumbnail = async () => {
    try {
      // Get a random video for thumbnail (simulating video of the day)
      const videoFiles = [
        require('../../../assets/feed/vdo1.mp4'),
        require('../../../assets/feed/vdo2.mp4'),
        require('../../../assets/feed/vdo3.mp4'),
        require('../../../assets/feed/vdo4.mp4'),
        require('../../../assets/feed/vdo5.mp4'),
      ];
      
      const randomIndex = Math.floor(Math.random() * videoFiles.length);
      const selectedVideo = Asset.fromModule(videoFiles[randomIndex]);
      await selectedVideo.downloadAsync();
      
      // Use the video URI as thumbnail (first frame will be shown when video loads)
      setVideoThumbnail(selectedVideo.localUri || selectedVideo.uri);
    } catch (error) {
      console.error('Error generating video thumbnail:', error);
      setVideoThumbnail(null);
    }
  };
  return (
    <Card style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.thumbnailContainer}>
          {isVideoOfTheDay && videoThumbnail ? (
            <Video
              ref={videoRef}
              source={{ uri: videoThumbnail }}
              style={styles.thumbnail}
              resizeMode={ResizeMode.COVER}
              shouldPlay={false}
              useNativeControls={false}
              positionMillis={1000} // Show frame at 1 second
            />
          ) : (
            <Image 
              source={{ uri: thumbnail }} 
              style={styles.thumbnail}
            />
          )}
          <View style={styles.overlay}>
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            <View style={styles.duration}>
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          </View>
          {isWatched && (
            <View style={styles.watchedBadge}>
              <Text style={styles.watchedText}>✓</Text>
            </View>
          )}
          {isVideoOfTheDay && (
            <View style={styles.videoOfTheDayBadge}>
              <Text style={styles.videoOfTheDayText}>TODAY</Text>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 0,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 53, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    marginLeft: 4,
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  watchedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 22,
  },
  videoOfTheDayBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  videoOfTheDayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
