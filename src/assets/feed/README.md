# Video Feed Assets

## How to Add Local Videos

1. **Add video files** to this folder (`src/assets/feed/`)
2. **Supported formats**: MP4, MOV, AVI (MP4 recommended)
3. **File naming**: Use descriptive names like:
   - `mining-safety-training.mp4`
   - `equipment-handling.mp4`
   - `emergency-procedures.mp4`

## Current Setup

The app currently uses sample videos from Google's test video repository for demonstration. To use your local videos:

1. Place video files in this folder
2. Update `VideoScreen.tsx` to reference your local files:

```typescript
// Replace the sample URLs with local imports
import video1 from '../../../assets/feed/mining-safety-training.mp4';
import video2 from '../../../assets/feed/equipment-handling.mp4';

const videoList: VideoItem[] = [
  {
    id: '1',
    uri: video1,
    title: 'Mining Safety Training',
  },
  {
    id: '2', 
    uri: video2,
    title: 'Equipment Handling',
  },
];
```

## Features

- ✅ **Full-screen vertical scrolling** (like YouTube Shorts/Instagram Reels)
- ✅ **Auto-replay** when video ends
- ✅ **Infinite scroll** - loops back to start when all videos are viewed
- ✅ **Touch to play/pause**
- ✅ **Smooth scrolling** with snap-to-video behavior
- ✅ **Performance optimized** with video recycling
