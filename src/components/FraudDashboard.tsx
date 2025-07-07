import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Clock, DollarSign, MapPin, Users, TrendingUp, Eye } from "lucide-react";

export const FraudDashboard = () => {
  const alertInfo = {
    id: "FD-2025-0707-001",
    detectionTime: "2025-07-07 14:23:15 EST",
    alertLevel: "HIGH PRIORITY",
    totalSuspiciousAmount: 127500,
    affectedAccounts: 4,
    patternType: "Unusual cash withdrawal behavior"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden bg-gradient-alert p-8 shadow-critical">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-elegant">
                <AlertTriangle className="h-12 w-12 text-white animate-pulse-critical" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  FRAUD ALERT ACTIVATED
                </h1>
                <p className="text-xl text-white/90 mb-1">
                  Multiple suspicious cash withdrawals detected
                </p>
                <p className="text-white/80">
                  4 business accounts • $127,500 total exposure • Geographic anomalies detected
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-3 backdrop-blur-sm">
                {alertInfo.alertLevel}
              </Badge>
              <p className="text-white/80 mt-2 font-mono">{alertInfo.id}</p>
            </div>
          </div>

          {/* Real-time Status Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-white font-medium">Response Team Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-white/80" />
                  <span className="text-white/80">Accounts Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white/80" />
                  <span className="text-white/80">Response Time: 2 minutes</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white/80 text-sm">Last Updated: </span>
                <span className="text-white font-mono">{alertInfo.detectionTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="max-w-7xl mx-auto p-6 -mt-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-critical to-destructive" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Total Exposure</p>
                  <p className="text-3xl font-bold text-critical">
                    ${alertInfo.totalSuspiciousAmount.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-critical" />
                    <span className="text-xs text-critical font-medium">+127% from baseline</span>
                  </div>
                </div>
                <div className="p-3 bg-critical/10 rounded-xl">
                  <DollarSign className="h-8 w-8 text-critical" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warning to-yellow-500" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Affected Accounts</p>
                  <p className="text-3xl font-bold text-warning">
                    {alertInfo.affectedAccounts}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Eye className="h-3 w-3 text-warning" />
                    <span className="text-xs text-warning font-medium">High-value customers</span>
                  </div>
                </div>
                <div className="p-3 bg-warning/10 rounded-xl">
                  <Users className="h-8 w-8 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Detection Time</p>
                  <p className="text-3xl font-bold text-primary">14:23</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary font-medium">EST Today</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success to-emerald-500" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Response Status</p>
                  <p className="text-3xl font-bold text-success">ACTIVE</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Shield className="h-3 w-3 text-success" />
                    <span className="text-xs text-success font-medium">All systems secured</span>
                  </div>
                </div>
                <div className="p-3 bg-success/10 rounded-xl">
                  <Shield className="h-8 w-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Alert Summary */}
        <Card className="border-0 shadow-elegant bg-white mb-2">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="p-2 bg-critical/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-critical" />
                  </div>
                  Fraud Investigation Summary
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Comprehensive analysis of detected suspicious activities and response protocols
                </CardDescription>
              </div>
              <Button variant="outline" className="shadow-sm">
                <MapPin className="h-4 w-4 mr-2" />
                View Geographic Analysis
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Alert Classification</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alert ID</span>
                    <span className="font-mono text-sm">{alertInfo.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pattern Type</span>
                    <span className="text-sm">{alertInfo.patternType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level</span>
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Geographic Indicators</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Multiple locations outside normal patterns</span>
                  </div>
                  <div className="text-sm">
                    <p>• Distance range: 80-365 miles from normal</p>
                    <p>• States involved: Texas (4 cities)</p>
                    <p>• Branch network: 8 locations</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Temporal Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">6-hour attack window</span>
                  </div>
                  <div className="text-sm">
                    <p>• Start time: 08:30 AM</p>
                    <p>• End time: 15:15 PM</p>
                    <p>• Peak activity: 11:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};