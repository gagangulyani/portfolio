import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, RefreshCw, User, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  skills: string[];
}

// Dummy LinkedIn data - In production, you would integrate with LinkedIn API
const dummyLinkedInData = {
  profile: {
    name: "Gagan Deep Singh",
    headline: "Full Stack Developer | Community Builder | Tech Leader",
    location: "Saharanpur, Uttar Pradesh, India",
    connections: "500+",
    profileUrl: "https://linkedin.com/in/gagan-gulyani"
  },
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Pulse",
      location: "Remote",
      startDate: "2023-01",
      endDate: null,
      current: true,
      description: "Working on Patronum - Google Workspace automation suite. Developing scalable web applications and enterprise solutions.",
      skills: ["React", "Node.js", "Google APIs", "TypeScript", "Cloud Functions"]
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "JFT (Just For Today)",
      location: "Remote",
      startDate: "2022-06",
      endDate: "2023-01",
      current: false,
      description: "Developed and maintained web applications for recovery community platform.",
      skills: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 3,
      title: "Community Builder",
      company: "Delhi Devs",
      location: "Delhi, India",
      startDate: "2021-01",
      endDate: null,
      current: true,
      description: "Building and nurturing tech community in Delhi. Organizing events, workshops, and networking sessions.",
      skills: ["Community Building", "Event Management", "Public Speaking", "Networking"]
    }
  ]
};

interface LinkedInSyncProps {
  onExperienceUpdate?: (experience: ExperienceItem[]) => void;
}

const LinkedInSync = ({ onExperienceUpdate }: LinkedInSyncProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if LinkedIn data was previously synced
    const syncData = localStorage.getItem('linkedin_sync');
    if (syncData) {
      const parsed = JSON.parse(syncData);
      setIsConnected(true);
      setLastSync(new Date(parsed.lastSync));
    }
  }, []);

  const handleLinkedInConnect = () => {
    // In production, this would redirect to LinkedIn OAuth
    toast({
      title: "LinkedIn Integration",
      description: "LinkedIn API integration would be implemented here. Using sample data for demo.",
    });
    
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setLastSync(new Date());
      localStorage.setItem('linkedin_sync', JSON.stringify({
        connected: true,
        lastSync: new Date().toISOString(),
        data: dummyLinkedInData
      }));
      
      // Update experience data
      if (onExperienceUpdate) {
        onExperienceUpdate(dummyLinkedInData.experience);
      }
      
      toast({
        title: "LinkedIn Connected!",
        description: "Your LinkedIn profile has been synced successfully.",
      });
    }, 2000);
  };

  const handleSync = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLastSync(new Date());
      localStorage.setItem('linkedin_sync', JSON.stringify({
        connected: true,
        lastSync: new Date().toISOString(),
        data: dummyLinkedInData
      }));
      
      if (onExperienceUpdate) {
        onExperienceUpdate(dummyLinkedInData.experience);
      }
      
      setIsLoading(false);
      toast({
        title: "Sync Complete!",
        description: "Your LinkedIn experience has been updated.",
      });
    }, 2000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-600" />
            LinkedIn Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Connect your LinkedIn profile to automatically sync your professional experience.
              </p>
              <Button onClick={handleLinkedInConnect} className="bg-blue-600 hover:bg-blue-700">
                <Linkedin className="w-4 h-4 mr-2" />
                Connect LinkedIn
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-600">Connected</Badge>
                  {lastSync && (
                    <span className="text-sm text-muted-foreground">
                      Last synced: {lastSync.toLocaleDateString()}
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSync}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync Now
                    </>
                  )}
                </Button>
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{dummyLinkedInData.profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{dummyLinkedInData.profile.headline}</p>
                    <p className="text-sm text-muted-foreground">{dummyLinkedInData.profile.location}</p>
                  </div>
                </div>

                <h4 className="font-medium mb-3">Recent Experience:</h4>
                <div className="space-y-3">
                  {dummyLinkedInData.experience.slice(0, 3).map((exp) => (
                    <div key={exp.id} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <Building className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-sm">{exp.title}</h5>
                          {exp.current && <Badge variant="secondary" className="text-xs">Current</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInSync;