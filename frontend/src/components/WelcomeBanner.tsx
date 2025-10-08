import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Calendar, Users, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeBannerProps {
  userName?: string;
  subjectName?: string;
  onScheduleCall: () => void;
  onInviteFamily: () => void;
  onDismiss?: () => void;
}

export const WelcomeBanner = ({
  userName,
  subjectName,
  onScheduleCall,
  onInviteFamily,
  onDismiss
}: WelcomeBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('hasSeenWelcomeBanner', 'true');
    if (onDismiss) onDismiss();
  };

  if (isDismissed) return null;

  return (
    <Card className="bg-tangerine border-2 border-warm-gray text-white relative overflow-hidden shadow-2xl">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 bounce-gentle" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -ml-16 -mt-16" />
      </div>

      <CardContent className="relative p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/90 hover:text-white transition-all hover:scale-110"
          aria-label="Dismiss welcome banner"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center bounce-gentle">
                <Sparkles className="h-8 w-8 text-tangerine" />
              </div>
              <h2 className="text-4xl font-extrabold text-white">
                Welcome{userName ? `, ${userName}` : ''}! 🎉
              </h2>
            </div>
            <p className="text-white text-xl font-bold">
              {subjectName
                ? `🎯 Let's start saving ${subjectName}'s amazing memories together!`
                : "🎯 Let's start saving your family's amazing memories together!"}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Action 1: Schedule Call */}
            <div className="bg-white rounded-2xl p-5 hover:bg-white/90 transition-all border-2 border-warm-gray card-hover shadow-xl flex flex-col h-full min-h-[280px] md:min-h-[300px]">
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-powder-blue rounded-full flex items-center justify-center mb-3">
                  <Calendar className="h-7 w-7 text-deep-walnut" />
                </div>
                <h3 className="font-extrabold text-lg mb-2 text-deep-walnut">📅 Start Your First Chat!</h3>
                <p className="text-base text-deep-walnut font-medium">
                  Let's capture some amazing stories together!
                </p>
              </div>
              <Button
                size="lg"
                onClick={onScheduleCall}
                className="w-full font-bold text-base shadow-lg hover:scale-105 transition-transform mt-4 min-h-[44px]"
              >
                Let's Go!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Action 2: Invite Family */}
            <div className="bg-white rounded-2xl p-5 hover:bg-white/90 transition-all border-2 border-warm-gray card-hover shadow-xl flex flex-col h-full min-h-[280px] md:min-h-[300px]">
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-atomic-teal rounded-full flex items-center justify-center mb-3">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-extrabold text-lg mb-2 text-deep-walnut">👨‍👩‍👧‍👦 Rally the Family!</h3>
                <p className="text-base text-deep-walnut font-medium">
                  Get everyone involved in the fun!
                </p>
              </div>
              <Button
                size="lg"
                variant="secondary"
                onClick={onInviteFamily}
                className="w-full font-bold text-base shadow-lg hover:scale-105 transition-transform mt-4 min-h-[44px]"
              >
                Invite Everyone
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Action 3: Chat */}
            <div className="bg-white rounded-2xl p-5 hover:bg-white/90 transition-all border-2 border-warm-gray card-hover shadow-xl flex flex-col h-full min-h-[280px] md:min-h-[300px]">
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-powder-blue rounded-full flex items-center justify-center mb-3">
                  <MessageSquare className="h-7 w-7 text-deep-walnut" />
                </div>
                <h3 className="font-extrabold text-lg mb-2 text-deep-walnut">💬 Need a Hand?</h3>
                <p className="text-base text-deep-walnut font-medium">
                  Our friendly AI is here to help you!
                </p>
              </div>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  // This will be handled by chatbot button
                  const chatButton = document.querySelector('[data-chatbot-button]') as HTMLButtonElement;
                  if (chatButton) chatButton.click();
                }}
                className="w-full font-bold text-base shadow-lg hover:scale-105 transition-transform bg-white text-deep-walnut hover:bg-white mt-4 min-h-[44px]"
              >
                Chat Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-harvest-gold rounded-2xl p-5 border-2 border-warm-gray shadow-xl">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-tangerine" />
              </div>
              <div className="text-base">
                <p className="font-extrabold mb-2 text-xl text-deep-walnut">💡 Quick Tip to Get Started!</p>
                <p className="text-deep-walnut font-medium leading-relaxed">
                  Start with something simple like "Tell me about your favorite meal growing up" or "What was your neighborhood like?"
                  The AI will help uncover deeper, more amazing stories from there! Most families discover incredible stories in their very first chat! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
