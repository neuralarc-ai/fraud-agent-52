import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Shield, Users, FileText, DollarSign, MapPin, TrendingUp } from "lucide-react";

interface FraudResultsProps {
  onBack: () => void;
  scenario: string;
}

export const FraudResults = ({ onBack, scenario }: FraudResultsProps) => {
  const fraudResults = {
    status: "CONFIRMED",
    confidence: 98,
    totalAmount: 127500,
    affectedAccounts: 4,
    riskLevel: "HIGH",
    responseTime: "2 minutes",
    recoveryProbability: 95
  };

  const threatIntelligence = {
    source: "Compromised Payment Processor",
    method: "Insider Knowledge Exploitation",
    sophistication: "Advanced",
    geographical: "Multi-state Operation",
    timeline: "3-week planning period"
  };

  const affectedAccounts = [
    { name: "Metro Construction LLC", amount: 27000, status: "Secured", risk: "HIGH" },
    { name: "Riverside Medical Group", amount: 43000, status: "Secured", risk: "CRITICAL" },
    { name: "TechFlow Solutions Inc", amount: 30500, status: "Secured", risk: "CRITICAL" },
    { name: "Lone Star Catering", amount: 27000, status: "Secured", risk: "EXTREME" }
  ];

  const responseActions = [
    {
      category: "Immediate Security",
      actions: [
        "All accounts frozen and secured",
        "Debit cards suspended immediately",
        "Enhanced monitoring activated",
        "Emergency access protocols established"
      ],
      status: "Completed",
      timestamp: "14:25:00"
    },
    {
      category: "Legal & Compliance",
      actions: [
        "FBI financial crimes unit notified",
        "Suspicious Activity Report (SAR) filed",
        "Documentation preserved and secured",
        "Regulatory authorities contacted"
      ],
      status: "In Progress",
      timestamp: "14:30:00"
    },
    {
      category: "Customer Protection",
      actions: [
        "All customers contacted and verified",
        "Business operations continuity maintained",
        "Recovery process initiated",
        "Enhanced security measures implemented"
      ],
      status: "Ongoing",
      timestamp: "14:35:00"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header with Back Button */}
      <div className="bg-gradient-alert p-6 shadow-critical">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Simulation
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <AlertTriangle className="h-8 w-8 text-white animate-pulse-critical" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">FRAUD INVESTIGATION RESULTS</h1>
                <p className="text-white/90">Comprehensive analysis and response summary</p>
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-white/80 text-sm">Status</p>
                <p className="text-white font-bold text-xl">{fraudResults.status}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Confidence</p>
                <p className="text-white font-bold text-xl">{fraudResults.confidence}%</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Response Time</p>
                <p className="text-white font-bold text-xl">{fraudResults.responseTime}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Recovery Probability</p>
                <p className="text-white font-bold text-xl">{fraudResults.recoveryProbability}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6 -mt-4 relative z-10">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-critical" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Fraud Amount</p>
                  <p className="text-2xl font-bold text-critical">${fraudResults.totalAmount.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-critical/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-warning" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Accounts Compromised</p>
                  <p className="text-2xl font-bold text-warning">{fraudResults.affectedAccounts}</p>
                </div>
                <Users className="h-8 w-8 text-warning/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Detection Confidence</p>
                  <p className="text-2xl font-bold text-primary">{fraudResults.confidence}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant bg-white">
            <div className="absolute top-0 left-0 w-full h-1 bg-success" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recovery Rate</p>
                  <p className="text-2xl font-bold text-success">{fraudResults.recoveryProbability}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Intelligence */}
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-critical" />
                Threat Intelligence Summary
              </CardTitle>
              <CardDescription>Analysis of fraud methodology and attack vectors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Attack Source</span>
                  <span className="text-critical font-semibold">{threatIntelligence.source}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Method</span>
                  <span>{threatIntelligence.method}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Sophistication</span>
                  <Badge variant="destructive">{threatIntelligence.sophistication}</Badge>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Geographic Scope</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-warning" />
                    {threatIntelligence.geographical}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Planning Timeline</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    {threatIntelligence.timeline}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affected Accounts Summary */}
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-warning" />
                Affected Accounts Status
              </CardTitle>
              <CardDescription>Current security status and exposure details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {affectedAccounts.map((account, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{account.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={account.risk === "EXTREME" ? "destructive" : account.risk === "CRITICAL" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {account.risk}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-success/10 text-success">
                          {account.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fraudulent Amount</span>
                      <span className="font-bold text-critical">${account.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Actions Timeline */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Response Actions & Timeline
            </CardTitle>
            <CardDescription>Comprehensive breakdown of all actions taken during incident response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {responseActions.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">{category.category}</h4>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={category.status === "Completed" ? "outline" : category.status === "In Progress" ? "secondary" : "destructive"}
                        className={category.status === "Completed" ? "bg-success/10 text-success" : ""}
                      >
                        {category.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">{category.timestamp}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <Button 
            onClick={onBack} 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-fraud"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Run Another Analysis
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-sm"
          >
            <FileText className="h-5 w-5 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};