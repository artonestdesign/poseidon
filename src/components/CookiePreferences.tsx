"use client";

import { useEffect, useId, useState } from "react";

const STORAGE_KEY = "poseidon-cookie-preferences";

type CookiePreferencesState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  decided: true;
  preferences: CookiePreferencesState;
  updatedAt: string;
};

const defaultPreferences: CookiePreferencesState = {
  essential: true,
  analytics: false,
  marketing: false,
};

function readStoredConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

function saveConsent(preferences: CookiePreferencesState) {
  const payload: StoredConsent = {
    decided: true,
    preferences,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function CookiePreferences() {
  const titleId = useId();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferencesState>(defaultPreferences);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored?.decided) {
      setPreferences(stored.preferences);
      setVisible(false);
    } else {
      setVisible(true);
    }
    setReady(true);
  }, []);

  function acceptAll() {
    const next: CookiePreferencesState = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(next);
    saveConsent(next);
    setVisible(false);
    setShowSettings(false);
  }

  function rejectNonEssential() {
    const next = defaultPreferences;
    setPreferences(next);
    saveConsent(next);
    setVisible(false);
    setShowSettings(false);
  }

  function saveCustom() {
    saveConsent(preferences);
    setVisible(false);
    setShowSettings(false);
  }

  if (!ready || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className="mx-auto w-full max-w-[920px] rounded-[24px] border border-black/8 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:p-6"
      >
        {!showSettings ? (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="max-w-[560px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/40">
                Poseidon · Cookie preferences
              </p>
              <h2
                id={titleId}
                className="mt-2 text-[22px] leading-tight font-medium tracking-[-0.02em] text-black"
              >
                We use cookies carefully.
              </h2>
              <p className="mt-2 text-sm leading-6 text-black/55">
                Essential cookies keep Poseidon working. Optional cookies help
                us understand usage and improve the product. You can change
                this anytime.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="rounded-full border border-black/15 px-5 py-2.5 text-sm transition-colors hover:border-black"
              >
                Cookie settings
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full border border-black/15 px-5 py-2.5 text-sm transition-colors hover:border-black"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ee6e4b]"
              >
                Allow all
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/40">
                  Poseidon · Cookie settings
                </p>
                <h2
                  id={titleId}
                  className="mt-2 text-[22px] leading-tight font-medium tracking-[-0.02em]"
                >
                  Choose what you allow.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-black/55 transition-colors hover:border-black/25 hover:text-black"
              >
                Back
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <PreferenceRow
                title="Essential"
                description="Required for basic site function and security. Always on."
                checked
                locked
              />
              <PreferenceRow
                title="Analytics"
                description="Helps us understand how Poseidon is used so we can improve it."
                checked={preferences.analytics}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
              <PreferenceRow
                title="Marketing"
                description="Used for relevant updates and measuring campaign performance."
                checked={preferences.marketing}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full border border-black/15 px-5 py-2.5 text-sm transition-colors hover:border-black"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={saveCustom}
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ee6e4b]"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type PreferenceRowProps = {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (checked: boolean) => void;
};

function PreferenceRow({
  title,
  description,
  checked,
  locked = false,
  onChange,
}: PreferenceRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-[#f5f3f1] px-4 py-4">
      <div className="max-w-[520px]">
        <p className="text-sm font-medium text-black">{title}</p>
        <p className="mt-1 text-sm leading-5 text-black/50">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${title} cookies`}
        disabled={locked}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-black" : "bg-black/20"
        } ${locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
