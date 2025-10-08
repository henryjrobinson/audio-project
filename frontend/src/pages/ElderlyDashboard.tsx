import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Phone,
  Mic,
  Heart,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  Edit3,
  ArrowRight
} from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';

const ElderlyDashboard = () => {
  const [showWriteAssist, setShowWriteAssist] = useState(false);

  // Mock data - elderly user info
  const userInfo = {
    name: "Margaret",
    fullName: "Margaret Thompson",
    photo: "/placeholder.svg"
  };

  // Mock data - prompts from family
  const familyPrompts = [
    {
      id: 1,
      topic: "Mom, can you share your peach pie recipe? We all remember it!",
      requestedBy: "Sarah",
      requestedByPhoto: "/placeholder.svg",
      votes: 5,
      status: 'pending'
    },
    {
      id: 2,
      topic: "What was it like moving from Georgia to Detroit? We'd love to hear more!",
      requestedBy: "Michael",
      requestedByPhoto: "/placeholder.svg",
      votes: 3,
      status: 'pending'
    },
    {
      id: 3,
      topic: "Tell us about your wedding day! What do you remember most?",
      requestedBy: "Emma (Granddaughter)",
      requestedByPhoto: "/placeholder.svg",
      votes: 7,
      status: 'pending'
    }
  ];

  // Mock data - user's stories
  const myStories = [
    {
      id: 1,
      title: "The Christmas with No Money",
      excerpt: "It was 1943, and we didn't have two nickels to rub together...",
      sharedDate: "2 days ago",
      loves: 8,
      comments: 3
    },
    {
      id: 2,
      title: "Dancing with Your Father",
      excerpt: "The first time I saw him across that crowded dance hall...",
      sharedDate: "5 days ago",
      loves: 12,
      comments: 5
    },
    {
      id: 3,
      title: "Teaching Five Kids to Drive",
      excerpt: "Lord have mercy, teaching five teenagers to drive...",
      sharedDate: "1 week ago",
      loves: 10,
      comments: 4
    }
  ];

  // Mock data - family comments about user
  const familyComments = [
    {
      id: 1,
      author: "Sarah",
      photo: "/placeholder.svg",
      comment: "Mom's Sunday dinners were the best part of my childhood. The smell of her biscuits filling the house every Sunday morning is something I'll never forget.",
      topic: "Sunday Dinners",
      canRespond: true
    },
    {
      id: 2,
      author: "Michael",
      photo: "/placeholder.svg",
      comment: "I remember Mom's garden so vividly - the roses, the tomatoes, how she'd spend hours out there. She taught us all the value of patience and care.",
      topic: "Mom's Garden",
      canRespond: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-powder-blue shadow-lg border-b-4 border-tangerine">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-6">
            <Avatar className="h-20 w-20 ring-4 ring-tangerine ring-offset-2">
              <AvatarImage src={userInfo.photo} alt={userInfo.fullName} />
              <AvatarFallback className="text-3xl bg-tangerine text-deep-walnut">MT</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-extrabold text-deep-walnut">
                  Hi {userInfo.name}! 👋💝
                </h1>
                <Badge variant="default" className="font-semibold">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Demo Mode
                </Badge>
              </div>
              <p className="text-2xl text-deep-walnut mt-2 font-semibold">Your family LOVES your stories! ❤️</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Record a Story Section - PROMINENT */}
        <Card className="bg-tangerine text-deep-walnut border-none shadow-2xl card-hover">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold flex items-center gap-3 text-deep-walnut">
              <Mic className="h-9 w-9 emoji-icon" />
              🎤 Share Your Story!
            </CardTitle>
            <CardDescription className="text-deep-walnut text-xl font-semibold">
              Your family can't wait to hear from you! 💕
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Option 1: Record on device */}
              <div className="bg-powder-blue rounded-2xl p-6 border-2 border-warm-gray shadow-xl card-hover">
                <h3 className="font-bold text-2xl mb-3 flex items-center gap-2 text-deep-walnut">
                  <Mic className="h-7 w-7" />
                  🎙️ Record Right Here
                </h3>
                <p className="text-deep-walnut mb-4 text-lg font-medium">Super easy! Just click the big button below!</p>
                <Button
                  size="lg"
                  className="w-full"
                >
                  <Mic className="h-6 w-6 mr-3" />
                  Start Recording Now!
                </Button>
              </div>

              {/* Option 2: Call in */}
              <div className="bg-powder-blue rounded-2xl p-6 border-2 border-warm-gray shadow-xl card-hover">
                <h3 className="font-bold text-2xl mb-3 flex items-center gap-2 text-deep-walnut">
                  <Phone className="h-7 w-7" />
                  📞 Call Us Instead
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-deep-walnut text-base mb-2 font-semibold">📞 Phone Number:</p>
                    <p className="text-3xl font-extrabold text-atomic-teal">1-800-555-STORY</p>
                  </div>
                  <div>
                    <p className="text-deep-walnut text-base mb-2 font-semibold">🔑 Your PIN:</p>
                    <p className="text-3xl font-extrabold text-atomic-teal">1234</p>
                  </div>
                  <p className="text-deep-walnut text-base font-semibold bg-atomic-teal/20 rounded-lg p-3">
                    ✨ No app, no fuss - just call & chat!
                  </p>
                </div>
              </div>
            </div>

            {/* Write option */}
            <div className="bg-powder-blue rounded-2xl p-5 border-2 border-warm-gray shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-2xl flex items-center gap-2 text-deep-walnut">
                    <Edit3 className="h-6 w-6" />
                    ✍️ Like Writing Better?
                  </h3>
                  <p className="text-deep-walnut text-lg font-medium mt-1">Our friendly AI will help you write it out!</p>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowWriteAssist(true)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Let's Write Together!
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Prompts - What They Want to Know */}
        <Card className="shadow-2xl">
          <CardHeader className="bg-powder-blue/30 border-b-2 border-warm-gray">
            <CardTitle className="text-3xl font-extrabold flex items-center gap-2 text-deep-walnut">
              💭 They're Waiting to Hear From You!
            </CardTitle>
            <CardDescription className="text-lg font-semibold text-deep-walnut">
              Your family asked these questions because they love you! 💕
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            {familyPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-powder-blue rounded-2xl p-6 border-2 border-atomic-teal card-hover shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 flex-shrink-0 ring-3 ring-atomic-teal ring-offset-2">
                    <AvatarImage src={prompt.requestedByPhoto} />
                    <AvatarFallback className="bg-atomic-teal text-white font-bold text-lg">
                      {prompt.requestedBy[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xl text-deep-walnut mb-3 font-bold">
                      "{prompt.topic}"
                    </p>
                    <div className="flex items-center gap-3 text-base text-deep-walnut mb-4 font-medium">
                      <span>💬 From {prompt.requestedBy}</span>
                      {prompt.votes > 1 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 bg-tangerine/20 px-2 py-1 rounded-full">
                            <Heart className="h-4 w-4 fill-tangerine text-tangerine" />
                            {prompt.votes} family members want this! 🌟
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" className="flex-1">
                        <Phone className="h-5 w-5 mr-2" />
                        Record Answer 🎙️
                      </Button>
                      <Button size="lg" variant="outline" className="flex-1">
                        <Edit3 className="h-5 w-5 mr-2" />
                        Write It Out ✍️
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-4 bg-tangerine/10 rounded-xl p-5 border-2 border-tangerine">
              <p className="text-deep-walnut text-lg mb-3 font-semibold">Not ready to answer yet? No worries! 😊</p>
              <Button variant="ghost" size="lg" className="font-bold text-deep-walnut">
                I'll Do These Later
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Your Stories */}
        <Card className="shadow-2xl border-3 border-atomic-teal">
          <CardHeader className="bg-atomic-teal/10 border-b-3 border-atomic-teal">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-extrabold flex items-center gap-2 text-deep-walnut">
                  📚 Your Amazing Stories!
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-deep-walnut">
                  Look at all the wonderful memories you've shared! 🌟
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xl px-5 py-2 font-extrabold shadow-lg">
                {myStories.length} Stories! 🎉
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {myStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg p-5 border border-warm-gray hover:border-atomic-teal hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-deep-walnut mb-2">
                      {story.title}
                    </h3>
                    <p className="text-deep-walnut/80 mb-3 line-clamp-2 text-base">
                      {story.excerpt}
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-atomic-teal flex-shrink-0 ml-4" />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-warm-gray">
                  <div className="flex items-center gap-4 text-sm text-deep-walnut/70">
                    <span>Shared {story.sharedDate}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4 fill-tangerine text-tangerine" />
                      {story.loves} family loves
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {story.comments} comments
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-atomic-teal hover:bg-atomic-teal/10">
                    View Story
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="text-center pt-2">
              <Button variant="outline">
                See All My Stories
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What Your Family Said About You */}
        <Card className="shadow-lg border-2 border-atomic-teal">
          <CardHeader className="bg-atomic-teal/5">
            <CardTitle className="text-2xl flex items-center gap-2 text-deep-walnut">
              ❤️ What Your Family Said About You
            </CardTitle>
            <CardDescription className="text-base text-deep-walnut">
              Stories and memories your family has shared
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {familyComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-tangerine/10 rounded-lg p-5 border border-tangerine"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={comment.photo} />
                    <AvatarFallback className="bg-atomic-teal text-white">{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-deep-walnut mb-1">{comment.author}</p>
                    <p className="text-sm text-deep-walnut/70 mb-2">About: {comment.topic}</p>
                    <p className="text-deep-walnut text-base italic">
                      "{comment.comment}"
                    </p>
                  </div>
                </div>

                {comment.canRespond && (
                  <div className="flex gap-2 pt-3 border-t border-tangerine">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Thank Them
                    </Button>
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Add Your Perspective
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-powder-blue/20 border-atomic-teal">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-deep-walnut mb-2">
                Need Help?
              </h3>
              <p className="text-deep-walnut mb-4 text-lg">
                Click the chat button in the corner to get assistance anytime!
              </p>
              <p className="text-sm text-deep-walnut/70">
                Our AI assistant can help you write stories, answer questions, or guide you through anything.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot */}
      <Chatbot
        archiveName={`${userInfo.fullName}'s Stories`}
        hasUnreadInsights={false}
      />
    </div>
  );
};

export default ElderlyDashboard;
