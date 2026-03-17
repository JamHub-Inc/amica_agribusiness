import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Egg
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Solutions = () => {
  const navigate = useNavigate();
  const [activeSolution, setActiveSolution] = useState(0);

  const solutions = [
    {
      id: 1,
      title: "For Poultry Farmers",
      subtitle: "Complete Farm Management Solution",
      description: "End-to-end poultry management from day-old chicks to market-ready birds. Track every aspect of your operation with precision and ease.",
      icon: Egg,
      color: "from-accent to-success",
      bgColor: "bg-accent/10",
      features: [
        "Flock lifecycle management",
        "Feed conversion ratio tracking",
        "Mortality and health monitoring",
        "Egg production analytics",
        "Vaccination schedules",
        "Cost per bird calculations"
      ],
      users: [
        "Small-scale Poultry Farmers",
        "Commercial Layer Farms",
        "Broiler Producers",
        "Hatchery Operations"
      ],
      metrics: [
        { value: "15%", label: "Reduced Mortality" },
        { value: "25%", label: "Better FCR" },
        { value: "40%", label: "Time Saved" }
      ],
      cta: "Explore Poultry Features"
    },
    {
      id: 2,
      title: "For Cooperatives & Groups",
      subtitle: "Multi-Farm Coordination Platform",
      description: "Coordinate multiple farms, manage collective inventory, and streamline group sales with our cooperative-focused tools.",
      icon: Users,
      color: "from-primary to-success",
      bgColor: "bg-primary/10",
      features: [
        "Multi-branch inventory sync",
        "Collective sales management",
        "Member performance tracking",
        "Bulk input purchasing",
        "Shared resource allocation",
        "Consolidated reporting"
      ],
      users: [
        "Agricultural Cooperatives",
        "Farmer Producer Organizations",
        "Self-Help Groups",
        "Community Farming Projects"
      ],
      metrics: [
        { value: "30%", label: "Cost Savings" },
        { value: "50%", label: "Faster Sales" },
        { value: "100%", label: "Transparency" }
      ],
      cta: "See Cooperative Tools"
    },
    {
      id: 3,
      title: "For Agribusiness",
      subtitle: "Enterprise-Grade Agriculture Platform",
      description: "Scale your agricultural enterprise with advanced tools for supply chain management, multi-location operations, and business intelligence.",
      icon: Building,
      color: "from-secondary to-accent",
      bgColor: "bg-secondary/10",
      features: [
        "Supply chain management",
        "Multi-location operations",
        "Advanced analytics & BI",
        "API integrations",
        "Custom reporting",
        "Enterprise security"
      ],
      users: [
        "Agri-Processors",
        "Input Suppliers",
        "Large Commercial Farms",
        "Agricultural Distributors"
      ],
      metrics: [
        { value: "3x", label: "Faster Scaling" },
        { value: "45%", label: "Revenue Growth" },
        { value: "99%", label: "Operational Uptime" }
      ],
      cta: "View Enterprise Solutions"
    }
  ];

  return (
    <section id="solutions" className="bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Trusted Solutions
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Agricultural Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're a small-scale farmer or a large agribusiness, Shamba Track provides tailored solutions 
            to optimize your operations and maximize profitability.
          </p>
        </div>

        {/* Main Solutions Tabs */}
        <div className="max-w-6xl mx-auto mb-20">
          {/* Tab Headers */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                onClick={() => setActiveSolution(index)}
                className={`flex items-center gap-4 px-8 py-6 rounded-2xl text-left transition-all duration-300 ${
                  activeSolution === index
                    ? `${solution.bgColor} border-2 border-primary/20 shadow-2xl transform scale-105`
                    : "bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center`}>
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{solution.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {solutions[activeSolution].title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {solutions[activeSolution].description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-foreground">Key Features</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {solutions[activeSolution].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
                  {solutions[activeSolution].metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${solutions[activeSolution].color} bg-clip-text text-transparent`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${solutions[activeSolution].color} hover:shadow-2xl text-white font-bold px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105`}
                  onClick={() => navigate('/auth/signup')}
                >
                  {solutions[activeSolution].cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                {/* Target Users */}
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h4 className="text-xl font-semibold text-foreground mb-4">Perfect For</h4>
                  <div className="space-y-3">
                    {solutions[activeSolution].users.map((user, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-foreground">{user}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Story */}
                <div className="bg-gradient-to-br from-primary/10 to-success/10 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">Success Story</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {activeSolution === 0 && "Green Valley Poultry increased egg production by 35% and reduced feed costs by 20% using our flock management tools."}
                    {activeSolution === 1 && "Mwema Cooperative streamlined operations across 15 member farms, increasing collective revenue by 60% in 6 months."}
                    {activeSolution === 2 && "AgriPro Enterprises scaled from 3 to 12 locations while maintaining 99% inventory accuracy and real-time reporting."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;