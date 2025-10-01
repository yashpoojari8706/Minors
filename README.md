# Starter Template with React Navigation

This is a minimal starter template for React Native apps using Expo and React Navigation.

It includes the following:

- Example [Native Stack](https://reactnavigation.org/docs/native-stack-navigator) with a nested [Bottom Tab](https://reactnavigation.org/docs/bottom-tab-navigator)
- Web support with [React Native for Web](https://necolas.github.io/react-native-web/)
- TypeScript support and configured for React Navigation
- Automatic [deep link](https://reactnavigation.org/docs/deep-linking) and [URL handling configuration](https://reactnavigation.org/docs/configuring-links)
- Theme support [based on system appearance](https://reactnavigation.org/docs/themes/#using-the-operating-system-preferences)
- Expo [Development Build](https://docs.expo.dev/develop/development-builds/introduction/) with [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)

## Getting Started

1. Create a new project using this template:

   ```sh
   npx create-expo-app@latest --template react-navigation/template
   ```

2. Edit the `app.json` file to configure the `name`, `slug`, `scheme` and bundle identifiers (`ios.bundleIdentifier` and `android.bundleIdentifier`) for your app.

3. Edit the `src/App.tsx` file to start working on your app.

## Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Start the development server:

  ```sh
  npm start
  ```

- Build and run iOS and Android development builds:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone and Install Dependencies**
   ```bash
   cd "d:\SCIENCE\DJS AIML\SEM 3\Minors"
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Run on Device/Emulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

## Mock User Credentials

The app includes mock authentication for testing all user roles:

### Worker Role
- **Name**: Rajesh Kumar
- **Role**: Mine Worker
- **Department**: Underground Operations
- **Features**: Daily checklists, video viewing, hazard reporting

### Supervisor Role
- **Name**: Priya Sharma
- **Role**: Supervisor
- **Department**: Underground Operations
- **Features**: Team management, checklist oversight, hazard reviews

### Safety Officer Role
- **Name**: Amit Singh
- **Role**: Safety Officer
- **Department**: Safety & Compliance
- **Features**: Safety reports, alerts management, broadcast capabilities

### Admin Role
- **Name**: Dr. Sunita Patel
- **Role**: Administrator
- **Department**: Management
- **Features**: Content management, user management, analytics dashboard

## Demo Features

### Quick Role Switching
- Use the "Switch Role" button in Profile settings
- Instantly experience different user interfaces and permissions
- No authentication required in demo mode

### Mock Data Services
- Realistic checklist data for each role
- Sample hazard reports with different severity levels
- Video content with progress tracking
- Analytics data for admin dashboard

## Phase 2: Backend Integration (Planned)

### Authentication
- Firebase Auth integration
- Server-side permission enforcement
- Secure role management

### Real-time Data
- Live checklist synchronization
- Real-time hazard reporting
- Push notifications for critical alerts

### AI Personalization
- Context-aware content recommendations
- Personalized safety training paths
- Predictive hazard analysis

### Media Management
- Photo/video upload with signed URLs
- Offline queue with background sync
- Compressed media optimization

## Development Guidelines

### Code Organization
- **Components**: Follow atomic design principles (ui → features)
- **Services**: Promise-based API layer ready for backend integration
- **Hooks**: Reusable logic separation from presentation
- **Analytics**: Comprehensive event tracking ready for Firebase

### Testing Strategy
- Unit tests for utility functions and hooks
- Component snapshot tests for UI consistency
- Integration tests for navigation flows
- Mock service layer for reliable testing

### Performance Optimizations
- Skeleton loaders for perceived performance
- Lazy loading for media content
- Network status monitoring
- Offline-first architecture ready

## Analytics & Observability

### Event Tracking
- Screen view tracking
- User action analytics
- Performance metrics
- Error logging and reporting

### Mock Analytics Data
- User engagement metrics
- Safety compliance scores
- Content consumption patterns
- System health monitoring

## Internationalization

### Supported Languages
- **English**: Primary interface language
- **Hindi (हिंदी)**: Major Indian language support
- **Telugu (తెలుగు)**: Regional mining area support
- **Tamil (தமிழ்)**: Southern India mining regions

### Implementation
- Centralized translation keys
- Flexible UI containers for text expansion
- Easy language switching in profile
- Ready for additional language integration

## Getting Started - Quick Demo

1. **Start the app** and you'll see the MineLy splash screen
2. **Select a role** from the login screen (no password required)
3. **Explore role-specific features**:
   - **Worker**: Complete daily checklists, watch safety videos
   - **Supervisor**: Review team performance, manage hazard reports
   - **Safety Officer**: Monitor compliance, broadcast alerts
   - **Admin**: View analytics, manage content and users
4. **Switch roles** anytime from Profile → Switch Role
5. **Test multilingual support** from Profile → Language settings

## Contributing

This is a Phase 1 frontend implementation. Future contributions will focus on:
- Backend API integration
- Real-time features
- AI/ML personalization
- Advanced analytics
- Production deployment

## License

Developed for Indian Mining Safety Compliance - Educational/Research Project
