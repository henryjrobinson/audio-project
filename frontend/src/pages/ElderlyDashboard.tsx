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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userInfo.photo} alt={userInfo.fullName} />
              <AvatarFallback className="text-2xl">MT</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {userInfo.name}! 👋
                </h1>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Demo Mode
                </Badge>
              </div>
              <p className="text-lg text-gray-600 mt-1">Your family loves hearing your stories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Record a Story Section - PROMINENT */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Mic className="h-7 w-7" />
              Record a New Story
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Share your memories with your family
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Option 1: Record on device */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Record Here
                </h3>
                <p className="text-blue-100 mb-4">Click the button below to start recording</p>
                <Button
                  size="lg"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg py-6"
                >
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </Button>
              </div>

              {/* Option 2: Call in */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call to Record
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Phone Number:</p>
                    <p className="text-2xl font-bold">1-800-555-STORY</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Your PIN:</p>
                    <p className="text-2xl font-bold">1234</p>
                  </div>
                  <p className="text-blue-100 text-sm italic">
                    No app needed - just call and start sharing!
                  </p>
                </div>
              </div>
            </div>

            {/* Write option */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    Prefer to Write?
                  </h3>
                  <p className="text-blue-100 text-sm">Our AI assistant can help you write your story</p>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => setShowWriteAssist(true)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Write with AI Help
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Prompts - What They Want to Know */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
            <CardTitle className="text-2xl flex items-center gap-2">
              💭 Your Family Wants to Know...
            </CardTitle>
            <CardDescription className="text-base">
              Questions and topics your family would love to hear about
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {familyPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-100"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={prompt.requestedByPhoto} />
                    <AvatarFallback>{prompt.requestedBy[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-lg text-gray-900 mb-2 font-medium">
                      "{prompt.topic}"
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>Requested by {prompt.requestedBy}</span>
                      {prompt.votes > 1 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />
                            {prompt.votes} family members want to hear this
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="lg" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Record Answer
                      </Button>
                      <Button size="lg" variant="outline" className="flex-1">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Write Response
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-2">
              <p className="text-gray-500 text-sm mb-2">Can't answer right now?</p>
              <Button variant="ghost" size="sm">
                I'll answer these later
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Your Stories */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  📚 Your Stories
                </CardTitle>
                <CardDescription className="text-base">
                  {myStories.length} stories you've shared with your family
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {myStories.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {myStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2 text-base">
                      {story.excerpt}
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 ml-4" />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Shared {story.sharedDate}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                      {story.loves} family loves
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {story.comments} comments
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
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
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-2xl flex items-center gap-2">
              ❤️ What Your Family Said About You
            </CardTitle>
            <CardDescription className="text-base">
              Stories and memories your family has shared
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {familyComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-5 border border-amber-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={comment.photo} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{comment.author}</p>
                    <p className="text-sm text-gray-500 mb-2">About: {comment.topic}</p>
                    <p className="text-gray-700 text-base italic">
                      "{comment.comment}"
                    </p>
                  </div>
                </div>

                {comment.canRespond && (
                  <div className="flex gap-2 pt-3 border-t border-amber-200">
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
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4 text-lg">
                Click the chat button in the corner to get assistance anytime!
              </p>
              <p className="text-sm text-gray-500">
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
