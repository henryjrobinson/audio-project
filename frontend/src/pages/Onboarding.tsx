import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  Users,
  Brain,
  BookOpen,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [archiveData, setArchiveData] = useState({
    subjectName: '',
    subjectAge: '',
    relationship: '',
    yourName: ''
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save to localStorage and navigate to dashboard
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('archiveData', JSON.stringify(archiveData));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate bg-cloud px-3 py-1 rounded-full shadow-sm border-2 border-golden">
              ✨ Step {step} of {totalSteps}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="min-h-[44px] text-slate hover:text-navy font-medium"
            >
              Skip for now
            </Button>
          </div>
          <Progress value={progress} className="h-3 shadow-md bg-navy/20" />
        </div>

        {/* Step Content */}
        <Card className="shadow-2xl border-4 border-cta">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <>
              <CardHeader className="text-center space-y-3 pb-6 bg-golden/10">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-cta flex items-center justify-center shadow-xl bounce-gentle">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-4xl font-extrabold text-navy">
                  💝 Welcome to Your Family Memory Box!
                </CardTitle>
                <CardDescription className="text-xl font-semibold text-slate">
                  Let's save your family's most precious moments together ✨
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none text-slate text-center mb-8 bg-golden/10 p-4 rounded-xl border-2 border-golden">
                  <p className="text-lg font-medium">
                    🎯 Every story matters. Every laugh, every lesson, every moment—they're all treasures waiting to be discovered!
                    Let's make sure they're never forgotten. 💛
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-5 rounded-xl bg-teal/10 border-2 border-teal card-hover shadow-lg">
                    <div className="flex justify-center mb-3">
                      <div className="h-16 w-16 bg-teal rounded-full flex items-center justify-center shadow-md">
                        <Users className="h-9 w-9 text-white emoji-icon" />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate mb-2 text-lg">👨‍👩‍👧‍👦 The Whole Gang!</h3>
                    <p className="text-sm text-slate font-medium">
                      Everyone chips in with memories, photos, and their favorite stories!
                    </p>
                  </div>

                  <div className="text-center p-5 rounded-xl bg-navy/10 border-2 border-navy card-hover shadow-lg">
                    <div className="flex justify-center mb-3">
                      <div className="h-16 w-16 bg-navy rounded-full flex items-center justify-center shadow-md">
                        <Brain className="h-9 w-9 text-white emoji-icon" />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate mb-2 text-lg">🤖 AI Helper Magic</h3>
                    <p className="text-sm text-slate font-medium">
                      Smart questions help uncover amazing stories you didn't know existed!
                    </p>
                  </div>

                  <div className="text-center p-5 rounded-xl bg-golden/10 border-2 border-golden card-hover shadow-lg">
                    <div className="flex justify-center mb-3">
                      <div className="h-16 w-16 bg-golden rounded-full flex items-center justify-center shadow-md">
                        <BookOpen className="h-9 w-9 text-white emoji-icon" />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate mb-2 text-lg">📚 Amazing Keepsakes</h3>
                    <p className="text-sm text-slate font-medium">
                      Turn stories into beautiful books, videos, and family treasures!
                    </p>
                  </div>
                </div>

                <div className="bg-cta/10 border-3 border-cta rounded-xl p-5 flex items-start gap-4 shadow-lg">
                  <Sparkles className="h-7 w-7 text-cta flex-shrink-0 mt-0.5 emoji-icon" />
                  <div className="text-sm text-slate">
                    <strong className="text-base">⏰ Don't wait!</strong>
                    <p className="mt-1 font-medium">Most families never get around to saving these stories. Start today while the memories are fresh and vivid! 💛</p>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 2: How It Works */}
          {step === 2 && (
            <>
              <CardHeader className="text-center bg-navy/10 pb-6">
                <CardTitle className="text-3xl font-extrabold text-navy">
                  🎮 How It Works - It's Super Easy!
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-slate">
                  Just 4 fun steps to save your family's stories forever ✨
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-5">
                  {/* Step 1 */}
                  <div className="flex gap-4 items-start p-5 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 border-3 border-blue-300 card-hover shadow-lg">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-6 w-6 text-blue-600 emoji-icon" />
                        <h3 className="font-bold text-gray-900 text-lg">👨‍👩‍👧‍👦 Rally the Family!</h3>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        Invite everyone—parents, siblings, kids, cousins! The more the merrier!
                        They can join in with phone calls, texts, photos, or voice recordings. Everyone's invited to the party! 🎉
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 items-start p-5 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 border-3 border-purple-300 card-hover shadow-lg">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-6 w-6 text-purple-600 emoji-icon" />
                        <h3 className="font-bold text-gray-900 text-lg">💬 Start Chatting!</h3>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        Have fun conversations! Schedule calls, record voice notes, or type stories.
                        Our AI buddy asks great questions to help memories flow naturally. It's like storytelling time! 🎙️
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 items-start p-5 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 border-3 border-green-300 card-hover shadow-lg">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-6 w-6 text-green-600 emoji-icon" />
                        <h3 className="font-bold text-gray-900 text-lg">🤖 AI Works Its Magic!</h3>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        Watch as AI finds amazing patterns like "Grandma's Secret Recipes" or "Adventures in the 60s"!
                        It spots connections you never noticed and suggests what to explore next. Mind-blowing! 🌟
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4 items-start p-5 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border-3 border-amber-300 card-hover shadow-lg">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-6 w-6 text-amber-600 emoji-icon" />
                        <h3 className="font-bold text-gray-900 text-lg">📚 Create Amazing Keepsakes!</h3>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        Turn everything into gorgeous recipe books, photo albums, story collections, or videos!
                        Print real books or share digitally. One family archive, endless possibilities! 🎁
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-3 border-indigo-300 rounded-xl p-5 text-center shadow-lg">
                  <p className="text-base text-indigo-900 font-bold">
                    ⏱️ Most families finish in 4-8 weeks with weekly chats!
                  </p>
                  <p className="text-sm text-indigo-700 mt-1 font-medium">You're building something amazing, one story at a time! 💖</p>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 3: Tell us about your project */}
          {step === 3 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Tell Us About Your Project</CardTitle>
                <CardDescription>Help us personalize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="yourName">Your Name</Label>
                    <Input
                      id="yourName"
                      placeholder="Sarah Mitchell"
                      value={archiveData.yourName}
                      onChange={(e) => setArchiveData({ ...archiveData, yourName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subjectName">Who's story are you preserving?</Label>
                    <Input
                      id="subjectName"
                      placeholder="Margaret Thompson"
                      value={archiveData.subjectName}
                      onChange={(e) => setArchiveData({ ...archiveData, subjectName: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">The primary person whose memories you're capturing</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Your Relationship</Label>
                      <Input
                        id="relationship"
                        placeholder="Daughter"
                        value={archiveData.relationship}
                        onChange={(e) => setArchiveData({ ...archiveData, relationship: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subjectAge">Their Age (optional)</Label>
                      <Input
                        id="subjectAge"
                        type="number"
                        placeholder="78"
                        value={archiveData.subjectAge}
                        onChange={(e) => setArchiveData({ ...archiveData, subjectAge: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-powder-blue/20 border border-powder-blue rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <Heart className="h-5 w-5 text-atomic-teal flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-deep-walnut">
                      <p className="font-medium mb-1">Why we ask:</p>
                      <p>This helps us personalize prompts and suggestions for your family. You can always change this later.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 4: What's Next */}
          {step === 4 && (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-atomic-teal" />
                </div>
                <CardTitle className="text-2xl font-bold text-deep-walnut">You're All Set!</CardTitle>
                <CardDescription>Here's what you can do next</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg border-2 border-powder-blue bg-powder-blue/20">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-atomic-teal text-white flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-walnut mb-1">Schedule Your First Call</h3>
                      <p className="text-sm text-warm-gray">
                        Set up a phone conversation to start capturing stories. Our AI will guide the conversation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border-2 border-tangerine/50 bg-tangerine/10">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-tangerine text-white flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-walnut mb-1">Invite Family Members</h3>
                      <p className="text-sm text-warm-gray">
                        Add siblings, children, and other family members to contribute their perspectives.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border-2 border-atomic-teal/50 bg-atomic-teal/10">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-atomic-teal text-white flex items-center justify-center">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-walnut mb-1">Chat with Your AI Assistant</h3>
                      <p className="text-sm text-warm-gray">
                        Have questions? Click the chat icon to get help navigating the platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-tangerine/10 border border-tangerine/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-tangerine flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-deep-walnut">
                      <p className="font-medium mb-1">Pro Tip:</p>
                      <p>Start with a casual conversation about their childhood or a favorite memory.
                      The AI will help you explore deeper from there.</p>
                    </div>
                  </div>
                </div>

                {archiveData.subjectName && (
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <p className="text-sm text-warm-gray">
                      Ready to start preserving <span className="font-semibold text-deep-walnut">{archiveData.subjectName}'s</span> legacy?
                    </p>
                  </div>
                )}
              </CardContent>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="border-t px-6 py-4 flex items-center justify-between bg-white/30">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex gap-2">
              {step < totalSteps && (
                <Button onClick={handleNext} className="gap-2">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              {step === totalSteps && (
                <Button onClick={handleNext} className="gap-2 min-h-[44px] bg-cta hover:bg-cta/90 text-white">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
