import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Trash2, Sparkles, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAiChat } from "@/hooks/useAiChat";
import { ChatMessage } from "./ChatMessage";

const quickActions = [
  { label: "What services do you offer?", icon: "🛠️" },
  { label: "Show me your projects", icon: "🚀" },
  { label: "I want to start a project", icon: "💡" },
  { label: "Talk to a real person", icon: "👤" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, error, sendMessage, clearMessages } = useAiChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-muted text-muted-foreground rotate-0"
            : "bg-primary text-primary-foreground animate-bounce hover:animate-none"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-140px)] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground text-sm">
                  Aria — AI Assistant
                </h3>
              <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-chart-1 animate-pulse" />
                  <span className="text-primary-foreground/70 text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Hi! I'm Aria 👋
                </h4>
                <p className="text-muted-foreground text-xs mb-6 max-w-[260px]">
                  Your AI assistant for Alresia Technologies. I can help you explore our services, view projects, or connect you with our team.
                </p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.label)}
                      className="text-left px-3 py-2.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors text-xs"
                    >
                      <span className="block text-base mb-1">{action.icon}</span>
                      <span className="text-foreground font-medium leading-tight">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => <ChatMessage key={i} message={msg} />)
            )}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center text-destructive text-xs bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Connect to Staff CTA */}
          {messages.length > 0 && (
            <div className="px-4 pb-2 flex-shrink-0">
              <a
                href="/contact"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-xs"
              >
                <Headphones className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted-foreground">
                  Need a human? <span className="text-primary font-medium">Talk to our team</span>
                </span>
              </a>
            </div>
          )}

          {/* Input Area */}
          <div className="px-4 pb-4 pt-2 flex-shrink-0">
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-1 focus-within:border-primary/50 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm py-2.5 placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="h-8 w-8 text-primary hover:bg-primary/10 disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-center text-muted-foreground/40 text-[10px] mt-2">
              Powered by Alresia AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
