import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Building2, MapPin, Clock, DollarSign } from "lucide-react";

interface SuspiciousTransaction {
  amount: number;
  location: string;
  time: string;
  distance: string;
}

interface SuspiciousAccount {
  accountNumber: string;
  businessName: string;
  customerSince: number;
  avgMonthlyBalance: number;
  normalWithdrawals: string;
  suspiciousTransactions: SuspiciousTransaction[];
  totalSuspicious: number;
  riskLevel: "HIGH" | "CRITICAL" | "EXTREME";
}

const getRiskColor = (level: string) => {
  switch (level) {
    case "HIGH": return "high-risk";
    case "CRITICAL": return "critical";
    case "EXTREME": return "critical";
    default: return "medium-risk";
  }
};

export const AccountDetails = () => {
  const suspiciousAccounts: SuspiciousAccount[] = [
    {
      accountNumber: "****-4521",
      businessName: "Metro Construction LLC",
      customerSince: 8,
      avgMonthlyBalance: 85000,
      normalWithdrawals: "2000-8000",
      suspiciousTransactions: [
        { amount: 15000, location: "Dallas branch", time: "09:45 AM", distance: "180 miles" },
        { amount: 12000, location: "Houston branch", time: "11:30 AM", distance: "165 miles" }
      ],
      totalSuspicious: 27000,
      riskLevel: "HIGH"
    },
    {
      accountNumber: "****-7892",
      businessName: "Riverside Medical Group",
      customerSince: 12,
      avgMonthlyBalance: 145000,
      normalWithdrawals: "1500-5000",
      suspiciousTransactions: [
        { amount: 25000, location: "San Antonio branch", time: "10:15 AM", distance: "80 miles" },
        { amount: 18000, location: "Waco branch", time: "02:45 PM", distance: "100 miles" }
      ],
      totalSuspicious: 43000,
      riskLevel: "CRITICAL"
    },
    {
      accountNumber: "****-3156",
      businessName: "TechFlow Solutions Inc",
      customerSince: 4,
      avgMonthlyBalance: 62000,
      normalWithdrawals: "1000-3500",
      suspiciousTransactions: [
        { amount: 22500, location: "Fort Worth branch", time: "08:30 AM", distance: "195 miles" },
        { amount: 8000, location: "Corpus Christi branch", time: "01:20 PM", distance: "210 miles" }
      ],
      totalSuspicious: 30500,
      riskLevel: "CRITICAL"
    },
    {
      accountNumber: "****-9847",
      businessName: "Lone Star Catering",
      customerSince: 6,
      avgMonthlyBalance: 38000,
      normalWithdrawals: "800-2500",
      suspiciousTransactions: [
        { amount: 14000, location: "El Paso branch", time: "11:45 AM", distance: "350 miles" },
        { amount: 13000, location: "Lubbock branch", time: "03:15 PM", distance: "365 miles" }
      ],
      totalSuspicious: 27000,
      riskLevel: "EXTREME"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Affected Business Accounts</h2>
        <Badge variant="outline" className="text-sm">
          4 accounts compromised
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suspiciousAccounts.map((account, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 bg-${getRiskColor(account.riskLevel)}`} />
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{account.businessName}</CardTitle>
                    <CardDescription className="font-mono">{account.accountNumber}</CardDescription>
                  </div>
                </div>
                <Badge 
                  variant={account.riskLevel === "EXTREME" ? "destructive" : account.riskLevel === "CRITICAL" ? "destructive" : "secondary"}
                  className="font-semibold"
                >
                  {account.riskLevel} RISK
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Account Info */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Customer Since</p>
                  <p className="font-semibold">{account.customerSince} years</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Balance</p>
                  <p className="font-semibold">${account.avgMonthlyBalance.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Normal Withdrawals</p>
                  <p className="font-semibold">${account.normalWithdrawals}</p>
                </div>
              </div>

              {/* Suspicious Transactions */}
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-critical" />
                  Suspicious Transactions
                </h4>
                <div className="space-y-3">
                  {account.suspiciousTransactions.map((transaction, txIndex) => (
                    <div key={txIndex} className="p-3 border border-critical/20 rounded-lg bg-critical/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-critical text-lg">
                          ${transaction.amount.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {transaction.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-warning" />
                          {transaction.location}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {transaction.distance}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Total Suspicious</p>
                  <p className="text-xl font-bold text-critical">
                    ${account.totalSuspicious.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="security" size="sm">
                    Secure Account
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Customer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};