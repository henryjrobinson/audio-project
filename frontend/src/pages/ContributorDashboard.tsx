import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Mic,
  Camera,
  Edit3,
  Lightbulb,
  Heart,
  TrendingUp,
  Link2,
  Sparkles,
  AlertCircle,
  ThumbsUp,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';

const ContributorDashboard = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Mock user info
  const userInfo = {
    name: "Sarah",
    fullName: "Sarah Mitchell",
    relationship: "Daughter",
    photo: "/placeholder.svg",
    contributionCount: 5
  };

  // Mock archive info
  const archiveInfo = {
    name: "Mom's Life Story",
    subject: "Margaret Thompson"
  };

  // Mock AI-generated personalized prompts
  const personalizedPrompts = [
    {
      id: 1,
      type: 'fill_gap',
      icon: Sparkles,
      color: 'purple',
      title: 'AI Suggestion: Add More Detail',
      content: "You mentioned Mom's garden in your last story. Do you have photos of her roses? The theme 'Mom's Garden' is 60% complete.",
      relatedTheme: "Mom's Garden",
      actions: [
        { label: 'Upload Photos', icon: Camera },
        { label: 'Add Story', icon: Edit3 }
      ]
    },
    {
      id: 2,
      type: 'suggest_media',
      icon: TrendingUp,
      color: 'blue',
      title: 'Fill a Gap: 1960s Era',
      content: "The 1960s era needs more stories. What do you remember from that time? Mom raising you and your siblings?",
      relatedTheme: "Raising Five Children",
      actions: [
        { label: 'Record Memory', icon: Mic },
        { label: 'Skip', icon: null }
      ]
    },
    {
      id: 3,
      type: 'add_detail',
      icon: Heart,
      color: 'pink',
      title: 'Complete the Story',
      content: "Mom mentioned 'Sunday dinners' 3 times but hasn't shared what she actually cooked. Can you help fill in those details?",
      relatedTheme: "Grandma's Southern Cooking",
      actions: [
        { label: 'Share What I Remember', icon: MessageCircle }
      ]
    }
  ];

  // Mock themes with completeness
  const themes = [
    {
      id: 1,
      name: "Grandma's Southern Cooking",
      icon: '🍳',
      completeness: 85,
      contributionCount: 7,
      contributorCount: 4,
      gaps: [
        'Missing: Photos of Sunday dinners',
        'Missing: Your favorite meal memory',
        'Missing: Recipe for peach pie'
      ],
      yourContributions: 2
    },
    {
      id: 2,
      name: "Moving from South to North",
      icon: '🏠',
      completeness: 60,
      contributionCount: 3,
      contributorCount: 2,
      gaps: [
        'You mentioned this once - add more details?',
        'Missing: Why did they move?',
        'Missing: Photos of old house in Georgia'
      ],
      yourContributions: 1
    },
    {
      id: 3,
      name: "Raising Five Children",
      icon: '👨‍👩‍👧‍👦',
      completeness: 70,
      contributionCount: 5,
      contributorCount: 3,
      gaps: [
        'Missing: Stories from the 1960s',
        'Missing: What was hardest?',
        'Missing: Funny moments'
      ],
      yourContributions: 0
    },
    {
      id: 4,
      name: "Mom's Garden",
      icon: '🌹',
      completeness: 45,
      contributionCount: 2,
      contributorCount: 2,
      gaps: [
        'You mentioned roses - add photos?',
        'Missing: What did she grow?',
        'Missing: Who helped her garden?'
      ],
      yourContributions: 1
    }
  ];

  // Mock topic suggestions (what contributors want Mom to discuss)
  const topicSuggestions = [
    {
      id: 1,
      topic: 'Your peach pie recipe',
      suggestedBy: 'You',
      votes: 5,
      status: 'pending',
      voters: ['You', 'Michael', 'Emma', 'Jack', 'Lisa']
    },
    {
      id: 2,
      topic: 'How you met Dad at the dance hall',
      suggestedBy: 'Michael',
      votes: 3,
      status: 'answered',
      voters: ['Michael', 'Emma', 'You']
    },
    {
      id: 3,
      topic: 'Tell us about Uncle Jack\'s funny moments',
      suggestedBy: 'Emma',
      votes: 7,
      status: 'in_progress',
      voters: ['Emma', 'You', 'Michael', 'Lisa', 'Jack', 'Tommy', 'Sarah']
    }
  ];

  // Mock user's contributions
  const myContributions = [
    {
      id: 1,
      type: 'story',
      title: 'Sunday Dinners',
      excerpt: 'Mom\'s biscuits were always the highlight...',
      date: '3 days ago',
      loves: 6,
      relatedThemes: ['Grandma\'s Southern Cooking']
    },
    {
      id: 2,
      type: 'photo',
      title: 'Photos from 1985 family reunion',
      count: 5,
      date: '1 week ago',
      loves: 8,
      relatedThemes: ['Raising Five Children']
    },
    {
      id: 3,
      type: 'story',
      title: 'Mom\'s Garden',
      excerpt: 'I remember the roses, how she\'d spend hours...',
      date: '2 weeks ago',
      loves: 4,
      relatedThemes: ['Mom\'s Garden']
    }
  ];

  // Mock connections AI found
  const connections = [
    {
      id: 1,
      yourStory: 'Sunday Dinners',
      connects: [
        { title: 'The Christmas with No Money', author: 'Mom' },
        { title: 'Biscuits and Gravy', author: 'Michael' }
      ],
      theme: 'Grandma\'s Southern Cooking'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userInfo.photo} alt={userInfo.fullName} />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {archiveInfo.name}
                  </h1>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Demo Mode
                  </Badge>
                </div>
                <p className="text-gray-600">
                  Your Contributions • {userInfo.relationship}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {userInfo.contributionCount} Contributions
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-auto py-4 flex-col gap-2">
                <Edit3 className="h-6 w-6" />
                <span>Add Your Memory</span>
              </Button>
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-auto py-4 flex-col gap-2">
                <Camera className="h-6 w-6" />
                <span>Upload Photos</span>
              </Button>
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-auto py-4 flex-col gap-2">
                <Lightbulb className="h-6 w-6" />
                <span>Suggest Topic for Mom</span>
              </Button>
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-auto py-4 flex-col gap-2">
                <Sparkles className="h-6 w-6" />
                <span>Explore Themes</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personalized AI Prompts */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Personalized Prompts for You
            </CardTitle>
            <CardDescription>
              AI-generated suggestions based on your contributions and archive gaps
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {personalizedPrompts.map((prompt) => {
              const Icon = prompt.icon;
              const colorClasses = {
                purple: 'from-purple-50 to-purple-100 border-purple-200',
                blue: 'from-blue-50 to-blue-100 border-blue-200',
                pink: 'from-pink-50 to-pink-100 border-pink-200'
              }[prompt.color];

              return (
                <div
                  key={prompt.id}
                  className={`bg-gradient-to-r ${colorClasses} rounded-lg p-5 border`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0">
                      <Icon className={`h-6 w-6 text-${prompt.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{prompt.title}</h3>
                      <p className="text-gray-700 mb-2">{prompt.content}</p>
                      {prompt.relatedTheme && (
                        <Badge variant="outline" className="mb-3">
                          Related: {prompt.relatedTheme}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {prompt.actions.map((action, idx) => (
                      <Button key={idx} size="sm" variant={idx === 0 ? 'default' : 'outline'}>
                        {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Themes You Can Help Complete */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-xl flex items-center gap-2">
              🎨 Themes You Can Help Complete
            </CardTitle>
            <CardDescription>
              Help fill gaps and reach 100% completion
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{theme.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{theme.name}</h3>
                      <p className="text-sm text-gray-600">
                        {theme.contributionCount} contributions from {theme.contributorCount} family members
                        {theme.yourContributions > 0 && (
                          <span className="text-blue-600 font-medium ml-2">
                            • You added {theme.yourContributions}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={theme.completeness >= 80 ? 'default' : 'secondary'}
                    className={theme.completeness >= 80 ? 'bg-green-100 text-green-800' : ''}
                  >
                    {theme.completeness}% Complete
                  </Badge>
                </div>

                <Progress value={theme.completeness} className="mb-3" />

                <div className="bg-amber-50 rounded-lg p-3 mb-3 border border-amber-200">
                  <p className="text-sm font-medium text-amber-900 mb-2">What's Missing:</p>
                  <ul className="space-y-1">
                    {theme.gaps.map((gap, idx) => (
                      <li key={idx} className="text-sm text-amber-800 flex items-center gap-2">
                        <span className="w-1 h-1 bg-amber-600 rounded-full" />
                        {gap}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button size="sm" className="w-full" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Contribute to This Theme
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggest Topics for Mom */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
            <CardTitle className="text-xl flex items-center gap-2">
              💡 Suggest Topics for Mom
            </CardTitle>
            <CardDescription>
              What would you like Mom to talk about?
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Suggest new topic */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Suggest a New Topic</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="What would you like Mom to share?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Why this topic? (optional)"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="w-full">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggest This Topic
                </Button>
              </div>
            </div>

            {/* Existing suggestions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Recent Suggestions:</h3>
              {topicSuggestions.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">"{topic.topic}"</p>
                      <p className="text-sm text-gray-600">
                        Suggested by {topic.suggestedBy} • {topic.votes} votes
                      </p>
                    </div>
                    <Badge
                      variant={topic.status === 'answered' ? 'default' : topic.status === 'in_progress' ? 'secondary' : 'outline'}
                      className={
                        topic.status === 'answered' ? 'bg-green-100 text-green-800' :
                        topic.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : ''
                      }
                    >
                      {topic.status === 'answered' ? '✓ Answered' :
                       topic.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </Badge>
                  </div>
                  {topic.status === 'pending' && topic.suggestedBy !== 'You' && (
                    <Button size="sm" variant="outline">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Vote for This
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Contributions */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Your Contributions</CardTitle>
                <CardDescription>Stories and media you've added</CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {myContributions.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {myContributions.map((contribution) => (
              <div
                key={contribution.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {contribution.type === 'story' ? (
                      <FileText className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{contribution.title}</h4>
                    {contribution.excerpt && (
                      <p className="text-sm text-gray-600 mb-2">{contribution.excerpt}</p>
                    )}
                    {contribution.count && (
                      <p className="text-sm text-gray-600 mb-2">{contribution.count} photos</p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{contribution.date}</span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                        {contribution.loves}
                      </span>
                      {contribution.relatedThemes.map((theme) => (
                        <Badge key={theme} variant="outline" className="text-xs">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connections AI Found */}
        <Card className="shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Link2 className="h-6 w-6 text-purple-600" />
              Connections AI Found
            </CardTitle>
            <CardDescription>
              How your stories link to others in the archive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connections.map((connection) => (
              <div key={connection.id} className="bg-white rounded-lg p-5 border border-purple-200">
                <p className="font-medium text-gray-900 mb-3">
                  Your story "<span className="text-purple-600">{connection.yourStory}</span>" connects to:
                </p>
                <div className="space-y-2 mb-3">
                  {connection.connects.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>
                        "{link.title}" by {link.author}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-purple-100">
                  <Badge variant="outline">
                    Theme: {connection.theme}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Link2 className="h-4 w-4 mr-2" />
                    Explore These Connections
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Chatbot */}
      <Chatbot
        archiveName={archiveInfo.name}
        hasUnreadInsights={false}
      />
    </div>
  );
};

export default ContributorDashboard;
