import React, { useState } from 'react';
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
  Share2
} from 'lucide-react';
import StoryDetailModal from '@/components/StoryDetailModal';
import InviteFamilyModal from '@/components/InviteFamilyModal';
import ScheduleCallModal from '@/components/ScheduleCallModal';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={parentInfo.photo} alt={parentInfo.name} />
                <AvatarFallback>{parentInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{parentInfo.name}'s Legacy Project</h1>
                <p className="text-gray-600">Preserving precious memories • Started March 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Progress
              </Button>
              <Button size="sm" onClick={() => setShowScheduleModal(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Phone className="h-5 w-5 mr-2" />
                    Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stats.conversationsCompleted}/{stats.totalConversations}</div>
                  <Progress value={(stats.conversationsCompleted / stats.totalConversations) * 100} className="bg-blue-400" />
                  <p className="text-blue-100 text-sm mt-2">67% Complete</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Stories Captured
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stats.storiesExtracted}</div>
                  <p className="text-green-100 text-sm">From {stats.hoursRecorded} hours of conversation</p>
                  <div className="flex items-center mt-2">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm">Precious memories preserved</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="h-5 w-5 mr-2" />
                    Family Involved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stats.familyMembers}</div>
                  <p className="text-purple-100 text-sm">Members collaborating</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-2 bg-white/20 hover:bg-white/30"
                    onClick={() => setShowInviteModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Invite More
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Recent Conversations
                  </CardTitle>
                  <CardDescription>Latest sessions with Mom</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentConversations.slice(0, 3).map((conversation) => (
                    <div key={conversation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{conversation.topic}</h4>
                        <p className="text-sm text-gray-600">{conversation.date} • {conversation.duration}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {conversation.storiesExtracted} stories
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {conversation.emotionalMoments} emotional moments
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conversation.status === 'processed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-600" />
                    Featured Stories
                  </CardTitle>
                  <CardDescription>Beautiful memories ready to review</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {extractedStories.slice(0, 3).map((story) => (
                    <div key={story.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{story.title}</h4>
                        {story.approved ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <Badge variant="outline" className="text-xs">Needs Review</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{story.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{story.duration}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openStoryDetail(story)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Read
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Next Steps in Mom's Legacy Journey</CardTitle>
                <CardDescription className="text-amber-700">
                  Keep the momentum going - every conversation captures irreplaceable memories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-amber-200">
                    <Calendar className="h-8 w-8 text-amber-600" />
                    <div>
                      <h4 className="font-medium">Schedule Next Call</h4>
                      <p className="text-sm text-gray-600">Continue capturing precious stories</p>
                    </div>
                    <Button size="sm" className="ml-auto" onClick={() => setShowScheduleModal(true)}>
                      Schedule
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-amber-200">
                    <BookOpen className="h-8 w-8 text-amber-600" />
                    <div>
                      <h4 className="font-medium">Review Stories</h4>
                      <p className="text-sm text-gray-600">2 stories awaiting your approval</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">Review</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Conversation History</h2>
                <p className="text-gray-600">All recorded sessions with Mom</p>
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
                        <p className="text-gray-600">{conversation.date} • {conversation.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conversation.status === 'processed' ? (
                          <Badge className="bg-green-100 text-green-800">Processed</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{conversation.storiesExtracted}</div>
                        <div className="text-sm text-blue-800">Stories</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{conversation.emotionalMoments}</div>
                        <div className="text-sm text-red-800">Emotional Moments</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{conversation.duration}</div>
                        <div className="text-sm text-green-800">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">95%</div>
                        <div className="text-sm text-purple-800">Clarity</div>
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
                <h2 className="text-2xl font-bold text-gray-900">Extracted Stories</h2>
                <p className="text-gray-600">Beautiful memories from Mom's conversations</p>
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
                        <p className="text-gray-600 mb-3">{story.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {story.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">{story.date} • {story.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {story.approved ? (
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Needs Review</Badge>
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
                <h2 className="text-2xl font-bold text-gray-900">Family Members</h2>
                <p className="text-gray-600">Everyone helping preserve Mom's legacy</p>
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
                          <p className="text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={member.status === 'Active' ? 'default' : 'secondary'}
                          className={member.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
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
    </div>
  );
};

export default Dashboard;