import { Heart, ArrowRight, Users, Brain, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [showDemoMode, setShowDemoMode] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding (don't redirect, just track)
    const onboarded = localStorage.getItem('hasCompletedOnboarding');
    setHasOnboarded(onboarded === 'true');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Logo/Icon */}
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-tangerine flex items-center justify-center shadow-xl">
                <Heart className="h-10 w-10 text-deep-walnut" />
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-deep-walnut">
                Voice Legacy
              </h1>
              <p className="text-2xl md:text-3xl text-deep-walnut font-medium">
                Preserve precious memories before they're gone forever
              </p>
              <p className="text-lg text-deep-walnut/80 max-w-2xl mx-auto">
                Capture your family's stories, wisdom, and life experiences with AI-powered conversations.
                Create beautiful books, albums, and collections to treasure for generations.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              {hasOnboarded ? (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/onboarding')}
                    className="text-lg px-8 py-6"
                  >
                    View Onboarding Tour Again
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate('/onboarding')}
                    className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Preserving Memories
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowDemoMode(!showDemoMode)}
                    className="text-lg px-8 py-6"
                  >
                    View Demo Dashboards
                  </Button>
                </>
              )}
            </div>

            {/* Demo Mode Buttons */}
            {showDemoMode && (
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <Button
                  onClick={() => navigate('/dashboard')}
                  size="sm"
                >
                  Owner Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/dashboard/elderly')}
                  className="bg-powder-blue hover:bg-powder-blue/90 text-deep-walnut"
                  size="sm"
                >
                  Elderly Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/dashboard/contributor')}
                  variant="secondary"
                  size="sm"
                >
                  Contributor Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/dashboard/viewer')}
                  className="bg-atomic-teal hover:bg-atomic-teal/90 text-white"
                  size="sm"
                >
                  Viewer Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 border-atomic-teal shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-full bg-atomic-teal flex items-center justify-center">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-deep-walnut">Family Collaboration</h3>
              <p className="text-deep-walnut/80">
                Everyone contributes memories, photos, and stories together. Multiple perspectives create richer narratives.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-powder-blue shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-full bg-powder-blue flex items-center justify-center">
                  <Brain className="h-7 w-7 text-deep-walnut" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-deep-walnut">AI-Powered Intelligence</h3>
              <p className="text-deep-walnut/80">
                Our AI discovers themes, asks smart follow-up questions, and helps organize memories automatically.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-tangerine shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-full bg-tangerine flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-deep-walnut" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-deep-walnut">Beautiful Outputs</h3>
              <p className="text-deep-walnut/80">
                Create recipe books, photo albums, story books, video montages, and physical printed keepsakes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Now Section */}
      <div className="bg-tangerine/10 border-y border-tangerine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start gap-4">
            <Sparkles className="h-8 w-8 text-tangerine flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-deep-walnut">Why Start Now?</h2>
              <p className="text-deep-walnut text-lg">
                <strong>70% of families</strong> never capture their loved ones' stories. Every day that passes,
                precious memories fade. The time to start is today, while those memories are still vivid
                and your loved ones can share their wisdom.
              </p>
              <p className="text-deep-walnut/80">
                Whether it's a grandparent with Alzheimer's, a parent reaching their 80s, or simply wanting
                to preserve family history before it's too late - Voice Legacy makes it easy to capture what matters most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-deep-walnut mb-4">
          Start Preserving Your Family's Legacy Today
        </h2>
        <p className="text-xl text-deep-walnut mb-8">
          Get started in less than 5 minutes. No credit card required.
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/onboarding')}
          className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
        >
          Begin Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;