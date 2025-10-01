import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface VideoItem {
  id: string;
  uri: string;
  title?: string;
}

interface VideoFeedProps {
  videos: VideoItem[];
  isScreenFocused: boolean;
}

interface VideoPlayerProps {
  item: VideoItem;
  isActive: boolean;
  index: number;
  isScreenFocused: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, isActive, index, isScreenFocused }) => {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});

  useEffect(() => {
    // Only play video if both active AND screen is focused
    if (isActive && isScreenFocused && videoRef.current) {
      console.log(`Video ${index} starting playback - screen focused and active`);
      videoRef.current.playAsync();
    } else if (videoRef.current) {
      console.log(`Video ${index} pausing - isActive: ${isActive}, isScreenFocused: ${isScreenFocused}`);
      videoRef.current.pauseAsync();
    }
  }, [isActive, isScreenFocused]);

  const handlePlaybackStatusUpdate = (status: any) => {
    setStatus(status);
    
    // Log status for debugging
    if (status.error) {
      console.error(`Video ${index} error:`, status.error);
    }
    
    // Auto-replay when video ends (only if screen is focused)
    if (status.didJustFinish && isActive && isScreenFocused) {
      console.log(`Video ${index} finished, replaying...`);
      videoRef.current?.replayAsync();
    }
  };

  const togglePlayPause = () => {
    console.log(`Video ${index} toggle - current status:`, { 
      isPlaying: status.isPlaying, 
      isLoaded: status.isLoaded,
      isScreenFocused,
      isActive
    });
    
    // Only allow play/pause if screen is focused
    if (!isScreenFocused) {
      console.log(`Video ${index} toggle ignored - screen not focused`);
      return;
    }
    
    if (status.isPlaying) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
  };

  // console.log(`Video ${index} rendering - URI:`, item.uri, 'isActive:', isActive);

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isActive}
        isLooping={false} // We handle looping manually
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        useNativeControls={false}
        onLoad={(status) => {
          console.log(`Video ${index} loaded:`, status);
        }}
        onError={(error) => {
          console.error(`Video ${index} load error:`, error);
        }}
      />
      
      {/* Play/Pause Overlay */}
      <TouchableOpacity 
        style={styles.playPauseOverlay}
        onPress={togglePlayPause}
        activeOpacity={0.7}
      >
        {!status.isPlaying && (
          <View style={styles.playButton}>
            <Ionicons name="play" size={60} color="white" />
          </View>
        )}
      </TouchableOpacity>

      {/* Video Info Overlay */}
      {item.title && (
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{item.title}</Text>
        </View>
      )}
    </View>
  );
};

export const VideoFeed: React.FC<VideoFeedProps> = ({ videos, isScreenFocused }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [infiniteVideos, setInfiniteVideos] = useState<VideoItem[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Create infinite video list by repeating the videos
  useEffect(() => {
    if (videos.length > 0) {
      // Create a large array by repeating videos for infinite scroll feel
      const repeatedVideos: VideoItem[] = [];
      const repeatCount = Math.ceil(1000 / videos.length); // Repeat to get ~1000 items
      
      for (let i = 0; i < repeatCount; i++) {
        videos.forEach((video, index) => {
          repeatedVideos.push({
            ...video,
            id: `${video.id}_${i}_${index}`, // Unique ID for each repetition
          });
        });
      }
      
      setInfiniteVideos(repeatedVideos);
    }
  }, [videos]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const activeIndex = viewableItems[0].index || 0;
      setActiveVideoIndex(activeIndex);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // Video is considered active when 50% visible
  }).current;

  const renderVideoItem = ({ item, index }: { item: VideoItem; index: number }) => (
    <VideoPlayer
      item={item}
      isActive={index === activeVideoIndex}
      index={index}
      isScreenFocused={isScreenFocused}
    />
  );

  const getItemLayout = (_: any, index: number) => ({
    length: screenHeight,
    offset: screenHeight * index,
    index,
  });

  if (infiniteVideos.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <View style={styles.emptyContent}>
          <Ionicons name="videocam-off" size={60} color="#666" />
          <Text style={styles.emptyText}>No videos available</Text>
          <Text style={styles.emptySubtext}>
            Add video files to src/assets/feed/ folder
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={infiniteVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  videoContainer: {
    width: screenWidth,
    height: screenHeight,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 20,
  },
  videoInfo: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
