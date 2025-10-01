import React from 'react';
import { useAuthMock } from '../hooks';
import { USER_ROLES } from '../config/roles';
import { WorkerNavigator } from './WorkerNavigator';
import { SupervisorNavigator } from './SupervisorNavigator';
import { SafetyNavigator } from './SafetyNavigator';
import { AdminNavigator } from './AdminNavigator';

export const RoleBasedNavigator = () => {
  const { currentRole } = useAuthMock();

  switch (currentRole) {
    case USER_ROLES.WORKER:
      return <WorkerNavigator />;
    case USER_ROLES.SUPERVISOR:
      return <SupervisorNavigator />;
    case USER_ROLES.SAFETY_OFFICER:
      return <SafetyNavigator />;
    case USER_ROLES.ADMIN:
      return <AdminNavigator />;
    default:
      return <WorkerNavigator />; // Default fallback
  }
};
