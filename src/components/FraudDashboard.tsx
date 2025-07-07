import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Clock, DollarSign, MapPin, Users } from "lucide-react";

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
    <div className="min-h-screen bg-background p-6">
      {/* Header Alert */}
      <div className="bg-gradient-alert rounded-lg p-6 mb-4 shadow-critical">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-critical/20 rounded-full">
            <AlertTriangle className="h-8 w-8 text-critical-foreground animate-pulse-critical" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">FRAUD ALERT ACTIVATED</h1>
            <p className="text-white/90">
              Multiple suspicious cash withdrawals detected across 4 business accounts totaling $127,500
            </p>
          </div>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            {alertInfo.alertLevel}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="bg-card border-critical/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-critical" />
              <div>
                <p className="text-sm text-muted-foreground">Total Exposure</p>
                <p className="text-2xl font-bold text-critical">${alertInfo.totalSuspiciousAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Affected Accounts</p>
                <p className="text-2xl font-bold text-warning">{alertInfo.affectedAccounts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Detection Time</p>
                <p className="text-lg font-semibold text-foreground">14:23:15 EST</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-success/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Response Status</p>
                <p className="text-lg font-semibold text-success">ACTIVE</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Details */}
      <Card className="mb-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-critical" />
            Alert Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Alert ID</p>
              <p className="font-mono text-lg">{alertInfo.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pattern Type</p>
              <p className="text-lg">{alertInfo.patternType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Geographic Anomaly</p>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-warning" />
                <p className="text-lg">Multiple locations outside normal patterns</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};