import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Play,
  Heart,
  Clock,
  TrendingUp,
  Activity,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Trophy,
  Target,
  Zap,
  Calendar,
  Send
} from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';

const ViewerDashboard = () => {
  const [encouragementMessage, setEncouragementMessage] = useState('');

  // Mock archive info
  const archiveInfo = {
    name: "Margaret's Life Story",
    subject: "Margaret",
    subjectRelation: "Mom",
    viewerName: "Sarah"
  };

  // Mock real-time activity feed
  const recentActivity = [
    {
      id: 1,
      type: 'story_added',
      title: 'The Christmas with No Money',
      time: '2 hours ago',
      icon: '📖',
      color: 'text-atomic-teal',
      bgColor: 'bg-powder-blue/20'
    },
    {
      id: 2,
      type: 'photo_uploaded',
      title: 'Added 3 photos to "Wedding Day - 1962"',
      time: '5 hours ago',
      icon: '📸',
      color: 'text-tangerine',
      bgColor: 'bg-tangerine/10'
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Completed "Heart-to-Heart" interview #8',
      time: '1 day ago',
      icon: '🎉',
      color: 'text-atomic-teal',
      bgColor: 'bg-atomic-teal/10'
    },
    {
      id: 4,
      type: 'story_added',
      title: 'Teaching Five Kids to Drive',
      time: '2 days ago',
      icon: '📖',
      color: 'text-atomic-teal',
      bgColor: 'bg-powder-blue/20'
    },
    {
      id: 5,
      type: 'audio_recorded',
      title: 'Recorded audio for "Grandma\'s Biscuits"',
      time: '3 days ago',
      icon: '🎤',
      color: 'text-coral-pink',
      bgColor: 'bg-coral-pink/10'
    },
    {
      id: 6,
      type: 'session',
      title: 'Worked on memory box for 45 minutes',
      time: '3 days ago',
      icon: '⏱️',
      color: 'text-tangerine',
      bgColor: 'bg-white/50'
    }
  ];

  // Mock progress metrics
  const progressMetrics = [
    {
      id: 1,
      category: 'Heart-to-Hearts',
      description: '12 guided conversations',
      completed: 8,
      total: 12,
      percentage: 67,
      icon: '💌',
      color: 'from-pink-400 to-rose-500',
      encouragement: "You're doing amazing! Just 4 more conversations to go!"
    },
    {
      id: 2,
      category: 'Life Chapters',
      description: 'Stories from each decade',
      completed: 23,
      total: 40,
      percentage: 58,
      icon: '📚',
      color: 'from-blue-400 to-indigo-500',
      encouragement: "Over halfway there! Your stories are beautiful."
    },
    {
      id: 3,
      category: 'Photo Archive',
      description: 'Digitized & labeled photos',
      completed: 45,
      total: 100,
      percentage: 45,
      icon: '📸',
      color: 'from-purple-400 to-pink-500',
      encouragement: "Great progress on preserving those precious moments!"
    },
    {
      id: 4,
      category: 'Voice Recordings',
      description: 'Stories told in your voice',
      completed: 6,
      total: 15,
      percentage: 40,
      icon: '🎤',
      color: 'from-green-400 to-emerald-500',
      encouragement: "Your voice is the gift that keeps on giving."
    }
  ];

  // Mock weekly stats
  const weeklyStats = {
    storiesAdded: 3,
    photosUploaded: 8,
    timeSpent: 135, // minutes
    sessionsCompleted: 4
  };

  // Mock featured content from the archive
  const featuredStories = [
    {
      id: 1,
      title: "The Christmas with No Money",
      excerpt: "It was 1943, and we didn't have two nickels to rub together, but Mama made that Christmas magical...",
      readTime: '3 min',
      loves: 0, // Viewer hasn't read yet
      hasAudio: true,
      isNew: true
    },
    {
      id: 2,
      title: "Dancing with Your Father",
      excerpt: "The first time I saw him across that crowded dance hall, I knew my life was about to change...",
      readTime: '4 min',
      loves: 0,
      hasAudio: true,
      isNew: true
    },
    {
      id: 3,
      title: "Teaching Five Kids to Drive",
      excerpt: "Lord have mercy, teaching five teenagers to drive nearly gave me gray hair before my time...",
      readTime: '5 min',
      loves: 0,
      hasAudio: true,
      isNew: true
    }
  ];

  const handleSendEncouragement = () => {
    if (encouragementMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending encouragement:', encouragementMessage);
      setEncouragementMessage('');
      // Show success feedback
      alert(`Your message has been sent to ${archiveInfo.subject}! 💌`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-atomic-teal shadow-lg border-b-4 border-tangerine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-champagne">
                  📚 {archiveInfo.name}
                </h1>
                <Badge variant="outline" className="bg-tangerine text-deep-walnut border-tangerine font-semibold">
                  <Activity className="w-3 h-3 mr-1" />
                  Live View
                </Badge>
              </div>
              <p className="text-champagne mt-2 text-lg font-medium">
                Following {archiveInfo.subject}'s memory-building journey 💝
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-tangerine text-deep-walnut min-h-touch-comfortable text-base font-semibold rounded-pill px-8 shadow-md hover:scale-105 transition-transform border-0"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore Archive
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Split-screen Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT SIDE: Real-time Activity Feed */}
          <div className="space-y-6">
            {/* Activity Header */}
            <Card className="bg-powder-blue border-2 border-warm-gray shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2 text-deep-walnut">
                  <Activity className="h-6 w-6" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-deep-walnut font-medium">
                  Real-time updates from {archiveInfo.subject}'s memory box
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Activity Feed */}
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <Card
                  key={activity.id}
                  className="bg-white border-2 border-warm-gray shadow-md hover:scale-102 transition-transform cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${activity.bgColor}`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-deep-walnut text-base">
                          {activity.title}
                        </p>
                        <p className="text-sm font-medium text-warm-gray">
                          {activity.time}
                        </p>
                      </div>
                      {activity.type === 'story_added' && (
                        <Button
                          size="sm"
                          className="bg-atomic-teal text-white min-h-touch font-semibold rounded-pill border-0"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weekly Stats Summary */}
            <Card className="bg-gradient-to-br from-powder-blue to-sky-blue border-2 border-warm-gray shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-deep-walnut">
                  This Week's Progress 📊
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-white/30">
                    <div className="text-3xl font-bold text-deep-walnut">
                      {weeklyStats.storiesAdded}
                    </div>
                    <div className="text-sm font-semibold text-deep-walnut">
                      Stories Added
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/30">
                    <div className="text-3xl font-bold text-deep-walnut">
                      {weeklyStats.photosUploaded}
                    </div>
                    <div className="text-sm font-semibold text-deep-walnut">
                      Photos Uploaded
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/30">
                    <div className="text-3xl font-bold text-deep-walnut">
                      {weeklyStats.timeSpent}
                    </div>
                    <div className="text-sm font-semibold text-deep-walnut">
                      Minutes Creating
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/30">
                    <div className="text-3xl font-bold text-deep-walnut">
                      {weeklyStats.sessionsCompleted}
                    </div>
                    <div className="text-sm font-semibold text-deep-walnut">
                      Sessions Done
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Send Encouragement */}
            <Card className="bg-tangerine border-[3px] border-atomic-teal shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-deep-walnut">
                  <MessageSquare className="h-5 w-5" />
                  Send Encouragement
                </CardTitle>
                <CardDescription className="text-deep-walnut font-medium">
                  Let {archiveInfo.subject} know you're cheering her on! 💪
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <textarea
                    value={encouragementMessage}
                    onChange={(e) => setEncouragementMessage(e.target.value)}
                    placeholder={`"Way to go, ${archiveInfo.subjectRelation}! Your stories are amazing!" 💕`}
                    className="w-full p-4 rounded-lg resize-none bg-white border-[3px] border-warm-gray text-deep-walnut text-base font-body"
                    rows={4}
                  />
                  <Button
                    onClick={handleSendEncouragement}
                    disabled={!encouragementMessage.trim()}
                    className="w-full bg-atomic-teal text-white min-h-touch-comfortable text-base font-semibold rounded-pill border-0 shadow-md"
                    size="lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message 💌
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE: Progress Metrics & Featured Content */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card className="bg-gradient-to-br from-tangerine to-[#FFA55F] border-2 border-warm-gray shadow-lg text-deep-walnut">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Memory Box Progress
                </CardTitle>
                <CardDescription className="text-deep-walnut font-medium text-base">
                  {archiveInfo.subject} is building something incredible! 🌟
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Progress Metrics */}
            <div className="space-y-4">
              {progressMetrics.map((metric) => (
                <Card
                  key={metric.id}
                  className="bg-white border-2 border-warm-gray shadow-md"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${metric.color}`}
                      >
                        {metric.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-deep-walnut">
                            {metric.category}
                          </h3>
                          <span className="font-bold text-lg text-atomic-teal">
                            {metric.percentage}%
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-3 text-warm-gray">
                          {metric.description}
                        </p>
                        {/* Progress Bar */}
                        <div className="h-4 rounded-full overflow-hidden mb-2 bg-warm-gray">
                          <div
                            className="h-full rounded-full transition-all duration-500 bg-atomic-teal"
                            style={{ width: `${metric.percentage}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm font-semibold text-deep-walnut">
                          <span>{metric.completed} of {metric.total} complete</span>
                          <span className="text-xs text-warm-gray">
                            {metric.total - metric.completed} to go
                          </span>
                        </div>
                        {/* Encouragement */}
                        <div className="mt-3 p-3 rounded-lg bg-powder-blue">
                          <p className="text-sm font-semibold flex items-start gap-2 text-deep-walnut">
                            <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            {metric.encouragement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Stories to Read */}
            <Card className="bg-powder-blue border-2 border-warm-gray shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-deep-walnut">
                  <BookOpen className="h-5 w-5" />
                  New Stories to Discover
                </CardTitle>
                <CardDescription className="text-deep-walnut font-medium">
                  Fresh from {archiveInfo.subject}'s memory box 📖
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {featuredStories.map((story) => (
                  <div
                    key={story.id}
                    className="p-4 rounded-lg bg-white border-2 border-warm-gray"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-base text-deep-walnut">
                        {story.title}
                      </h4>
                      {story.isNew && (
                        <Badge className="bg-tangerine text-deep-walnut font-semibold">
                          <Zap className="h-3 w-3 mr-1" />
                          NEW
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-3 line-clamp-2 text-deep-walnut">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-atomic-teal text-white min-h-touch font-semibold rounded-pill border-0"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Story
                      </Button>
                      {story.hasAudio && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="min-h-touch font-semibold rounded-pill border-2"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot
        archiveName={archiveInfo.name}
        hasUnreadInsights={false}
      />
    </div>
  );
};

export default ViewerDashboard;
