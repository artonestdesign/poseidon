"use client";

import {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

type WaitlistModalContextValue = {
  open: () => void;
  close: () => void;
};

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(
  null,
);

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext);
  if (!context) {
    throw new Error("useWaitlistModal must be used within WaitlistModalProvider");
  }
  return context;
}

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <WaitlistModalContext.Provider value={{ open, close }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={close} />
    </WaitlistModalContext.Provider>
  );
}

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const titleId = useId();
  const emailId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setSubmitted(false);
      setSubmitting(false);
      setError(null);
    }
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = emailRef.current;
    if (!input || submitting) return;

    if (!input.checkValidity()) {
      setError(input.validationMessage || "Please enter a valid email address.");
      input.focus();
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source: "poseidon-waitlist-page",
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setError(data.error || "Could not join the waitlist. Try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button
        type="button"
        aria-label="Close waitlist dialog backdrop"
        className="absolute inset-0 bg-black/35 backdrop-blur-[10px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[520px] overflow-visible rounded-[28px] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-black/10 text-black/55 transition-colors hover:border-black/25 hover:text-black"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {submitted ? (
          <div>
            <p className="text-sm text-black/45">You&apos;re in.</p>
            <h2
              id={titleId}
              className="mt-3 max-w-[400px] text-[32px] leading-[1.15] font-medium tracking-[-0.03em] text-black sm:text-[36px]"
            >
              Welcome to the first wave.
            </h2>
            <p className="mt-5 max-w-[360px] text-base leading-6 text-black/50">
              We&apos;ll be in touch when Poseidon is ready for you.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-black/45">Private beta access</p>
            <h2
              id={titleId}
              className="mt-3 max-w-[380px] text-[32px] leading-[1.15] font-medium tracking-[-0.03em] text-black sm:text-[36px]"
            >
              Be there, even when you can&apos;t.
            </h2>

            <form noValidate onSubmit={handleSubmit} className="mt-10">
              <label
                htmlFor={emailId}
                className="mb-2.5 block text-sm text-black/50"
              >
                Work email
              </label>
              <div className="relative">
                <div className="flex items-center rounded-full border border-black bg-white p-1.5 pl-5">
                  <input
                    ref={emailRef}
                    id={emailId}
                    type="email"
                    required
                    value={email}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${emailId}-error` : undefined}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="you@company.com"
                    className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-black/35"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="shrink-0 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ee6e4b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Joining..." : "Join waitlist"}
                  </button>
                </div>

                {error ? (
                  <div
                    id={`${emailId}-error`}
                    role="alert"
                    className="absolute top-[calc(100%+10px)] left-3 z-20 max-w-[min(100%,360px)]"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -top-[6px] left-4 h-3 w-3 rotate-45 border-t border-l border-black/10 bg-white"
                    />
                    <div className="relative flex items-start gap-2.5 rounded-[6px] border border-black/10 bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
                      <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] bg-[#f28b32] text-[12px] leading-none font-bold text-white">
                        !
                      </span>
                      <p className="text-[13px] leading-5 text-[#222]">
                        {error}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
              <p className="mt-4 text-sm text-black/40">
                No noise. Just meaningful updates and early access.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

type OpenWaitlistButtonProps = {
  children: ReactNode;
  className?: string;
};

export function OpenWaitlistButton({
  children,
  className,
}: OpenWaitlistButtonProps) {
  const { open } = useWaitlistModal();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
