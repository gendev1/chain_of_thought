'use client';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Sidebar } from 'lucide-react';

interface Step {
    step: string;
    reasoning: string;
}

export default function Component() {
    const [apiKey, setApiKey] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey,
                },
                body: JSON.stringify({ prompt: input }),
            });
            const data: { answer: string; steps: Step[] } = await res.json();
            setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: data.answer }]);
            setSteps(data.steps);
            setInput('');
        } catch (error) {
            console.error('Error:', error);
            setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: 'An error occurred while processing your request.' }]);
        }
        setIsLoading(false);
    };

    const renderMessage = (message: any) => {
        const parts = message.content.split(/(```[\s\S]*?```)/g);
        return parts.map((part: string, index: number) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const code = part.slice(3, -3);
                const language = code.split('\n')[0];
                const codeContent = code.split('\n').slice(1).join('\n');
                return (
                    <SyntaxHighlighter key={index} language={language} style={vscDarkPlus}>
                        {codeContent}
                    </SyntaxHighlighter>
                );
            }
            return <p key={index}>{part}</p>;
        });
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className={`bg-gray-800 w-64 p-4 flex flex-col ${isSidebarOpen ? '' : 'hidden'}`}>
                <h1 className="text-2xl font-bold mb-2">Chain of Thought</h1>
                <p className="text-sm text-gray-400 mb-8">Created by generalist</p>
                <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter Anthropic API Key"
                    className="mb-4 bg-gray-700 text-white border-gray-600"
                />
                {/* Add more sidebar content here if needed */}
            </div>
            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-gray-800 p-4 flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2">
                        <Sidebar className="h-6 w-6" />
                    </Button>
                    <h2 className="text-xl font-semibold">Chat</h2>
                </div>
                {/* Chat area */}
                <Card className="flex-grow m-4 bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                        <ScrollArea className="h-[calc(100vh-240px)]">
                            {messages.map((message, index) => (
                                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
                                    <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
                                    {renderMessage(message)}
                                </div>
                            ))}
                            {steps.length > 0 && (
                                <div className="mb-4 text-yellow-400">
                                    <strong>Reasoning Steps:</strong>
                                    {steps.map((step, index) => (
                                        <div key={index} className="ml-4 mt-2">
                                            <strong>
                                                Step {index + 1}: {step.step}
                                            </strong>
                                            <p>{step.reasoning}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
                {/* Input area */}
                <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
                    <div className="flex space-x-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow bg-gray-700 text-white border-gray-600"
                        />
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Send'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
