'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bus, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';

type Props = { locale: Locale };

const copy = {
  pl: {
    open: 'Otwórz czat PEKAESIK',
    close: 'Zamknij czat',
    title: 'PEKAESIK',
    subtitle: 'Asystent PKS Stalowa Wola',
    placeholder: 'Zadaj pytanie o rozkład, ceny, kontakt...',
    send: 'Wyślij',
    greeting:
      'Cześć! Jestem **PEKAESIK** — pomogę z rozkładem, cenami biletów, wynajmem autokaru i kontaktem. O co pytasz?',
    suggestions: [
      'Cena biletu do Rzeszowa?',
      'O której do Lublina?',
      'Wynajem autokaru na 30 osób',
      'Ceny paliw na stacji',
    ],
    error: 'Chwilowe problemy. Zadzwoń: +48 15 842 58 11.',
    powered: 'Powered by AI · odpowiedzi mogą być niedokładne',
    callUs: 'Zadzwoń',
    contact: 'Kontakt',
  },
  en: {
    open: 'Open PEKAESIK chat',
    close: 'Close chat',
    title: 'PEKAESIK',
    subtitle: 'PKS Stalowa Wola assistant',
    placeholder: 'Ask about schedules, prices, contact...',
    send: 'Send',
    greeting:
      "Hi! I'm **PEKAESIK** — I help with schedules, ticket prices, coach charter and contact info. What's your question?",
    suggestions: [
      'Price of a ticket to Rzeszów?',
      'When is the bus to Lublin?',
      'Charter a coach for 30 people',
      'Fuel prices at the station',
    ],
    error: 'Temporary issue. Call us: +48 15 842 58 11.',
    powered: 'Powered by AI · answers may be inaccurate',
    callUs: 'Call us',
    contact: 'Contact',
  },
} as const;

function renderInline(text: string) {
  // Tokenizes bold (**...**), inline code (`...`), and links [text](url|/path)
  const out: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[1]) out.push(<strong key={key++}>{match[1]}</strong>);
    else if (match[2])
      out.push(
        <code key={key++} className="px-1 py-0.5 rounded bg-ink-100 dark:bg-ink-800 text-xs">
          {match[2]}
        </code>
      );
    else if (match[3] && match[4]) {
      const href = match[4];
      out.push(
        <a key={key++} href={href} className="text-brand-600 hover:underline">
          {match[3]}
        </a>
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function MessageBody({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  const flushList = (key: string) => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={key} className="list-disc pl-5 space-y-0.5">
          {listBuffer.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };
  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      listBuffer.push(bullet[1]);
      return;
    }
    flushList(`l${i}`);
    if (line === '') blocks.push(<div key={`s${i}`} className="h-1.5" />);
    else blocks.push(<p key={`p${i}`}>{renderInline(line)}</p>);
  });
  flushList('lend');
  return <div className="space-y-1.5">{blocks}</div>;
}

export function PekaesikWidget({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const t = copy[locale];

  const transport = useMemo(
    () => new DefaultChatTransport({ api: '/api/chat', body: { locale } }),
    [locale]
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const isStreaming = status === 'submitted' || status === 'streaming';

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, isStreaming]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.close : t.open}
        className={cn(
          'fixed z-[60] bottom-5 right-5 sm:bottom-6 sm:right-6',
          'w-14 h-14 rounded-full grid place-items-center shadow-xl',
          'bg-brand-600 text-white hover:bg-brand-700 transition-all',
          'hover:scale-105 active:scale-95',
          open && 'rotate-90'
        )}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      <div
        className={cn(
          'fixed z-[55] transition-all duration-300 ease-out',
          'bottom-24 right-4 sm:right-6',
          'w-[calc(100vw-2rem)] sm:w-[380px]',
          'h-[min(560px,calc(100vh-7rem))]',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        )}
        role="dialog"
        aria-label={t.title}
      >
        <div className="flex flex-col h-full rounded-3xl overflow-hidden card border-ink-200 dark:border-ink-800 shadow-2xl">
          <header className="flex items-center gap-3 p-3 bg-brand-600 text-white">
            <div className="w-10 h-10 rounded-2xl bg-white/15 grid place-items-center">
              <Bus className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold leading-tight">{t.title}</div>
              <div className="text-xs opacity-90 truncate">{t.subtitle}</div>
            </div>
            <a
              href="tel:+48158425811"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 px-2.5 py-1.5 rounded-full"
              aria-label={t.callUs}
            >
              <Phone className="w-3.5 h-3.5" />
              {t.callUs}
            </a>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 text-sm">
            <div className="rounded-2xl bg-ink-100 dark:bg-ink-800 px-3.5 py-2.5">
              <MessageBody text={t.greeting} />
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {t.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:border-brand-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts
                .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                .map((p) => p.text)
                .join('');
              if (!text) return null;
              return (
                <div
                  key={m.id}
                  className={cn(
                    'rounded-2xl px-3.5 py-2.5 max-w-[88%]',
                    m.role === 'user'
                      ? 'ml-auto bg-brand-600 text-white'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100'
                  )}
                >
                  <MessageBody text={text} />
                </div>
              );
            })}

            {isStreaming && messages[messages.length - 1]?.role === 'user' && (
              <div className="rounded-2xl bg-ink-100 dark:bg-ink-800 px-3.5 py-2.5 inline-flex items-center gap-2 text-ink-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">...</span>
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-3.5 py-2.5 text-red-700 dark:text-red-300 text-xs">
                {t.error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="border-t border-ink-200 dark:border-ink-800 p-2.5 bg-white dark:bg-ink-900"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-ink-100 dark:bg-ink-800">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                disabled={isStreaming}
                className="input flex-1 disabled:opacity-60"
                aria-label={t.placeholder}
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                aria-label={t.send}
                className="w-8 h-8 rounded-full bg-brand-600 text-white grid place-items-center disabled:opacity-40 disabled:pointer-events-none hover:bg-brand-700"
              >
                {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
              <Link
                href={`/${locale}/contact`}
                className="text-[10px] uppercase tracking-wider text-ink-500 hover:text-brand-600"
              >
                {t.contact}
              </Link>
              <span className="text-[10px] text-ink-400 dark:text-ink-500">{t.powered}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
