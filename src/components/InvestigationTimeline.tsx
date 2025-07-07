import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle, FileText, Phone, Shield } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  timestamp: string;
  icon: any;
  details?: string[];
}

export const InvestigationTimeline = () => {
  const timelineItems: TimelineItem[] = [
    {
      id: "1",
      title: "Fraud Pattern Detection",
      description: "Suspicious transaction patterns identified across 4 business accounts",
      status: "completed",
      timestamp: "14:23:15",
      icon: AlertTriangle,
      details: [
        "Geographic anomalies detected",
        "Amount patterns analyzed",
        "Timing correlations identified"
      ]
    },
    {
      id: "2",
      title: "Account Security Implementation",
      description: "Immediate protective measures activated on all affected accounts",
      status: "completed",
      timestamp: "14:25:30",
      icon: Shield,
      details: [
        "Debit cards suspended",
        "Transaction limits imposed",
        "Enhanced monitoring activated"
      ]
    },
    {
      id: "3",
      title: "Multi-Agent Response Activated",
      description: "Fraud response team deployed for comprehensive investigation",
      status: "completed",
      timestamp: "14:27:00",
      icon: CheckCircle,
      details: [
        "5 specialist agents activated",
        "Investigation protocols initiated",
        "Cross-functional coordination established"
      ]
    },
    {
      id: "4",
      title: "Customer Contact Protocol",
      description: "Direct verification calls initiated with all affected business owners",
      status: "in-progress",
      timestamp: "14:30:00",
      icon: Phone,
      details: [
        "Metro Construction LLC - In progress",
        "Riverside Medical Group - Pending",
        "TechFlow Solutions - Pending",
        "Lone Star Catering - Pending"
      ]
    },
    {
      id: "5",
      title: "Legal Compliance Filing",
      description: "SAR preparation and regulatory notifications",
      status: "in-progress",
      timestamp: "14:32:00",
      icon: FileText,
      details: [
        "Suspicious Activity Report preparation",
        "FBI financial crimes notification",
        "Documentation preservation"
      ]
    },
    {
      id: "6",
      title: "Account Restoration",
      description: "Verified legitimate accounts will be restored with enhanced security",
      status: "pending",
      timestamp: "Est. 16:00:00",
      icon: Clock,
      details: [
        "Customer verification completion",
        "New secure debit cards issued",
        "Enhanced monitoring maintained"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-warning animate-pulse" />;
      case "pending":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-muted-foreground">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Investigation Timeline</h2>
        <Badge variant="outline" className="text-sm">
          Real-time updates
        </Badge>
      </div>

      <Card className="border-0 shadow-elegant bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Response Protocol Progress
          </CardTitle>
          <CardDescription>
            Comprehensive fraud investigation and response timeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="relative">
                  {/* Timeline connector */}
                  {index < timelineItems.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-16 bg-border" />
                  )}
                  
                  <div className="flex gap-4">
                    {/* Timeline icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center">
                      {getStatusIcon(item.status)}
                    </div>
                    
                    {/* Timeline content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {getStatusBadge(item.status)}
                          <span className="text-xs text-muted-foreground font-mono">
                            {item.timestamp}
                          </span>
                        </div>
                      </div>
                      
                      {/* Details */}
                      {item.details && (
                        <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                          <ul className="space-y-1">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-0 shadow-elegant bg-white">
        <CardHeader>
          <CardTitle>Immediate Next Steps (24-48 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Investigation</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  Complete customer verification calls
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-warning mt-0.5" />
                  Coordinate with law enforcement
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  Analyze surveillance footage
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-warning mt-0.5" />
                  Restore verified accounts within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  Issue new enhanced security cards
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  Schedule security consultations
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};