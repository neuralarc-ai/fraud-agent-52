import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FraudSimulation } from "@/components/FraudSimulation";
import { FraudResults } from "@/components/FraudResults";
import { FraudDashboard } from "@/components/FraudDashboard";
import { AccountDetails } from "@/components/AccountDetails";
import { AgentResponses } from "@/components/AgentResponses";
import { InvestigationTimeline } from "@/components/InvestigationTimeline";

const Index = () => {
  const [currentView, setCurrentView] = useState<"simulation" | "results" | "dashboard">("simulation");
  const [currentScenario, setCurrentScenario] = useState("");

  const handleRunAnalysis = (scenario: string) => {
    setCurrentScenario(scenario);
    setCurrentView("results");
  };

  const handleBackToSimulation = () => {
    setCurrentView("simulation");
    setCurrentScenario("");
  };

  const handleViewDashboard = () => {
    setCurrentView("dashboard");
  };

  if (currentView === "simulation") {
    return <FraudSimulation onRunAnalysis={handleRunAnalysis} />;
  }

  if (currentView === "results") {
    return <FraudResults onBack={handleBackToSimulation} scenario={currentScenario} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <FraudDashboard />
      
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white shadow-elegant border-0">
            <TabsTrigger value="accounts" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Affected Accounts
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Agent Responses
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Investigation Timeline
            </TabsTrigger>
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
