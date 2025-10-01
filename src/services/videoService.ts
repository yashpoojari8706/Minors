interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  description: string;
  url: string;
  isWatched: boolean;
  tags: string[];
}

class VideoService {
  async getVideoOfTheDay(): Promise<VideoData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockVideos: VideoData[] = [
      {
        id: 'video_001',
        title: 'Proper Use of Gas Detection Equipment in Underground Mining',
        thumbnail: 'https://via.placeholder.com/320x180/FF6B35/FFFFFF?text=Gas+Detection',
        duration: '3:45',
        category: 'Equipment Safety',
        description: 'Learn the correct procedures for using gas detection equipment in underground mining operations.',
        url: 'https://example.com/video1',
        isWatched: false,
        tags: ['gas-detection', 'underground', 'equipment'],
      },
      {
        id: 'video_002',
        title: 'Emergency Evacuation Procedures: Real Mine Drill',
        thumbnail: 'https://via.placeholder.com/320x180/DC3545/FFFFFF?text=Emergency+Drill',
        duration: '5:20',
        category: 'Emergency Response',
        description: 'Watch a real emergency evacuation drill and learn the proper procedures.',
        url: 'https://example.com/video2',
        isWatched: false,
        tags: ['emergency', 'evacuation', 'drill'],
      },
      {
        id: 'video_003',
        title: 'PPE Inspection: What to Look For',
        thumbnail: 'https://via.placeholder.com/320x180/4CAF50/FFFFFF?text=PPE+Check',
        duration: '2:30',
        category: 'Personal Safety',
        description: 'Daily PPE inspection checklist and common issues to watch for.',
        url: 'https://example.com/video3',
        isWatched: true,
        tags: ['ppe', 'inspection', 'safety'],
      },
    ];

    // Return a random video for "video of the day"
    const randomIndex = Math.floor(Math.random() * mockVideos.length);
    return mockVideos[randomIndex];
  }

  async getRecommendedVideos(limit: number = 10): Promise<VideoData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockVideos: VideoData[] = [
      {
        id: 'video_004',
        title: 'Hazard Recognition in Mining Operations',
        thumbnail: 'https://via.placeholder.com/320x180/FF9800/FFFFFF?text=Hazard+Recognition',
        duration: '4:15',
        category: 'Hazard Awareness',
        description: 'Learn to identify common hazards in mining operations.',
        url: 'https://example.com/video4',
        isWatched: false,
        tags: ['hazard', 'recognition', 'awareness'],
      },
      {
        id: 'video_005',
        title: 'Proper Lifting Techniques for Heavy Equipment',
        thumbnail: 'https://via.placeholder.com/320x180/9C27B0/FFFFFF?text=Lifting+Safety',
        duration: '3:00',
        category: 'Physical Safety',
        description: 'Prevent back injuries with proper lifting techniques.',
        url: 'https://example.com/video5',
        isWatched: false,
        tags: ['lifting', 'ergonomics', 'injury-prevention'],
      },
      {
        id: 'video_006',
        title: 'Chemical Safety in Mining: MSDS Review',
        thumbnail: 'https://via.placeholder.com/320x180/607D8B/FFFFFF?text=Chemical+Safety',
        duration: '6:30',
        category: 'Chemical Safety',
        description: 'Understanding Material Safety Data Sheets and chemical handling.',
        url: 'https://example.com/video6',
        isWatched: false,
        tags: ['chemical', 'msds', 'handling'],
      },
    ];

    return mockVideos.slice(0, limit);
  }

  async markVideoAsWatched(videoId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log(`Marked video ${videoId} as watched`);
    return true;
  }

  async searchVideos(query: string): Promise<VideoData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would search the backend
    const allVideos = await this.getRecommendedVideos(20);
    
    return allVideos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
}

export const videoService = new VideoService();
