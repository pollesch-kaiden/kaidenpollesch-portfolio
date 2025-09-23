import { Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function MobileHeader({
  onMenuToggle,
  showBackButton = false,
  onBackClick,
}: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border px-4 flex items-center justify-between z-50">
      {showBackButton && onBackClick ? (
        <Button variant="ghost" size="icon" onClick={onBackClick}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" onClick={onMenuToggle}>
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="flex items-center space-x-2">
        <span className="font-semibold">Kaiden Pollesch</span>
      </div>

      <ThemeToggle />
    </div>
  );
}
