import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { buildSystemPrompt } from '@/lib/pekaesik-knowledge';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export const runtime = 'nodejs';
export const maxDuration = 30;

type ChatRequest = {
  messages: UIMessage[];
  locale?: string;
};

export async function POST(req: Request) {
  const { messages, locale: rawLocale }: ChatRequest = await req.json();
  const locale: Locale = (locales as readonly string[]).includes(rawLocale ?? '')
    ? (rawLocale as Locale)
    : defaultLocale;

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    system: buildSystemPrompt(locale),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 1000,
    temperature: 0.3,
  });

  return result.toUIMessageStreamResponse();
}
