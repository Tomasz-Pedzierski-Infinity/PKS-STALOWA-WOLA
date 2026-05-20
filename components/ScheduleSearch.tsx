'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Wifi, Plug, Snowflake, Bath, Clock, ArrowRight, Filter, Users } from 'lucide-react';
import { SearchWidget } from './SearchWidget';
import { mockConnections, type Connection } from '@/lib/mockData';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionaries';

const amenityIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  WiFi: Wifi,
  USB: Plug,
  AC: Snowflake,
  WC: Bath,
};

export function ScheduleSearch({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Suspense fallback={null}>
      <ScheduleSearchInner locale={locale} dict={dict} />
    </Suspense>
  );
}

function ScheduleSearchInner({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const params = useSearchParams();
  const from = params.get('from') ?? 'Stalowa Wola';
  const to = params.get('to') ?? 'Rzeszów';
  const [sort, setSort] = useState<'cheapest' | 'fastest' | 'earliest'>('earliest');

  const connections = useMemo(() => {
    const normalize = (s: string) => s.trim().toLocaleLowerCase('pl');
    const matches = mockConnections.filter(
      (c) => normalize(c.from) === normalize(from) && normalize(c.to) === normalize(to)
    );
    if (sort === 'cheapest') matches.sort((a, b) => a.price - b.price);
    if (sort === 'fastest') matches.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
    if (sort === 'earliest') matches.sort((a, b) => a.departure.localeCompare(b.departure));
    return matches;
  }, [sort, from, to]);

  return (
    <div className="space-y-8">
      <SearchWidget locale={locale} dict={dict} />

      <div className="flex items-start sm:items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold break-words">
            {from} → {to}
          </h2>
          <p className="text-sm text-ink-500 mt-1">
            {connections.length} {dict.schedulePage.results.toLowerCase()}
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xs text-ink-500 mr-1 w-full sm:w-auto">{dict.schedulePage.sortBy}:</span>
          {(['earliest', 'fastest', 'cheapest'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                sort === opt
                  ? 'bg-brand-600 text-white'
                  : 'bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700'
              }`}
            >
              {dict.schedulePage[opt]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {connections.length === 0 ? (
          <div className="card p-8 text-center text-ink-500 text-sm">
            {locale === 'pl'
              ? `Brak połączeń ${from} → ${to} w naszej bazie. Sprawdź inną parę miast lub zadzwoń: +48 15 842 58 11 (wew. 33).`
              : `No connections ${from} → ${to} in our database. Try another pair or call: +48 15 842 58 11 (ext. 33).`}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {connections.map((c, i) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <ConnectionCard c={c} dict={dict} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function ConnectionCard({ c, dict }: { c: Connection; dict: Dictionary }) {
  return (
    <article className="card p-4 sm:p-5 md:p-6 hover:border-brand-300 dark:hover:border-brand-800 hover:shadow-lg transition-all group">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 sm:gap-6 items-center">
        {/* Times */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="text-center min-w-0">
            <div className="font-display text-xl sm:text-3xl font-bold tabular-nums">{c.departure}</div>
            <div className="text-[10px] sm:text-xs text-ink-500 mt-0.5 truncate">{c.from}</div>
          </div>

          <div className="flex-1 relative px-1 sm:px-4 min-w-0">
            <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-ink-500 mb-1.5 whitespace-nowrap">
              <Clock className="w-3 h-3 flex-shrink-0" />
              {c.duration}
            </div>
            <div className="relative h-px bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600">
              <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-brand-600" />
              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-brand-600" />
              {c.transfers > 0 && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sun-400 ring-2 ring-white dark:ring-ink-900" />
              )}
            </div>
            <div className="text-center text-[10px] text-ink-500 mt-1.5 uppercase tracking-wider truncate">
              {c.transfers === 0 ? dict.schedulePage.direct : `${c.transfers} ${dict.schedulePage.transfers.toLowerCase()}`}
            </div>
          </div>

          <div className="text-center min-w-0">
            <div className="font-display text-xl sm:text-3xl font-bold tabular-nums">{c.arrival}</div>
            <div className="text-[10px] sm:text-xs text-ink-500 mt-0.5 truncate">{c.to}</div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between md:justify-start gap-3 md:border-x md:px-6 md:border-ink-200 md:dark:border-ink-800 pt-3 md:pt-0 border-t md:border-t-0 border-ink-200 dark:border-ink-800">
          <div className="flex items-center gap-1.5 flex-wrap">
            {c.amenities.map((a) => {
              const Icon = amenityIcon[a];
              return Icon ? (
                <span key={a} title={a} className="w-7 h-7 rounded-lg bg-ink-100 dark:bg-ink-800 grid place-items-center">
                  <Icon className="w-3.5 h-3.5" />
                </span>
              ) : null;
            })}
          </div>
          <div className="flex items-center gap-1 text-xs text-ink-500 whitespace-nowrap">
            <Users className="w-3 h-3" />
            {c.seatsLeft}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between md:flex-col md:items-end gap-3">
          <div className="text-right">
            <div className="text-xs text-ink-500">{dict.schedulePage.from}</div>
            <div className="font-display text-2xl font-bold text-brand-600 tabular-nums">
              {c.price.toFixed(2)} <span className="text-sm text-ink-500">zł</span>
            </div>
          </div>
          <button className="btn-primary !px-5 !py-2.5 text-sm group/btn">
            {dict.schedulePage.select}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}

function parseDuration(s: string): number {
  const m = s.match(/(\d+)h\s*(\d+)?/);
  if (!m) return 0;
  return parseInt(m[1]) * 60 + parseInt(m[2] ?? '0');
}
