import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Phone, 
  Heart,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { showSuccess } from '@/utils/toast';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('45');
  const [topics, setTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const suggestedTopics = [
    'Childhood memories',
    'School and education',
    'First job and career',
    'Meeting your spouse',
    'Wedding day',
    'Raising children',
    'Family traditions',
    'Holiday memories',
    'Travel adventures',
    'Life lessons learned',
    'Proudest moments',
    'Overcoming challenges'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const toggleTopic = (topic: string) => {
    setTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const addCustomTopic = () => {
    if (customTopic.trim() && !topics.includes(customTopic.trim())) {
      setTopics(prev => [...prev, customTopic.trim()]);
      setCustomTopic('');
    }
  };

  const scheduleCall = () => {
    if (selectedDate && selectedTime) {
      showSuccess('Call scheduled successfully! Mom will receive a gentle reminder call 30 minutes before.');
      onClose();
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setTopics([]);
      setSpecialNotes('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold text-gray-900">
            <Phone className="h-5 w-5 mr-2 text-blue-600" />
            Schedule AI Conversation
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Schedule a gentle phone conversation with our AI to capture more of Mom's precious memories. 
            The AI will guide the conversation naturally and extract beautiful stories.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* How it Works */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-green-900 mb-2 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              How our AI conversations work
            </h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Our AI calls Mom at the scheduled time with a warm, friendly voice</li>
              <li>• Natural conversation flows based on her responses and energy level</li>
              <li>• Stories are automatically transcribed and organized</li>
              <li>• You'll receive a summary within 24 hours</li>
            </ul>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Select Time</Label>
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label>Expected Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes (recommended)</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              Our AI adapts to Mom's energy level and can end early if needed
            </p>
          </div>

          {/* Topic Suggestions */}
          <div>
            <Label className="flex items-center mb-3">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Conversation Topics (Optional)
            </Label>
            <p className="text-sm text-gray-600 mb-3">
              Select topics you'd like the AI to explore, or let it flow naturally based on Mom's responses.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {suggestedTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant={topics.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100 justify-center py-2"
                  onClick={() => toggleTopic(topic)}
                >
                  {topics.includes(topic) && <CheckCircle className="h-3 w-3 mr-1" />}
                  {topic}
                </Badge>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Add custom topic..."
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomTopic()}
              />
              <Button onClick={addCustomTopic} variant="outline" size="sm">
                Add
              </Button>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <Label htmlFor="notes">Special Notes for AI (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific guidance for the AI? (e.g., 'Mom gets tired easily, keep it light' or 'She loves talking about her garden')"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Selected Topics Preview */}
          {topics.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-medium text-blue-900 mb-2">Selected Topics:</h4>
              <div className="flex flex-wrap gap-1">
                {topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-500">
              <Clock className="h-4 w-4 inline mr-1" />
              Mom will receive a gentle reminder 30 minutes before
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={scheduleCall}
                disabled={!selectedDate || !selectedTime}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleCallModal;