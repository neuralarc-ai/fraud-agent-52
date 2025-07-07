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
      message: "🚨 FRAUD ALERT ACTIVATED - Priority Level: HIGH. Initiating emergency response protocol. Multiple suspicious cash withdrawals detected across 4 business accounts totaling $127,500. Geographic anomalies spanning 80-365 miles from normal locations. All hands on deck - activating specialized Fraud Response Team immediately.",
      timestamp: "14:23:15",
      type: "system",
      avatar: "🤖"
    },
    {
      agent: "James (Fraud Detection Specialist)",
      message: "Taking lead on pattern analysis. Initial scan reveals this is NOT random - we're dealing with a sophisticated, coordinated attack. All transactions occurred within a 6-hour window between 08:30-15:15. The amounts are strategically under $25,000, showing clear knowledge of BSA reporting thresholds. Geographic spread across Texas indicates either systematic card cloning or insider knowledge of customer travel patterns. This bears hallmarks of organized crime.",
      timestamp: "14:25:33",
      type: "analysis",
      avatar: "🔍"
    },
    {
      agent: "Robert (Risk Assessment Agent)",
      message: "James, your analysis is spot-on. Risk exposure is CRITICAL. I'm calculating total institutional exposure at $127,500 direct, but potential reputational damage could reach $1.2M if not handled properly. These aren't random targets - Metro Construction (8-year relationship), Riverside Medical (12 years), TechFlow (4 years), Lone Star Catering (6 years) - average relationship value $2.3M. Implementing immediate account freezes while preserving critical business operations. Payroll processing for Metro Construction due tomorrow - coordinating surgical restrictions.",
      timestamp: "14:27:18",
      type: "risk",
      avatar: "⚠️"
    },
    {
      agent: "Lisa (Legal Compliance Agent)",
      message: "Legal implications are significant. Under BSA Section 5318(g), we have 30 days for SAR filing, but given the coordinated nature and multi-state scope, I'm expediting FBI financial crimes unit notification. Cross-referencing with FinCEN database shows similar patterns in Dallas (2 weeks ago) and Houston (1 month ago). This elevates to federal jurisdiction under 18 USC 1344. Preparing documentation for potential RICO investigation. Our liability exposure under Regulation CC is limited if we follow proper dispute procedures.",
      timestamp: "14:28:45",
      type: "legal",
      avatar: "⚖️"
    },
    {
      agent: "Diana (Customer Experience Agent)",
      message: "Customer impact mitigation is my absolute priority. I've analyzed all 4 accounts - these represent $9.2M in combined relationships. Metro Construction processes $45K weekly payroll, Riverside Medical handles $230K monthly in patient collections, TechFlow manages $180K in vendor payments, Lone Star operates on thin margins with daily cash flow needs. I'm implementing precision account restrictions - stopping fraud while maintaining business lifelines. Direct CEO contact initiated for all affected businesses.",
      timestamp: "14:29:12",
      type: "customer",
      avatar: "👥"
    },
    {
      agent: "Carlos (Customer Support Specialist)",
      message: "Security fortress is now active. All 4 accounts locked down with military precision. Debit cards neutralized, transaction monitoring at DEFCON 1 level. But here's the critical part - I've white-listed payroll processors, utility payments, and critical vendors. Emergency access protocols established - legitimate business needs can be handled via branch manager override with dual authentication. All 47 Texas branch locations have been alerted with photos, account details, and fraud indicators.",
      timestamp: "14:30:07",
      type: "security",
      avatar: "🛡️"
    },
    {
      agent: "James (Fraud Detection Specialist)",
      message: "🎯 BREAKTHROUGH ALERT! Cross-referencing transaction metadata with recent cybersecurity incidents... FOUND THE SOURCE! SecurePay Solutions - a payment processor used by all 4 businesses - suffered a data breach 3 weeks ago (initially covered up). The criminals have been systematically analyzing customer transaction patterns, identifying optimal withdrawal amounts and locations. This explains the surgical precision of geographic targeting and amount structuring. We're not dealing with random fraud - this is industrial-scale data exploitation!",
      timestamp: "14:32:15",
      type: "breakthrough",
      avatar: "💡"
    },
    {
      agent: "Robert (Risk Assessment Agent)",
      message: "James, that breakthrough changes everything! If SecurePay exposed 4,000+ business customers, we could be looking at the tip of an iceberg. I'm immediately expanding monitoring to all customers using SecurePay (847 accounts, $23M exposure). This systematic approach suggests a 6-8 person operation with IT expertise. Based on attack patterns, estimated criminal profits: $2.3M over 3 weeks. Our rapid response potentially saved $450K in additional planned attacks scheduled for this weekend.",
      timestamp: "14:33:42",
      type: "risk",
      avatar: "📊"
    },
    {
      agent: "Lisa (Legal Compliance Agent)",
      message: "This SecurePay connection transforms our legal strategy. Under 15 USC 1681n, we have subrogation rights against SecurePay for their negligent data security. I'm immediately filing criminal referrals with FBI Cyber Division and coordinating with Texas Attorney General's office. This is now a multi-jurisdictional cybercrime case. Preparing class-action coordination with other affected institutions. Our customers will be fully compensated - SecurePay faces $50M+ in liability exposure.",
      timestamp: "14:34:58",
      type: "legal",
      avatar: "📋"
    },
    {
      agent: "Diana (Customer Experience Agent)",
      message: "Customer crisis management protocol executed flawlessly! All 4 business owners contacted and verified - they confirm NO travel, NO authorized large withdrawals. They're actually GRATEFUL for our rapid response. I've arranged emergency bridge financing for any cash flow disruptions, expedited new card delivery (24-hour rush), and scheduled one-on-one security consultations. Customer sentiment: 100% positive. They view us as protectors, not obstacles. This crisis is becoming a relationship strengthener!",
      timestamp: "14:36:11",
      type: "customer",
      avatar: "💪"
    },
    {
      agent: "Carlos (Customer Support Specialist)",
      message: "Mission accomplished on all fronts! Account fortress remains impenetrable - zero additional fraudulent activity detected. New enhanced security cards with biometric authentication expedited for all customers. I've coordinated with branch managers for white-glove account restoration service. Business operations fully protected: Metro's payroll processing confirmed for tomorrow, Riverside's patient collections uninterrupted, TechFlow's vendor payments secured, Lone Star's daily operations maintained. Customer satisfaction scores through the roof!",
      timestamp: "14:37:28",
      type: "security",
      avatar: "✅"
    },
    {
      agent: "System Orchestrator",
      message: "🏆 MISSION SUCCESS - FRAUD NEUTRALIZED! Organized criminal operation detected, contained, and neutralized. Total confirmed fraudulent amount: $127,500 - 100% recovery expected through insurance and SecurePay liability. Customer relationships not just preserved but STRENGTHENED. Law enforcement fully engaged, criminal network disruption in progress. Estimated criminal losses from our intervention: $2.8M in planned attacks prevented. Team performance: EXCEPTIONAL. This is how fraud response should be done!",
      timestamp: "14:38:45",
      type: "conclusion",
      avatar: "🎯"
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
                  <Card className="border-0 shadow-sm bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                            {conversation.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground text-sm">{conversation.agent}</h4>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={conversation.type === "system" ? "destructive" : 
                                        conversation.type === "breakthrough" ? "default" : 
                                        conversation.type === "conclusion" ? "outline" : "secondary"}
                                className="text-xs"
                              >
                                {conversation.type.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-mono">
                                {conversation.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">{conversation.message}</p>
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