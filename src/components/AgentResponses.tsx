import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Shield, Scale, Users, Settings, Clock } from "lucide-react";

interface Agent {
  name: string;
  role: string;
  icon: any;
  status: string;
  statusColor: string;
  response: string;
  keyFindings: string[];
  actions: string[];
  timestamp: string;
}

export const AgentResponses = () => {
  const agents: Agent[] = [
    {
      name: "James",
      role: "Fraud Detection Specialist",
      icon: Search,
      status: "INVESTIGATING",
      statusColor: "primary",
      response: "HIGH PRIORITY FRAUD ALERT - Confirmed organized fraud pattern across 4 business accounts. Transaction analysis reveals coordinated geographic and behavioral anomalies with amounts 3-6x normal patterns.",
      keyFindings: [
        "Geographic anomalies: 80-365 miles from normal locations",
        "Behavioral anomalies: 3-6x normal withdrawal amounts",
        "Timing correlation: All within 6-hour window",
        "Potential structuring: Amounts under $25,000 threshold"
      ],
      actions: [
        "Complete transaction pattern analysis",
        "Cross-reference with historical fraud cases",
        "Monitor additional accounts for pattern expansion"
      ],
      timestamp: "14:25:33"
    },
    {
      name: "Robert",
      role: "Risk Assessment Agent",
      icon: Shield,
      status: "ANALYZING",
      statusColor: "warning",
      response: "Institutional risk exposure contained at $127,500 direct exposure. Monitoring 23 similar accounts for pattern expansion. Coordinating protective measures while maintaining business operations continuity.",
      keyFindings: [
        "Direct loss exposure: $127,500",
        "Reputational risk: HIGH - 4 long-term customers affected",
        "Regulatory risk: MODERATE - BSA/AML reporting required",
        "Insurance coverage: 80% of verified losses"
      ],
      actions: [
        "Implement additional account monitoring",
        "Coordinate with insurance for fraud claims",
        "Assess operational impact on business customers"
      ],
      timestamp: "14:27:18"
    },
    {
      name: "Lisa",
      role: "Legal Compliance Agent",
      icon: Scale,
      status: "FILING",
      statusColor: "critical",
      response: "Legal obligations analysis complete. SAR filing required within 30 days for suspected fraud >$5,000. Coordinating with law enforcement and regulatory authorities per BSA requirements.",
      keyFindings: [
        "SAR filing required within 30 days",
        "FBI financial crimes notification needed",
        "Regulation CC provisional credit obligations",
        "Texas Finance Code compliance requirements"
      ],
      actions: [
        "Prepare Suspicious Activity Report",
        "Contact FBI financial crimes unit",
        "Preserve all transaction documentation"
      ],
      timestamp: "14:28:45"
    },
    {
      name: "Diana",
      role: "Customer Experience Agent",
      icon: Users,
      status: "CONTACTING",
      statusColor: "success",
      response: "Customer communication strategy implemented. Direct phone contact initiated with all 4 business owners to verify transactions and protect relationships while supporting investigation integrity.",
      keyFindings: [
        "4 long-term business customers (4-12 years)",
        "High-value relationships requiring careful handling",
        "No customers contacted bank about travel/withdrawals",
        "Communication scripts prepared for each business type"
      ],
      actions: [
        "Complete customer verification calls",
        "Document all customer responses",
        "Coordinate account restoration timeline"
      ],
      timestamp: "14:29:12"
    },
    {
      name: "Carlos",
      role: "Customer Support Specialist",
      icon: Settings,
      status: "SECURED",
      statusColor: "success",
      response: "Account security measures implemented across all 4 accounts. Debit cards suspended, transaction monitoring enhanced, while maintaining critical business operations like payroll and vendor payments.",
      keyFindings: [
        "All accounts restricted with business protections",
        "Debit cards suspended, online banking secured",
        "Payroll and critical payments protected",
        "Branch network alerted to affected customers"
      ],
      actions: [
        "Monitor for additional suspicious activity",
        "Prepare for account restoration process",
        "Coordinate new card issuance with enhanced security"
      ],
      timestamp: "14:30:07"
    }
  ];

  const getStatusBadgeVariant = (color: string) => {
    switch (color) {
      case "primary": return "default";
      case "warning": return "secondary";
      case "critical": return "destructive";
      case "success": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Fraud Response Team</h2>
        <Badge variant="outline" className="text-sm">
          5 agents active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent, index) => {
          const IconComponent = agent.icon;
          return (
            <Card key={index} className="relative h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription className="text-sm">{agent.role}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusBadgeVariant(agent.statusColor)} className="text-xs">
                    {agent.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Agent Response */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm leading-relaxed">{agent.response}</p>
                </div>

                {/* Key Findings */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Findings</h4>
                  <ul className="space-y-1">
                    {agent.keyFindings.map((finding, findingIndex) => (
                      <li key={findingIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Next Actions</h4>
                  <ul className="space-y-1">
                    {agent.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-xs text-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-1 pt-2 border-t text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Updated: {agent.timestamp}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};