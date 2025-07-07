import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FraudSimulation } from "@/components/FraudSimulation";
import { FraudDashboard } from "@/components/FraudDashboard";
import { AccountDetails } from "@/components/AccountDetails";
import { AgentResponses } from "@/components/AgentResponses";
import { InvestigationTimeline } from "@/components/InvestigationTimeline";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentScenario, setCurrentScenario] = useState("");

  const handleRunAnalysis = (scenario: string) => {
    setCurrentScenario(scenario);
    setShowDashboard(true);
  };

  if (!showDashboard) {
    return <FraudSimulation onRunAnalysis={handleRunAnalysis} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <FraudDashboard />
      
      <div className="px-6 pb-6">
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="accounts">Affected Accounts</TabsTrigger>
            <TabsTrigger value="agents">Agent Responses</TabsTrigger>
            <TabsTrigger value="timeline">Investigation Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-6">
            <AccountDetails />
          </TabsContent>
          
          <TabsContent value="agents" className="space-y-6">
            <AgentResponses />
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <InvestigationTimeline />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
