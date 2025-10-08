import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Phone,
  Heart,
  BookOpen,
  Users,
  Calendar,
  Play,
  FileText,
  Star,
  Clock,
  CheckCircle,
  Plus,
  Download,
  Share2,
  AlertCircle
} from 'lucide-react';
import StoryDetailModal from '@/components/StoryDetailModal';
import InviteFamilyModal from '@/components/InviteFamilyModal';
import ScheduleCallModal from '@/components/ScheduleCallModal';
import { Chatbot } from '@/components/Chatbot';
import { WelcomeBanner } from '@/components/WelcomeBanner';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if this is a first-time user
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeBanner');
    const archiveDataStr = localStorage.getItem('archiveData');

    if (!hasSeenWelcome) {
      setShowWelcomeBanner(true);
    }

    if (archiveDataStr) {
      try {
        setUserData(JSON.parse(archiveDataStr));
      } catch (e) {
        console.error('Failed to parse archive data', e);
      }
    }
  }, []);

  // Mock data representing a family's journey
  const parentInfo = {
    name: "Margaret Thompson",
    age: 78,
    photo: "/placeholder.svg",
    relationship: "Mother",
    diagnosis: "Early-stage Alzheimer's",
    diagnosisDate: "March 2024"
  };

  const stats = {
    conversationsCompleted: 8,
    totalConversations: 12,
    storiesExtracted: 23,
    hoursRecorded: 6.5,
    familyMembers: 4
  };

  const recentConversations = [
    {
      id: 1,
      date: "2024-01-15",
      duration: "45 min",
      topic: "Growing up during the Great Depression",
      status: "processed",
      storiesExtracted: 3,
      emotionalMoments: 2
    },
    {
      id: 2,
      date: "2024-01-12",
      duration: "38 min", 
      topic: "Meeting your father at the dance hall",
      status: "processing",
      storiesExtracted: 2,
      emotionalMoments: 4
    },
    {
      id: 3,
      date: "2024-01-08",
      duration: "52 min",
      topic: "Raising five children in the 1960s",
      status: "processed",
      storiesExtracted: 4,
      emotionalMoments: 3
    }
  ];

  const extractedStories = [
    {
      id: 1,
      title: "The Christmas with No Money",
      excerpt: "It was 1943, and we didn't have two nickels to rub together, but Mama made that Christmas magical with nothing but love and creativity...",
      fullContent: `It was 1943, and we didn't have two nickels to rub together, but Mama made that Christmas magical with nothing but love and creativity.

I remember waking up that Christmas morning, expecting nothing under our little tree. Papa had been out of work for months, and we'd been living on beans and cornbread for weeks. But when I came downstairs, there were packages wrapped in brown paper bags, each one tied with string that Mama had saved from the grocery store.

Inside my package was a doll that Mama had sewn from scraps of fabric. She'd used buttons from old clothes for the eyes and yarn from an unraveled sweater for the hair. That doll was more beautiful to me than any store-bought toy could have been, because I could feel the love in every stitch.

My brother got a wooden truck that Papa had carved from a piece of driftwood he'd found by the river. It wasn't painted fancy, but Papa had sanded it so smooth and carved little details like headlights and a tailgate that actually opened.

But the real magic happened when Mama brought out a cake. I don't know how she managed it with no money, but she'd traded some of her preserves to Mrs. Henderson next door for flour and sugar. That cake was just a simple yellow cake with no frosting, but she'd arranged some holly berries on top in the shape of a star.

We sat around that little table, eating our cake and playing with our homemade gifts, and I felt richer than any Rockefeller. Mama had taught us that Christmas wasn't about what you could buy, but about what you could give of yourself. That lesson has stayed with me for 80 years now.

Even today, when I see all the fancy toys and expensive gifts, I think about that Christmas of 1943. It was the most beautiful Christmas of my life, not because of what we had, but because of how much love filled our little house that day.`,
      date: "2024-01-15",
      duration: "3 min read",
      tags: ["Family", "Holidays", "Great Depression"],
      approved: true,
      conversationDate: "January 15, 2024",
      emotionalMoments: 3,
      audioUrl: "/audio/christmas-story.mp3"
    },
    {
      id: 2,
      title: "Dancing with Your Father",
      excerpt: "The first time I saw him across that crowded dance hall, I knew my life was about to change forever. He had the kindest eyes...",
      fullContent: `The first time I saw him across that crowded dance hall, I knew my life was about to change forever. He had the kindest eyes I'd ever seen, and when he smiled, it was like the whole room lit up.

This was 1962, and I was just 18 years old. My girlfriends had dragged me to the Saturday night dance at the community center. I was wearing my best dress - a blue one with little white flowers that I'd saved up three months to buy from Woolworth's.

I was standing by the punch bowl, trying to work up the courage to dance, when I noticed him watching me from across the room. He was tall and lean, with dark hair that kept falling into his eyes. He was wearing a white shirt and dark pants, nothing fancy, but he looked so handsome to me.

For the longest time, we just kept stealing glances at each other. My heart was beating so fast I thought everyone could hear it. Then the band started playing "Moon River," and I saw him start walking toward me. I thought I might faint right there on the spot.

He stopped right in front of me and said, "Would you like to dance?" His voice was soft and gentle, with just a hint of nervousness that made me feel a little braver. I nodded because I couldn't trust my voice to work.

When he took my hand and led me to the dance floor, I felt like I was floating. He was such a good dancer, so gentle and sure of himself. He held me just right - close enough that I could smell his aftershave, but respectful like a true gentleman.

We danced three songs in a row without saying much, just smiling at each other. Finally, during a slow song, he leaned down and whispered, "I'm Robert. What's your name, beautiful?"

When I told him I was Margaret, he said, "Margaret. That's a lovely name for a lovely girl." I blushed so hard I thought my face might catch fire.

That was the beginning of everything. We danced until the last song that night, and he walked me home under the streetlights. By the time we reached my front porch, I knew I was going to marry that man. And sure enough, two years later, I did.

Sixty-two years we've been married now, and I still get butterflies when I think about that first dance. Sometimes when we're sitting in our living room, he'll put on "Moon River" and ask me to dance, just like he did that very first night.`,
      date: "2024-01-12",
      duration: "4 min read", 
      tags: ["Love", "Marriage", "Youth"],
      approved: false,
      conversationDate: "January 12, 2024",
      emotionalMoments: 5,
      audioUrl: "/audio/dancing-story.mp3"
    },
    {
      id: 3,
      title: "Teaching Five Kids to Drive",
      excerpt: "Lord have mercy, teaching five teenagers to drive nearly gave me gray hair before my time. Each one had their own way of terrifying me...",
      fullContent: `Lord have mercy, teaching five teenagers to drive nearly gave me gray hair before my time. Each one had their own way of terrifying me, and I'm amazed we all survived those driving lessons.

Sarah, my oldest, was the most cautious driver you ever saw. She'd grip that steering wheel so tight her knuckles turned white, and she'd drive about 15 miles per hour everywhere we went. I'd say, "Sarah, honey, you can go a little faster," and she'd speed up to maybe 20. It took her six months to work up the courage to drive on the highway.

Then came Michael, and he was the complete opposite. That boy thought he was racing in the Indianapolis 500 every time he got behind the wheel. I spent most of his driving lessons with my foot pressed so hard on the imaginary brake pedal that I wore a hole in the floorboard. "Slow down!" I'd yell, and he'd grin and say, "But Mom, this is fun!"

Jennifer was my dramatic one. Every little thing was a crisis. If another car got within 50 feet of us, she'd scream like we were about to die. One time, a squirrel ran across the road, and she slammed on the brakes so hard we both got whiplash. I said, "Jenny, it's just a squirrel," and she said, "But Mom, what if it had a family?"

Tommy was my absent-minded professor. He'd be driving along just fine, and then he'd see something interesting and completely forget he was driving. Once, he spotted a hawk circling overhead and nearly drove us into Mrs. Peterson's rose bushes. I learned to keep a constant stream of chatter going just to keep his attention on the road.

And then there was little Bobby, my baby. By the time it was his turn to learn, I thought I was an expert driving instructor. How wrong I was! Bobby had this habit of closing his eyes whenever he got nervous. Imagine my horror when I looked over and saw my 16-year-old son driving down Main Street with his eyes squeezed shut, muttering, "I can't look, I can't look!"

The worst was when I tried to teach them all to parallel park. We'd spend hours in the church parking lot, using orange cones that Father Murphy let us borrow. Those poor cones took such a beating - we must have run over them a hundred times. Sarah would take 20 minutes to park in a space big enough for a bus. Michael would try to park at 30 miles per hour. Jennifer would cry if she got within a foot of the curb. Tommy would forget which way to turn the wheel. And Bobby would close his eyes and hope for the best.

But you know what? They all learned eventually, and they're all good drivers now. Well, mostly good. Michael still drives a little too fast, and Jennifer still screams at squirrels, but they've never had a serious accident, knock on wood.

Looking back, those driving lessons were some of the most terrifying and wonderful times of my life. There's something special about sitting in that passenger seat, watching your child take control of that big machine for the first time. It's scary and proud and heartbreaking all at once, because you know they're growing up and won't need you to teach them things much longer.

Now I watch them teaching their own children to drive, and I just smile and remember. And I keep a good supply of antacid on hand for when it's my turn to ride with the grandkids.`,
      date: "2024-01-08",
      duration: "5 min read",
      tags: ["Parenting", "Humor", "Family"],
      approved: true,
      conversationDate: "January 8, 2024",
      emotionalMoments: 4,
      audioUrl: "/audio/driving-story.mp3"
    }
  ];

  const familyMembers = [
    { name: "Sarah Mitchell", role: "Daughter", status: "Active", avatar: "/placeholder.svg" },
    { name: "Michael Thompson", role: "Son", status: "Invited", avatar: "/placeholder.svg" },
    { name: "Jennifer Thompson", role: "Daughter", status: "Active", avatar: "/placeholder.svg" },
    { name: "Emma Mitchell", role: "Granddaughter", status: "Pending", avatar: "/placeholder.svg" }
  ];

  const openStoryDetail = (story: any) => {
    setSelectedStory(story);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-powder-blue shadow-lg border-b-4 border-tangerine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14 ring-4 ring-tangerine ring-offset-2">
                <AvatarImage src={parentInfo.photo} alt={parentInfo.name} />
                <AvatarFallback className="bg-tangerine text-deep-walnut text-lg">
                  {parentInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-deep-walnut">
                    💝 {parentInfo.name}'s Memory Box
                  </h1>
                  <Badge variant="default" className="font-semibold">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Demo Mode
                  </Badge>
                </div>
                <p className="text-deep-walnut font-medium">✨ Collecting precious moments since March 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-2 border-deep-walnut text-deep-walnut hover:bg-deep-walnut/10 hover:scale-105 transition-transform">
                <Share2 className="h-4 w-4 mr-2" />
                Share the Love
              </Button>
              <Button
                size="sm"
                onClick={() => setShowScheduleModal(true)}
                className="shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Chat with Mom
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner for First-Time Users */}
        {showWelcomeBanner && (
          <div className="mb-6">
            <WelcomeBanner
              userName={userData?.yourName}
              subjectName={userData?.subjectName || parentInfo.name}
              onScheduleCall={() => setShowScheduleModal(true)}
              onInviteFamily={() => setShowInviteModal(true)}
              onDismiss={() => setShowWelcomeBanner(false)}
            />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              🏠 Overview
            </TabsTrigger>
            <TabsTrigger value="conversations">
              💬 Chats
            </TabsTrigger>
            <TabsTrigger value="stories">
              📖 Stories
            </TabsTrigger>
            <TabsTrigger value="family">
              👨‍👩‍👧‍👦 Family
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover bg-powder-blue text-deep-walnut shadow-xl border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg font-bold text-deep-walnut">
                    <Phone className="h-6 w-6 mr-2 emoji-icon" />
                    Heart-to-Hearts 💬
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-extrabold mb-3">{stats.conversationsCompleted}/{stats.totalConversations}</div>
                  <Progress value={(stats.conversationsCompleted / stats.totalConversations) * 100} className="bg-deep-walnut/20 h-3 mb-2" />
                  <p className="text-deep-walnut/90 text-sm font-semibold">🎉 You're 67% there! Keep going!</p>
                </CardContent>
              </Card>

              <Card className="card-hover bg-atomic-teal text-white shadow-xl border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg font-bold text-white">
                    <BookOpen className="h-6 w-6 mr-2 emoji-icon" />
                    Stories Unlocked 📖
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-extrabold mb-2">{stats.storiesExtracted}</div>
                  <p className="text-white/90 text-sm mb-2">From {stats.hoursRecorded} hours of magic ✨</p>
                  <div className="flex items-center mt-2 bg-white/20 rounded-lg px-2 py-1">
                    <Heart className="h-5 w-5 mr-2 text-tangerine" />
                    <span className="text-sm font-semibold">Memories saved forever! 💝</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover bg-powder-blue text-deep-walnut shadow-xl border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg font-bold text-deep-walnut">
                    <Users className="h-6 w-6 mr-2 emoji-icon" />
                    Family Squad 👨‍👩‍👧‍👦
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-extrabold mb-2">{stats.familyMembers}</div>
                  <p className="text-deep-walnut/90 text-sm mb-3">Amazing people helping out! 🌟</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-1 font-semibold hover:scale-105 transition-transform shadow-md"
                    onClick={() => setShowInviteModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Invite More Family
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-2 border-atomic-teal">
                <CardHeader className="bg-atomic-teal/10 border-b-2 border-atomic-teal">
                  <CardTitle className="flex items-center text-deep-walnut">
                    <Clock className="h-6 w-6 mr-2" />
                    🎙️ Latest Chats
                  </CardTitle>
                  <CardDescription className="text-deep-walnut font-medium">Your recent heart-to-hearts with Mom</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {recentConversations.slice(0, 3).map((conversation) => (
                    <div key={conversation.id} className="flex items-center justify-between p-4 bg-powder-blue/30 rounded-xl border-2 border-powder-blue hover:border-atomic-teal transition-all card-hover">
                      <div className="flex-1">
                        <h4 className="font-bold text-deep-walnut">{conversation.topic}</h4>
                        <p className="text-sm text-warm-gray font-medium">{conversation.date} • {conversation.duration}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="secondary" className="text-xs bg-atomic-teal/20 text-atomic-teal font-semibold">
                            📖 {conversation.storiesExtracted} stories
                          </Badge>
                          <Badge variant="outline" className="text-xs border-coral-pink text-coral-pink font-semibold">
                            💕 {conversation.emotionalMoments} special moments
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conversation.status === 'processed' ? (
                          <CheckCircle className="h-6 w-6 text-atomic-teal" />
                        ) : (
                          <div className="h-6 w-6 border-2 border-atomic-teal border-t-transparent rounded-full animate-spin" />
                        )}
                        <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                          <Play className="h-5 w-5 text-atomic-teal" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-2 border-tangerine">
                <CardHeader className="bg-tangerine/10 border-b-2 border-tangerine">
                  <CardTitle className="flex items-center text-deep-walnut">
                    <Star className="h-6 w-6 mr-2" />
                    ⭐ Story Highlights
                  </CardTitle>
                  <CardDescription className="text-deep-walnut font-medium">Beautiful moments captured forever</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {extractedStories.slice(0, 3).map((story) => (
                    <div key={story.id} className="p-4 bg-tangerine/10 rounded-xl border-2 border-tangerine/30 hover:border-tangerine transition-all card-hover">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-deep-walnut">{story.title}</h4>
                        {story.approved ? (
                          <CheckCircle className="h-6 w-6 text-atomic-teal flex-shrink-0" />
                        ) : (
                          <Badge variant="outline" className="text-xs bg-tangerine/20 border-tangerine text-deep-walnut font-semibold">✨ Review Me!</Badge>
                        )}
                      </div>
                      <p className="text-sm text-deep-walnut/80 mb-3 font-medium">{story.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-warm-gray font-semibold">{story.duration}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openStoryDetail(story)}
                          className="bg-tangerine/20 hover:bg-tangerine/30 text-deep-walnut font-semibold hover:scale-105 transition-transform"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Read Story
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Card className="bg-tangerine/10 border-4 border-tangerine shadow-2xl">
              <CardHeader>
                <CardTitle className="text-deep-walnut text-2xl flex items-center">
                  🎯 Your Next Adventures
                </CardTitle>
                <CardDescription className="text-deep-walnut font-semibold text-base">
                  Keep the magic going! Every chat saves precious moments forever ✨
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border-3 border-tangerine shadow-lg card-hover">
                    <div className="h-14 w-14 bg-tangerine rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Calendar className="h-7 w-7 text-deep-walnut" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-deep-walnut text-lg">Plan Your Next Chat 💬</h4>
                      <p className="text-sm text-deep-walnut font-medium">More stories are waiting to be discovered!</p>
                    </div>
                    <Button
                      size="sm"
                      className="ml-auto font-bold hover:scale-110 transition-transform shadow-lg"
                      onClick={() => setShowScheduleModal(true)}
                    >
                      Let's Go!
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border-3 border-atomic-teal shadow-lg card-hover">
                    <div className="h-14 w-14 bg-atomic-teal rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <BookOpen className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-deep-walnut text-lg">Review Stories ⭐</h4>
                      <p className="text-sm text-deep-walnut font-medium">2 amazing stories need your love!</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto font-bold hover:scale-110 transition-transform"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-deep-walnut">Conversation History</h2>
                <p className="text-warm-gray">All recorded sessions with Mom</p>
              </div>
              <Button onClick={() => setShowScheduleModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Call
              </Button>
            </div>

            <div className="grid gap-4">
              {recentConversations.map((conversation) => (
                <Card key={conversation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{conversation.topic}</h3>
                        <p className="text-warm-gray">{conversation.date} • {conversation.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conversation.status === 'processed' ? (
                          <Badge className="bg-atomic-teal/20 text-atomic-teal">Processed</Badge>
                        ) : (
                          <Badge className="bg-powder-blue/20 text-atomic-teal">Processing</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-powder-blue/20 rounded-lg">
                        <div className="text-2xl font-bold text-atomic-teal">{conversation.storiesExtracted}</div>
                        <div className="text-sm text-deep-walnut">Stories</div>
                      </div>
                      <div className="text-center p-3 bg-coral-pink/20 rounded-lg">
                        <div className="text-2xl font-bold text-coral-pink">{conversation.emotionalMoments}</div>
                        <div className="text-sm text-deep-walnut">Emotional Moments</div>
                      </div>
                      <div className="text-center p-3 bg-atomic-teal/20 rounded-lg">
                        <div className="text-2xl font-bold text-atomic-teal">{conversation.duration}</div>
                        <div className="text-sm text-deep-walnut">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-powder-blue/20 rounded-lg">
                        <div className="text-2xl font-bold text-atomic-teal">95%</div>
                        <div className="text-sm text-deep-walnut">Clarity</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Transcript
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-deep-walnut">Extracted Stories</h2>
                <p className="text-warm-gray">Beautiful memories from Mom's conversations</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
                <Button>Create Book</Button>
              </div>
            </div>

            <div className="grid gap-6">
              {extractedStories.map((story) => (
                <Card key={story.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                        <p className="text-warm-gray mb-3">{story.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {story.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-warm-gray/80">{story.date} • {story.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {story.approved ? (
                          <Badge className="bg-atomic-teal/20 text-atomic-teal">Approved</Badge>
                        ) : (
                          <Badge className="bg-tangerine/20 text-tangerine">Needs Review</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openStoryDetail(story)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Read Full Story
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Listen to Original
                      </Button>
                      {!story.approved && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-deep-walnut">Family Members</h2>
                <p className="text-warm-gray">Everyone helping preserve Mom's legacy</p>
              </div>
              <Button onClick={() => setShowInviteModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Invite Family Member
              </Button>
            </div>

            <div className="grid gap-4">
              {familyMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-warm-gray">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={member.status === 'Active' ? 'default' : 'secondary'}
                          className={member.status === 'Active' ? 'bg-atomic-teal/20 text-atomic-teal' : ''}
                        >
                          {member.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {member.status === 'Active' ? 'Manage' : 'Resend Invite'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {selectedStory && (
        <StoryDetailModal
          isOpen={!!selectedStory}
          onClose={() => setSelectedStory(null)}
          story={selectedStory}
        />
      )}

      <InviteFamilyModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />

      <ScheduleCallModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />

      {/* Chatbot Assistant */}
      <Chatbot
        archiveName={`${parentInfo.name}'s Legacy Project`}
        hasUnreadInsights={false}
      />
    </div>
  );
};

export default Dashboard;