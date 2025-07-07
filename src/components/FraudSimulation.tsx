import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Copy, MessageSquare, AlertTriangle, Brain, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimulationProps {
  onRunAnalysis: (scenario: string) => void;
}

export const FraudSimulation = ({ onRunAnalysis }: SimulationProps) => {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [customScenario, setCustomScenario] = useState("");
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const { toast } = useToast();

  const sampleScenarios = [
    {
      id: "business-fraud",
      title: "Business Account Fraud",
      description: "Multiple large cash withdrawals from business accounts in unusual locations",
      prompt: "Suspicious transaction patterns detected on multiple accounts. Large cash withdrawals from business accounts outside normal patterns. Metro Construction LLC withdrawn $27,000 from Dallas and Houston branches (180+ miles from Austin). Riverside Medical Group withdrawn $43,000 from San Antonio and Waco. TechFlow Solutions withdrawn $30,500 from Fort Worth and Corpus Christi. Lone Star Catering withdrawn $27,000 from El Paso and Lubbock. All transactions occurred within 6-hour window today. Investigate and recommend immediate actions.",
      risk: "HIGH"
    },
    {
      id: "identity-theft",
      title: "Identity Theft Pattern",
      description: "Coordinated account takeovers with geographic anomalies",
      prompt: "Multiple customer accounts showing signs of identity theft. New device logins from different states, immediate password changes followed by large transfers. Sarah Chen's account: $85,000 wire to unknown account after login from Nevada. Mike Rodriguez account: $45,000 transferred after access from Florida. Both customers report no travel. Investigate identity theft pattern.",
      risk: "CRITICAL"
    },
    {
      id: "credit-card-fraud",
      title: "Credit Card Fraud Ring",
      description: "Coordinated credit card fraud across multiple merchant types",
      prompt: "Credit card fraud ring detected. 15 stolen cards used at electronics stores, gas stations, and ATMs within 2-hour window. Transaction amounts between $200-$900 to avoid triggers. Geographic pattern shows movement along I-35 corridor. Card numbers from different issuing banks but similar fraud pattern. Investigate coordinated fraud ring.",
      risk: "MEDIUM"
    }
  ];

  const agentConversation = [
    {
      agent: "System Orchestrator",
      message: "FRAUD ALERT ACTIVATED - Priority Level: HIGH. Multiple suspicious cash withdrawals detected across 4 business accounts totaling $127,500. Activating Fraud Response Team.",
      timestamp: "14:23:15"
    },
    {
      agent: "James (Fraud Detection)",
      message: "Confirmed organized fraud pattern. Geographic anomalies 80-365 miles from normal locations. Amounts 3-6x normal patterns. All transactions within 6-hour window. Structuring indicators present.",
      timestamp: "14:25:33"
    },
    {
      agent: "Robert (Risk Assessment)",
      message: "Institutional exposure: $127,500 direct. Monitoring 23 similar accounts. Reputational risk HIGH - 4 long-term customers affected. Regulatory compliance required.",
      timestamp: "14:27:18"
    },
    {
      agent: "Lisa (Legal Compliance)",
      message: "SAR filing required within 30 days. FBI notification needed. Regulation CC obligations triggered. All regulatory timelines being met.",
      timestamp: "14:28:45"
    },
    {
      agent: "Diana (Customer Experience)",
      message: "Customer contact strategy implemented. Verifying transactions with business owners while preserving relationships. 4 high-value customers require careful handling.",
      timestamp: "14:29:12"
    },
    {
      agent: "Carlos (Customer Support)",
      message: "Account security measures active. Cards suspended, monitoring enhanced. Business operations protected - payroll and vendor payments maintained.",
      timestamp: "14:30:07"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Scenario prompt has been copied to your clipboard.",
    });
  };

  const runAnalysis = () => {
    const scenario = selectedScenario || customScenario;
    if (!scenario.trim()) {
      toast({
        title: "No scenario selected",
        description: "Please select a scenario or enter a custom one.",
        variant: "destructive"
      });
      return;
    }

    setShowAgentDialog(true);
    setAnalysisStep(0);
    
    // Simulate agent conversation progression
    const timer = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= agentConversation.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            setShowAgentDialog(false);
            onRunAnalysis(scenario);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Fraud Detection Simulation</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test our AI-powered fraud detection system with realistic scenarios. Watch as multiple agents collaborate to investigate suspicious activities and provide comprehensive analysis.
          </p>
        </div>

        {/* Sample Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Sample Fraud Scenarios
            </CardTitle>
            <CardDescription>
              Choose from pre-built scenarios or create your own custom fraud detection test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleScenarios.map((scenario) => (
                <Card 
                  key={scenario.id} 
                  className={`cursor-pointer transition-all hover:shadow-elegant ${selectedScenario === scenario.prompt ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedScenario(scenario.prompt)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-sm">{scenario.title}</h3>
                      <Badge 
                        variant={scenario.risk === "CRITICAL" ? "destructive" : scenario.risk === "HIGH" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {scenario.risk}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(scenario.prompt);
                      }}
                      className="w-full"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Prompt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Scenario Input */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Scenario</CardTitle>
            <CardDescription>
              Enter your own fraud scenario description for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe a suspicious activity pattern, unusual transactions, or potential fraud scenario..."
              value={customScenario}
              onChange={(e) => setCustomScenario(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Analysis Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">Ready to Run Analysis?</h3>
                <p className="text-muted-foreground">
                  Click "Run Risk Analysis" to activate the AI agent team and watch them collaborate
                </p>
              </div>
              <Button 
                onClick={runAnalysis}
                size="lg"
                className="shadow-fraud"
              >
                <Play className="h-5 w-5 mr-2" />
                Run Risk Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agent Conversation Dialog */}
        <Dialog open={showAgentDialog} onOpenChange={setShowAgentDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                AI Agents Collaborating
              </DialogTitle>
              <DialogDescription>
                Watch as our fraud detection team analyzes the scenario in real-time
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {agentConversation.slice(0, analysisStep + 1).map((conversation, index) => (
                <div key={index} className="animate-fade-in">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">{conversation.agent}</h4>
                            <span className="text-xs text-muted-foreground font-mono">
                              {conversation.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{conversation.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              
              {analysisStep < agentConversation.length - 1 && (
                <div className="flex items-center justify-center p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="animate-pulse w-2 h-2 bg-primary rounded-full" />
                    <div className="animate-pulse w-2 h-2 bg-primary rounded-full animation-delay-200" />
                    <div className="animate-pulse w-2 h-2 bg-primary rounded-full animation-delay-400" />
                    <span className="text-sm ml-2">Agents are analyzing...</span>
                  </div>
                </div>
              )}
              
              {analysisStep >= agentConversation.length - 1 && (
                <div className="text-center p-4">
                  <div className="flex items-center justify-center gap-2 text-success mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-semibold">Analysis Complete</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to fraud investigation dashboard...
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};