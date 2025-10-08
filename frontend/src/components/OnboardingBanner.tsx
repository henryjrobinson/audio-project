import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingBannerProps {
  onDismiss?: () => void;
}

export const OnboardingBanner = ({ onDismiss }: OnboardingBannerProps) => {
  const navigate = useNavigate();
  const [showDismissModal, setShowDismissModal] = useState(false);
  const [showAgain, setShowAgain] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismissClick = () => {
    setShowDismissModal(true);
  };

  const handleConfirmDismiss = () => {
    // Save preference to localStorage
    localStorage.setItem('hideOnboardingBanner', showAgain ? 'false' : 'true');
    setIsDismissed(true);
    setShowDismissModal(false);
    if (onDismiss) onDismiss();
  };

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  if (isDismissed) return null;

  return (
    <>
      <Card className="bg-gradient-to-r from-tangerine to-harvest-gold border-2 border-tangerine text-white relative overflow-hidden shadow-2xl mb-6">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24" />
        </div>

        <CardContent className="relative p-6 md:p-8">
          {/* Close Button */}
          <button
            onClick={handleDismissClick}
            className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/90 hover:text-white transition-all hover:scale-110 rounded-full hover:bg-white/10"
            aria-label="Dismiss onboarding banner"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-9 w-9 text-tangerine" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-extrabold mb-2">
                  👋 New Here? Let's Get Started!
                </h2>
                <p className="text-lg font-medium text-white/95">
                  Take a quick 2-minute tour to learn how to preserve your family's precious memories.
                  We'll show you everything you need to know!
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Button
                  size="lg"
                  onClick={handleStartOnboarding}
                  className="bg-white text-tangerine hover:bg-white/90 font-bold text-base shadow-lg min-h-[56px] px-8"
                >
                  Start Tour
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dismiss Modal */}
      <Dialog open={showDismissModal} onOpenChange={setShowDismissModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Hide Welcome Banner?</DialogTitle>
            <DialogDescription className="text-base pt-2">
              You can always access the onboarding tour later from your dashboard settings.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="flex items-start space-x-3 p-4 bg-powder-blue/10 rounded-lg border-2 border-powder-blue">
              <Checkbox
                id="show-again"
                checked={showAgain}
                onCheckedChange={(checked) => setShowAgain(checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="show-again"
                  className="text-base font-semibold text-deep-walnut cursor-pointer leading-tight"
                >
                  Show this banner again next time
                </label>
                <p className="text-sm text-deep-walnut/70 mt-1">
                  If unchecked, you won't see this banner when you return, but you can still access onboarding from Settings.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDismissModal(false)}
              className="min-h-[44px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDismiss}
              className="min-h-[44px] bg-tangerine hover:bg-tangerine/90"
            >
              Hide Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
