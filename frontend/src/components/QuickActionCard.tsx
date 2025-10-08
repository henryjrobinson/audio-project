import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  variant?: 'blue' | 'purple' | 'green' | 'amber';
}

const variantStyles = {
  blue: {
    bg: 'bg-teal/10',
    border: 'border-teal',
    iconBg: 'bg-teal',
    iconColor: 'text-white',
    buttonBg: 'bg-teal hover:bg-teal/90'
  },
  purple: {
    bg: 'bg-navy/10',
    border: 'border-navy',
    iconBg: 'bg-navy',
    iconColor: 'text-white',
    buttonBg: 'bg-navy hover:bg-navy/90'
  },
  green: {
    bg: 'bg-golden/10',
    border: 'border-golden',
    iconBg: 'bg-golden',
    iconColor: 'text-white',
    buttonBg: 'bg-golden hover:bg-golden/90'
  },
  amber: {
    bg: 'bg-cta/10',
    border: 'border-cta',
    iconBg: 'bg-cta',
    iconColor: 'text-white',
    buttonBg: 'bg-cta hover:bg-cta/90'
  }
};

export const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'blue'
}: QuickActionCardProps) => {
  const styles = variantStyles[variant];

  return (
    <Card className={`${styles.bg} ${styles.border} border-2 hover:shadow-md transition-shadow h-full`}>
      <CardContent className="p-6 flex flex-col items-center h-full min-h-[280px] md:min-h-[300px]">
        <div className="flex-1 flex flex-col items-center text-center space-y-4">
          <div className={`h-12 w-12 rounded-full ${styles.iconBg} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate mb-1">{title}</h3>
            <p className="text-sm text-slate/80">{description}</p>
          </div>
        </div>
        <Button onClick={onAction} className={`w-full min-h-[44px] ${styles.buttonBg} text-white mt-4`}>
          {actionLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
