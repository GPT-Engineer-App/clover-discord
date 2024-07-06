import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const servers = [
  { id: 1, name: "Server 1" },
  { id: 2, name: "Server 2" },
  { id: 3, name: "Server 3" },
];

const channels = {
  1: [{ id: 1, name: "general" }, { id: 2, name: "random" }],
  2: [{ id: 3, name: "general" }, { id: 4, name: "memes" }],
  3: [{ id: 5, name: "general" }, { id: 6, name: "games" }],
};

const messages = {
  1: [{ id: 1, user: "User1", content: "Hello!" }],
  2: [{ id: 2, user: "User2", content: "Random chat!" }],
  3: [{ id: 3, user: "User3", content: "General chat!" }],
  4: [{ id: 4, user: "User4", content: "Memes!" }],
  5: [{ id: 5, user: "User5", content: "Games chat!" }],
  6: [{ id: 6, user: "User6", content: "More games chat!" }],
};

const Index = () => {
  const [selectedServer, setSelectedServer] = useState(1);
  const [selectedChannel, setSelectedChannel] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const handleServerClick = (serverId) => {
    setSelectedServer(serverId);
    setSelectedChannel(channels[serverId][0].id);
  };

  const handleChannelClick = (channelId) => {
    setSelectedChannel(channelId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      messages[selectedChannel].push({
        id: Date.now(),
        user: "CurrentUser",
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-full">
      <aside className="w-16 bg-gray-800 text-white flex flex-col items-center py-4">
        {servers.map((server) => (
          <Button
            key={server.id}
            variant="ghost"
            className={cn(
              "w-12 h-12 mb-2",
              selectedServer === server.id && "bg-gray-700"
            )}
            onClick={() => handleServerClick(server.id)}
          >
            {server.name[0]}
          </Button>
        ))}
      </aside>
      <aside className="w-64 bg-gray-700 text-white flex flex-col py-4">
        <div className="flex-1 overflow-auto">
          {channels[selectedServer].map((channel) => (
            <Button
              key={channel.id}
              variant="ghost"
              className={cn(
                "w-full text-left px-4 py-2",
                selectedChannel === channel.id && "bg-gray-600"
              )}
              onClick={() => handleChannelClick(channel.id)}
            >
              # {channel.name}
            </Button>
          ))}
        </div>
        <div className="border-t border-gray-600 p-4 flex items-center">
          <Avatar className="mr-2">
            <AvatarImage src="/placeholder.svg" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">CurrentUser</div>
            <div className="text-sm text-gray-400">Online</div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-900 text-white flex items-center px-4">
          <h1 className="text-xl font-semibold">
            {servers.find((s) => s.id === selectedServer).name}
          </h1>
        </header>
        <ScrollArea className="flex-1 p-4">
          {messages[selectedChannel].map((message) => (
            <div key={message.id} className="mb-4">
              <div className="font-semibold">{message.user}</div>
              <div>{message.content}</div>
            </div>
          ))}
        </ScrollArea>
        <div className="h-16 bg-gray-800 p-4 flex items-center">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 mr-4"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </main>
    </div>
  );
};

export default Index;