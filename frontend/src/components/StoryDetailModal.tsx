import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  Volume2, 
  Heart, 
  Share2, 
  Download, 
  CheckCircle, 
  Clock,
  Calendar,
  User
} from 'lucide-react';

interface StoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    id: number;
    title: string;
    fullContent: string;
    excerpt: string;
    date: string;
    duration: string;
    tags: string[];
    approved: boolean;
    conversationDate: string;
    emotionalMoments: number;
    audioUrl?: string;
    relatedPhotos?: string[];
  };
}

const StoryDetailModal: React.FC<StoryDetailModalProps> = ({ isOpen, onClose, story }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes in seconds

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {story.title}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Captured on {story.conversationDate} • {story.duration}
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              {story.approved ? (
                <Badge className="bg-atomic-teal/20 text-atomic-teal">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approved
                </Badge>
              ) : (
                <Badge className="bg-tangerine/20 text-tangerine">
                  <Clock className="h-3 w-3 mr-1" />
                  Needs Review
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Audio Player */}
          <div className="bg-powder-blue/20 rounded-lg p-4 border border-powder-blue">
            <div className="flex items-center space-x-4">
              <Button
                onClick={togglePlayback}
                size="lg"
                className="rounded-full w-12 h-12 bg-atomic-teal hover:bg-atomic-teal/90"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-deep-walnut">Original Conversation Audio</span>
                  <span className="text-sm text-warm-gray">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div className="w-full bg-warm-gray/30 rounded-full h-2">
                  <div
                    className="bg-atomic-teal h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
              </div>

              <Volume2 className="h-5 w-5 text-atomic-teal" />
            </div>
          </div>

          {/* Story Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Recorded</p>
                <p className="text-sm text-gray-600">{story.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Emotional Moments</p>
                <p className="text-sm text-gray-600">{story.emotionalMoments} detected</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Narrator</p>
                <p className="text-sm text-gray-600">Margaret Thompson</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Story Themes</h4>
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Full Story Content */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Full Story</h4>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {story.fullContent}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share with Family
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            
            {!story.approved && (
              <Button size="sm" className="bg-atomic-teal hover:bg-atomic-teal/90">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Story
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDetailModal;