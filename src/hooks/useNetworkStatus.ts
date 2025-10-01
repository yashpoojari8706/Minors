import { useState, useEffect } from 'react';

interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
}

export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true, // Default to true for mock
    isInternetReachable: true,
    type: 'wifi',
  });

  useEffect(() => {
    // In a real app, you would use @react-native-netinfo/netinfo
    // For now, we'll simulate network status changes
    
    const simulateNetworkChanges = () => {
      // Randomly simulate network changes for demo purposes
      const interval = setInterval(() => {
        const shouldSimulateDisconnection = Math.random() < 0.1; // 10% chance
        
        if (shouldSimulateDisconnection && networkState.isConnected) {
          setNetworkState({
            isConnected: false,
            isInternetReachable: false,
            type: null,
          });
          
          // Reconnect after 3 seconds
          setTimeout(() => {
            setNetworkState({
              isConnected: true,
              isInternetReachable: true,
              type: 'wifi',
            });
          }, 3000);
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(interval);
    };

    const cleanup = simulateNetworkChanges();
    return cleanup;
  }, [networkState.isConnected]);

  const refresh = () => {
    // Simulate refreshing network status
    setNetworkState({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    });
  };

  return {
    ...networkState,
    refresh,
  };
};
