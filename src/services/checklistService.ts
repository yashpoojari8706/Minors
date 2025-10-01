import { ChecklistItemData } from '../components/features';
import { UserRole } from '../config/roles';

interface ChecklistResponse {
  id: string;
  title: string;
  items: ChecklistItemData[];
  dueDate: string;
  completionPercentage: number;
}

class ChecklistService {
  async getChecklistForRole(role: UserRole): Promise<ChecklistResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockChecklists = {
      worker: {
        id: 'checklist_worker_001',
        title: 'Daily Safety Checklist - Underground Worker',
        dueDate: new Date().toISOString(),
        items: [
          {
            id: 'item_001',
            title: 'Personal Protective Equipment Check',
            description: 'Verify helmet, safety glasses, gloves, and safety boots are in good condition',
            completed: false,
            required: true,
            category: 'PPE',
          },
          {
            id: 'item_002',
            title: 'Gas Detection Equipment',
            description: 'Test and calibrate gas detection device',
            completed: false,
            required: true,
            category: 'Equipment',
          },
          {
            id: 'item_003',
            title: 'Emergency Exit Routes',
            description: 'Confirm knowledge of nearest emergency exits and assembly points',
            completed: false,
            required: true,
            category: 'Emergency',
          },
          {
            id: 'item_004',
            title: 'Tool Inspection',
            description: 'Inspect all tools for damage or wear before use',
            completed: false,
            required: true,
            category: 'Equipment',
          },
          {
            id: 'item_005',
            title: 'Work Area Assessment',
            description: 'Check work area for potential hazards and report any issues',
            completed: false,
            required: true,
            category: 'Assessment',
          },
        ],
        completionPercentage: 0,
      },
      supervisor: {
        id: 'checklist_supervisor_001',
        title: 'Supervisor Daily Safety Checklist',
        dueDate: new Date().toISOString(),
        items: [
          {
            id: 'sup_001',
            title: 'Team Safety Briefing',
            description: 'Conduct morning safety briefing with all team members',
            completed: false,
            required: true,
            category: 'Team Management',
          },
          {
            id: 'sup_002',
            title: 'Work Permit Verification',
            description: 'Review and approve all work permits for the day',
            completed: false,
            required: true,
            category: 'Documentation',
          },
          {
            id: 'sup_003',
            title: 'Equipment Status Check',
            description: 'Verify all team equipment is operational and certified',
            completed: false,
            required: true,
            category: 'Equipment',
          },
        ],
        completionPercentage: 0,
      },
      safety_officer: {
        id: 'checklist_safety_001',
        title: 'Safety Officer Inspection Checklist',
        dueDate: new Date().toISOString(),
        items: [
          {
            id: 'saf_001',
            title: 'Site Safety Audit',
            description: 'Conduct comprehensive safety audit of work areas',
            completed: false,
            required: true,
            category: 'Audit',
          },
          {
            id: 'saf_002',
            title: 'Incident Report Review',
            description: 'Review and follow up on previous day incidents',
            completed: false,
            required: true,
            category: 'Documentation',
          },
        ],
        completionPercentage: 0,
      },
      admin: {
        id: 'checklist_admin_001',
        title: 'Admin Safety Overview',
        dueDate: new Date().toISOString(),
        items: [
          {
            id: 'adm_001',
            title: 'Safety Metrics Review',
            description: 'Review daily safety performance metrics',
            completed: false,
            required: true,
            category: 'Analytics',
          },
        ],
        completionPercentage: 0,
      },
    };

    return mockChecklists[role] || mockChecklists.worker;
  }

  async updateChecklistItem(checklistId: string, itemId: string, completed: boolean): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would update the backend
    console.log(`Updated item ${itemId} in checklist ${checklistId} to ${completed}`);
    
    return true;
  }

  async submitChecklist(checklistId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Submitted checklist ${checklistId}`);
    
    return true;
  }
}

export const checklistService = new ChecklistService();
