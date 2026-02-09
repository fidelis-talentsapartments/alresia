import { MessageSquare, Plus, Trash2, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Conversation } from "@/hooks/useConversations";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onBack,
}: ConversationListProps) {
  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h3 className="font-semibold text-sm text-foreground">History</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNew}
          className="h-8 w-8 text-primary hover:bg-primary/10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="px-3 py-2 space-y-1">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm font-medium">No conversations yet</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Start a new chat to begin</p>
            </div>
          ) : (
            conversations.map((convo) => (
              <div
                key={convo.id}
                className={`group relative flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  convo.id === activeId
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50 border border-transparent"
                }`}
                onClick={() => onSelect(convo.id)}
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {convo.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {convo.messages.length} message{convo.messages.length !== 1 ? "s" : ""} · {formatTime(convo.updatedAt)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(convo.id);
                  }}
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
