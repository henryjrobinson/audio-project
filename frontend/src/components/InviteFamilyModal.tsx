import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  X, 
  Mail, 
  Users, 
  Heart,
  Send
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface InviteFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteFamilyModal: React.FC<InviteFamilyModalProps> = ({ isOpen, onClose }) => {
  const [invites, setInvites] = useState([
    { email: '', name: '', relationship: '', message: '' }
  ]);

  const addInvite = () => {
    setInvites([...invites, { email: '', name: '', relationship: '', message: '' }]);
  };

  const removeInvite = (index: number) => {
    setInvites(invites.filter((_, i) => i !== index));
  };

  const updateInvite = (index: number, field: string, value: string) => {
    const updated = invites.map((invite, i) => 
      i === index ? { ...invite, [field]: value } : invite
    );
    setInvites(updated);
  };

  const sendInvites = () => {
    const validInvites = invites.filter(invite => invite.email && invite.name);
    if (validInvites.length > 0) {
      showSuccess(`Sent ${validInvites.length} invitation${validInvites.length > 1 ? 's' : ''} successfully!`);
      onClose();
      setInvites([{ email: '', name: '', relationship: '', message: '' }]);
    }
  };

  const relationshipOptions = [
    'Son', 'Daughter', 'Grandson', 'Granddaughter', 
    'Son-in-law', 'Daughter-in-law', 'Sibling', 
    'Niece', 'Nephew', 'Close Friend', 'Other'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold text-gray-900">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Invite Family Members
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Invite family members to help preserve Mom's precious memories. They'll be able to view stories, 
            add their own memories, and collaborate on the legacy project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Why invite family?
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Share the joy of discovering Mom's stories together</li>
              <li>• Add their own memories and perspectives</li>
              <li>• Help identify people and places in stories</li>
              <li>• Receive copies of the final memory book</li>
            </ul>
          </div>

          {/* Invite Forms */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Family Invitations</h4>
              <Button onClick={addInvite} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Another
              </Button>
            </div>

            {invites.map((invite, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Invite #{index + 1}</Badge>
                  {invites.length > 1 && (
                    <Button
                      onClick={() => removeInvite(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`name-${index}`}>Full Name *</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="e.g., Michael Thompson"
                      value={invite.name}
                      onChange={(e) => updateInvite(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`email-${index}`}>Email Address *</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      placeholder="e.g., michael@email.com"
                      value={invite.email}
                      onChange={(e) => updateInvite(index, 'email', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`relationship-${index}`}>Relationship to Mom</Label>
                  <Select onValueChange={(value) => updateInvite(index, 'relationship', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`message-${index}`}>Personal Message (Optional)</Label>
                  <Textarea
                    id={`message-${index}`}
                    placeholder="Add a personal note about why you're inviting them to join Mom's legacy project..."
                    value={invite.message}
                    onChange={(e) => updateInvite(index, 'message', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Preview Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Email Preview
            </h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Subject:</strong> You're invited to help preserve Mom's precious memories</p>
              <p><strong>Message:</strong> Sarah has invited you to join Margaret Thompson's Legacy Project. 
              We're using AI to capture and preserve Mom's life stories through gentle phone conversations. 
              Your participation will help ensure these precious memories are saved for future generations.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-gray-500">
              {invites.filter(i => i.email && i.name).length} of {invites.length} invitations ready to send
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={sendInvites}
                disabled={!invites.some(i => i.email && i.name)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Invitations
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFamilyModal;