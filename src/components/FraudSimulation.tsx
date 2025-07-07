import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Copy, MessageSquare, AlertTriangle, Brain, Users, RefreshCw, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimulationProps {
  onRunAnalysis: (scenario: string) => void;
}

export const FraudSimulation = ({ onRunAnalysis }: SimulationProps) => {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [customScenario, setCustomScenario] = useState("");
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollRef.current && showAgentDialog) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [analysisStep, showAgentDialog]);

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
      message: "🚨 FRAUD ALERT ACTIVATED - Priority Level: HIGH. Multiple suspicious cash withdrawals detected across 4 business accounts totaling $127,500. Geographic anomalies spanning 80-365 miles from normal locations. Activating Fraud Response Team immediately.",
      timestamp: "14:23:15",
      type: "system"
    },
    {
      agent: "James (Fraud Detection)",
      message: "Initial pattern analysis complete. I'm seeing a sophisticated, coordinated attack. All transactions occurred within a 6-hour window - this isn't random. The amounts are strategically under $25,000, suggesting knowledge of reporting thresholds. Geographic spread indicates either stolen cards or insider knowledge of customer travel patterns.",
      timestamp: "14:25:33",
      type: "analysis"
    },
    {
      agent: "Robert (Risk Assessment)",
      message: "James, your analysis aligns with our threat models. I'm calculating total institutional exposure at $127,500 direct, but potential reputational damage could be 10x that amount. These are our premium business customers - average relationship length 7.5 years. I'm immediately implementing account freezes while preserving critical business operations.",
      timestamp: "14:27:18",
      type: "risk"
    },
    {
      agent: "Lisa (Legal Compliance)",
      message: "Regulatory implications are significant here. Under BSA requirements, we have 30 days for SAR filing, but given the coordinated nature, I'm expediting FBI notification. The geographic spread across state lines elevates this to federal jurisdiction. I'm also reviewing our liability exposure under Regulation CC.",
      timestamp: "14:28:45",
      type: "legal"
    },
    {
      agent: "Diana (Customer Experience)",
      message: "Customer impact mitigation is my priority. I've reviewed all 4 accounts - these are long-standing, high-value relationships. Metro Construction has payroll processing tomorrow, Riverside Medical has vendor payments due. I'm implementing surgical account restrictions to stop fraud while maintaining business continuity.",
      timestamp: "14:29:12",
      type: "customer"
    },
    {
      agent: "Carlos (Customer Support)",
      message: "Security measures are now active across all accounts. Debit cards suspended, transaction monitoring at maximum sensitivity. However, I've white-listed payroll processors and critical vendors. Emergency access protocols established for legitimate business needs. All branch locations have been alerted with photos and account details.",
      timestamp: "14:30:07",
      type: "security"
    },
    {
      agent: "James (Fraud Detection)",
      message: "BREAKTHROUGH: Cross-referencing transaction data with recent security breaches... I found the source! A payment processor used by all 4 businesses was compromised 3 weeks ago. The criminals have been planning this systematically. This explains the inside knowledge of customer patterns.",
      timestamp: "14:32:15",
      type: "breakthrough"
    },
    {
      agent: "System Orchestrator",
      message: "✅ FRAUD CONFIRMED - Organized criminal operation leveraging compromised payment processor data. Total confirmed fraudulent amount: $127,500. All accounts secured, customers contacted, law enforcement notified. Estimated recovery: 95% through insurance and rapid response. Case escalated to federal cybercrime task force.",
      timestamp: "14:35:22",
      type: "conclusion"
    }
  ];

  const sampleForm = {
    title: "Quick Test - Business Account Fraud",
    content: `FRAUD ALERT: Suspicious transactions detected on multiple business accounts

ACCOUNT DETAILS:
- Metro Construction LLC (****-4521): $27,000 withdrawn from Dallas & Houston branches
- Riverside Medical Group (****-7892): $43,000 withdrawn from San Antonio & Waco  
- TechFlow Solutions (****-3156): $30,500 withdrawn from Fort Worth & Corpus Christi
- Lone Star Catering (****-9847): $27,000 withdrawn from El Paso & Lubbock

ANOMALY INDICATORS:
• Geographic: All locations 80-365 miles from normal patterns
• Temporal: All transactions within 6-hour window (08:30-15:15)
• Behavioral: Amounts 3-6x normal withdrawal patterns
• Structural: All amounts under $25,000 reporting threshold

RISK FACTORS:
- Total exposure: $127,500
- Customer relationship impact: 4 long-term business accounts (4-12 years)
- Operational impact: Payroll and vendor payment disruptions possible
- Regulatory: BSA/AML reporting requirements triggered

REQUEST: Immediate investigation and response protocol activation.`
  };

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
    setShowResults(false);
    
    // Simulate agent conversation progression
    const timer = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= agentConversation.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            setShowResults(true);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800); // Faster conversation
  };

  const resetAnalysis = () => {
    setShowAgentDialog(false);
    setShowResults(false);
    setAnalysisStep(0);
    setSelectedScenario("");
    setCustomScenario("");
  };

  const viewDashboard = () => {
    const scenario = selectedScenario || customScenario;
    setShowAgentDialog(false);
    onRunAnalysis(scenario);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-primary p-8 rounded-2xl shadow-fraud">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="relative z-10 text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-elegant">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white mb-2">AI Fraud Detection Simulation</h1>
                <p className="text-xl text-white/90">Experience next-generation fraud prevention in action</p>
              </div>
            </div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Test our advanced AI-powered fraud detection system with realistic scenarios. Watch as multiple specialized agents collaborate in real-time to investigate suspicious activities, analyze patterns, and provide comprehensive security responses.
            </p>
          </div>
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
            
            {/* Sample Form for Quick Testing */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-dashed border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-foreground">{sampleForm.title}</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(sampleForm.content)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setCustomScenario(sampleForm.content)}
                  >
                    Use This Form
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-card p-3 rounded border font-mono whitespace-pre-line">
                {sampleForm.content}
              </div>
            </div>
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
          <DialogContent className="max-w-5xl max-h-[85vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                AI Fraud Detection Team - Live Analysis
              </DialogTitle>
              <DialogDescription>
                Watch our specialized agents collaborate in real-time to analyze fraud patterns and coordinate response
              </DialogDescription>
            </DialogHeader>
            
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-[60vh]"
              style={{ scrollBehavior: 'smooth' }}
            >
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
              
              {showResults && (
                <div className="space-y-6 mt-6 p-6 bg-gradient-alert rounded-lg animate-fade-in">
                  {/* Fraud Detection Results */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="p-3 bg-critical/20 rounded-full">
                        <AlertTriangle className="h-8 w-8 text-white animate-pulse-critical" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">FRAUD CONFIRMED</h2>
                    </div>
                    <p className="text-white/90 text-lg">
                      Organized criminal operation detected - Immediate action required
                    </p>
                  </div>

                  {/* Key Findings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          Confirmed Details
                        </h3>
                        <ul className="space-y-2 text-sm text-white/90">
                          <li>• Total fraudulent amount: $127,500</li>
                          <li>• 4 business accounts compromised</li>
                          <li>• Payment processor breach identified</li>
                          <li>• Federal jurisdiction case</li>
                          <li>• 95% recovery probability</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-critical" />
                          Risk Factors
                        </h3>
                        <ul className="space-y-2 text-sm text-white/90">
                          <li>• Sophisticated organized crime</li>
                          <li>• Inside knowledge exploitation</li>
                          <li>• Multi-state operation</li>
                          <li>• Business disruption potential</li>
                          <li>• Regulatory compliance required</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Summary */}
                  <Card className="bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-3">Immediate Actions Taken</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/90">
                        <div>
                          <p className="font-medium mb-2">Security</p>
                          <ul className="space-y-1">
                            <li>✓ Accounts secured</li>
                            <li>✓ Cards suspended</li>
                            <li>✓ Monitoring enhanced</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Legal/Compliance</p>
                          <ul className="space-y-1">
                            <li>✓ FBI notified</li>
                            <li>✓ SAR filing initiated</li>
                            <li>✓ Documentation secured</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Customer Care</p>
                          <ul className="space-y-1">
                            <li>✓ Customers contacted</li>
                            <li>✓ Business continuity maintained</li>
                            <li>✓ Recovery process started</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <Button 
                      onClick={viewDashboard}
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90"
                    >
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      View Investigation Dashboard
                    </Button>
                    <Button 
                      onClick={() => window.open("/", "_blank")}
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Open in New Window
                    </Button>
                    <Button 
                      onClick={resetAnalysis}
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <RefreshCw className="h-5 w-5 mr-2" />
                      New Analysis
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};