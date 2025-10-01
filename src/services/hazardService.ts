import { HazardReportData } from '../components/features';

interface HazardReport extends HazardReportData {
  id: string;
  reportedBy: string;
  reportedAt: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  comments: Array<{
    id: string;
    author: string;
    message: string;
    timestamp: string;
  }>;
}

class HazardService {
  async submitHazardReport(reportData: HazardReportData): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const reportId = `hazard_${Date.now()}`;
    
    console.log('Submitted hazard report:', {
      id: reportId,
      ...reportData,
      reportedAt: new Date().toISOString(),
      status: 'open',
    });
    
    return reportId;
  }

  async getHazardReports(filters?: {
    status?: string;
    severity?: string;
    assignedTo?: string;
  }): Promise<HazardReport[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const mockReports: HazardReport[] = [
      {
        id: 'hazard_001',
        title: 'Loose Ceiling Rock in Tunnel B-7',
        description: 'Noticed loose rock formation in the ceiling of tunnel B-7, approximately 50 meters from the entrance. Rock appears to be shifting and could pose a falling hazard.',
        location: 'Tunnel B-7, 50m from entrance',
        severity: 'high',
        category: 'Structural',
        reportedBy: 'Rajesh Kumar',
        reportedAt: '2024-01-15T08:30:00Z',
        status: 'investigating',
        assignedTo: 'Amit Singh',
        priority: 'high',
        comments: [
          {
            id: 'comment_001',
            author: 'Amit Singh',
            message: 'Investigating the structural integrity. Area has been cordoned off.',
            timestamp: '2024-01-15T09:15:00Z',
          },
        ],
      },
      {
        id: 'hazard_002',
        title: 'Faulty Gas Detection Alarm',
        description: 'Gas detection alarm in sector C is not functioning properly. Alarm did not sound during routine test.',
        location: 'Sector C, Main Shaft',
        severity: 'critical',
        category: 'Equipment',
        reportedBy: 'Priya Sharma',
        reportedAt: '2024-01-15T07:45:00Z',
        status: 'open',
        priority: 'critical',
        comments: [],
      },
      {
        id: 'hazard_003',
        title: 'Slippery Surface Near Water Pump',
        description: 'Water leakage from pump creating slippery surface. Workers could slip and fall.',
        location: 'Pump Station 3',
        severity: 'medium',
        category: 'Environmental',
        reportedBy: 'Suresh Patel',
        reportedAt: '2024-01-14T16:20:00Z',
        status: 'resolved',
        assignedTo: 'Maintenance Team',
        priority: 'medium',
        comments: [
          {
            id: 'comment_002',
            author: 'Maintenance Team',
            message: 'Pump leak fixed and area cleaned. Anti-slip mats installed.',
            timestamp: '2024-01-15T10:30:00Z',
          },
        ],
      },
    ];

    // Apply filters if provided
    let filteredReports = mockReports;
    
    if (filters?.status) {
      filteredReports = filteredReports.filter(report => report.status === filters.status);
    }
    
    if (filters?.severity) {
      filteredReports = filteredReports.filter(report => report.severity === filters.severity);
    }
    
    if (filters?.assignedTo) {
      filteredReports = filteredReports.filter(report => report.assignedTo === filters.assignedTo);
    }

    return filteredReports;
  }

  async getHazardReport(reportId: string): Promise<HazardReport | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const reports = await this.getHazardReports();
    return reports.find(report => report.id === reportId) || null;
  }

  async updateHazardStatus(reportId: string, status: HazardReport['status']): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Updated hazard ${reportId} status to ${status}`);
    return true;
  }

  async addComment(reportId: string, comment: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log(`Added comment to hazard ${reportId}: ${comment}`);
    return true;
  }
}

export const hazardService = new HazardService();
