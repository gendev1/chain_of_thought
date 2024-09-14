// File: app/api/query/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
    const apiKey = request.headers.get('X-API-Key');
    if (!apiKey) {
        return NextResponse.json({ error: 'API key is required' }, { status: 401 });
    }

    const anthropic = new Anthropic({
        apiKey: apiKey,
    });

    try {
        const { prompt } = (await request.json()) as { prompt: string };
        const reasoningSteps = await generateReasoningSteps(anthropic, prompt);
        let context = prompt;
        let stepResponses: { step: string; reasoning: string }[] = [];

        for (const step of reasoningSteps) {
            const response = await askClaude(anthropic, context + '\n\nReasoning step: ' + step);
            context += '\n\nStep: ' + step + '\nReasoning: ' + response;
            stepResponses.push({ step, reasoning: response });

            // Limit to 10 steps
            if (stepResponses.length >= 10) break;
        }

        const synthesizedAnswer = await synthesizeAnswer(anthropic, context);

        return NextResponse.json({
            answer: synthesizedAnswer,
            steps: stepResponses,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }
}

async function generateReasoningSteps(anthropic: Anthropic, prompt: string): Promise<string[]> {
    const message = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
            {
                role: 'user',
                content: `You are an AI assistant designed to break down complex problems into reasoning steps. 
         For the following prompt, generate 3-5 reasoning steps that will help in solving the problem:
         
         ${prompt}
         
         Output the steps as a numbered list.`,
            },
        ],
    });
    const textContent = message.content.find((block) => 'text' in block);
    return parseStepsFromResponse(textContent?.text || '');
}

function parseStepsFromResponse(response: string): string[] {
    const steps = response
        .split('\n')
        .filter((line) => /^\d+\./.test(line.trim()))
        .map((line) => line.replace(/^\d+\.\s*/, '').trim());
    return steps;
}

async function askClaude(anthropic: Anthropic, prompt: string): Promise<string> {
    const message = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
    });
    const textContent = message.content.find((block) => 'text' in block);
    return textContent?.text || '';
}

async function synthesizeAnswer(anthropic: Anthropic, context: string): Promise<string> {
    const message = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
            {
                role: 'user',
                content: `Based on the following reasoning steps and information, please provide a clear, concise, and accurate final answer:
         
         ${context}
         
         Synthesize the key points and insights into a coherent response.`,
            },
        ],
    });
    const textContent = message.content.find((block) => 'text' in block);
    return textContent?.text || '';
}
