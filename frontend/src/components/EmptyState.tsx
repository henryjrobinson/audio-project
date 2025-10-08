import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}: EmptyStateProps) => {
  return (
    <Card className="border-2 border-dashed border-slate/30">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="h-16 w-16 rounded-full bg-cloud flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-slate/50" />
        </div>
        <h3 className="text-lg font-semibold text-slate mb-2">{title}</h3>
        <p className="text-slate/70 mb-6 max-w-md">{description}</p>
        <div className="flex gap-3">
          {actionLabel && onAction && (
            <Button onClick={onAction} className="min-h-[44px] bg-cta hover:bg-cta/90 text-white">{actionLabel}</Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction} className="min-h-[44px] border-slate text-slate hover:bg-slate/5">
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
