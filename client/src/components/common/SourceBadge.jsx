import React from 'react';
import { ExternalLink, ShieldCheck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function SourceBadge({
  sourceName = 'Official API',
  sourceUrl,
  freshness = 'LIVE',
  relativeTime = 'Updated 10m ago',
  confidence = 'HIGH',
  reportType
}) {
  const isLive = freshness === 'LIVE';
  const isHighConfidence = confidence === 'HIGH' || reportType === 'VERIFIED';

  return (
    <div className="inline-flex flex-wrap items-center gap-2 text-[11px] font-medium">
      {/* Freshness Badge */}
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold border ${
          isLive
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
        <span>{isLive ? 'LIVE' : 'CACHED'} • {relativeTime}</span>
      </span>

      {/* Confidence / Report Type Badge */}
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase border ${
          isHighConfidence
            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
            : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}
      >
        <ShieldCheck className="w-3 h-3 text-indigo-600" />
        <span>{reportType || `${confidence} CONFIDENCE`}</span>
      </span>

      {/* External Official Source Link */}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-600 font-bold hover:underline transition-colors"
        >
          <span>Source: {sourceName}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
