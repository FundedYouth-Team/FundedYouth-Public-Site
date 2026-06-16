/* eslint-disable tailwindcss/no-custom-classname -- this tool uses its own scoped
   CSS (see CARDS_CSS) rather than Tailwind utilities. */
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../../lib/useSeo";

/**
 * Print Cards — in-house tool.
 *
 * For creating an account for someone onsite (rather than them registering
 * themselves). Drop the account `.txt` file(s) we generate and each becomes a
 * printable card with the new user's login details to hand to them.
 *
 * Adapted from a standalone HTML/JS page into a scoped React component.
 */

// Fields surfaced as labelled rows on the card, in this order.
const FIELD_ORDER = ["Username", "Password", "Grade", "Email", "Sign in"];
// Fields rendered in a monospace "pill" (so logins are easy to read aloud / type).
const MONO_FIELDS = new Set(["Username", "Password"]);

interface CardData {
  id: number;
  org: string;
  name: string;
  fields: Record<string, string>;
  note: string;
}

const CARDS_CSS = `
.fy-cards-app {
  --ink: #1a2332;
  --muted: #5b667a;
  --accent: #1f6feb;
  --line: #d9dee8;
  --card-bg: #ffffff;

  color: var(--ink);
  background: #eef1f6;
  min-height: 100%;
}

.fy-cards-app * { box-sizing: border-box; }

/* ---- Toolbar (hidden when printing) ---- */
.fy-cards-app .toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: #fff;
  border-bottom: 1px solid var(--line);
  box-shadow: 0 1px 6px rgba(0,0,0,.06);
}

.fy-cards-app .toolbar h1 {
  font-size: 16px;
  margin: 0;
  margin-right: auto;
  font-weight: 700;
  color: var(--ink);
}

.fy-cards-app .toolbar .count {
  color: var(--muted);
  font-weight: 500;
  font-size: 13px;
}

.fy-cards-app .back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}
.fy-cards-app .back-link:hover { text-decoration: underline; }

.fy-cards-app button,
.fy-cards-app label.filebtn {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
}

.fy-cards-app button.primary,
.fy-cards-app label.filebtn {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.fy-cards-app button:hover,
.fy-cards-app label.filebtn:hover { filter: brightness(1.05); }

.fy-cards-app button.ghost { background: #fff; color: var(--ink); }
.fy-cards-app button:disabled { opacity: .5; cursor: default; }
.fy-cards-app input[type=file] { display: none; }

.fy-cards-app .hint {
  text-align: center;
  color: var(--muted);
  padding: 60px 20px;
  font-size: 15px;
  line-height: 1.6;
}
.fy-cards-app .hint.dragover {
  background: #e3edff;
  outline: 2px dashed var(--accent);
}
.fy-cards-app .hint code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: #f4f6fb;
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 1px 6px;
  font-size: 13px;
}

/* ---- Card grid ---- */
.fy-cards-app .sheet {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
}

.fy-cards-app .card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 20px 22px 18px;
  box-shadow: 0 2px 10px rgba(20,30,50,.06);
  break-inside: avoid;
}

.fy-cards-app .card .remove {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  line-height: 22px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--muted);
  padding: 0;
  font-size: 14px;
}

.fy-cards-app .card .org {
  font-size: 12px;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 2px;
}

.fy-cards-app .card .who {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 14px;
  color: var(--ink);
}

.fy-cards-app .card dl {
  margin: 0;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 6px 14px;
}

.fy-cards-app .card dt {
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
}

.fy-cards-app .card dd {
  margin: 0;
  font-size: 14px;
  word-break: break-word;
}

.fy-cards-app .card dd.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: #f4f6fb;
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 1px 6px;
  display: inline-block;
  font-size: 13px;
}

.fy-cards-app .card a { color: var(--accent); }

.fy-cards-app .card .note {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
}
`;

// CSS used only inside the print window — lays the cards out 2-up on paper.
const PRINT_CSS = `
body { margin: 0; background: #fff; }
.fy-cards-app { background: #fff; }
.sheet {
  max-width: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.card { box-shadow: none; border: 1px solid #bbb; }
.card .remove { display: none; }
@page { margin: 12mm; }
`;

function isLink(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

/** Parse one account `.txt` file into card data. */
function parseAccount(text: string): Omit<CardData, "id"> {
  const lines = text.split(/\r?\n/);
  const fields: Record<string, string> = {};
  const noteLines: string[] = [];
  let org = "";

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) return;
    if (/^=+$/.test(line)) return; // separator rule
    if (i === 0 && line.indexOf(":") === -1) {
      // title line (e.g. the organization / program name)
      org = line;
      return;
    }
    const m = line.match(/^([A-Za-z][A-Za-z ]*?):\s*(.+)$/);
    if (m) {
      fields[m[1].trim()] = m[2].trim();
    } else {
      noteLines.push(line); // trailing instructions
    }
  });

  return {
    org,
    name: fields["Name"] || "Account",
    fields,
    note: noteLines.join(" "),
  };
}

export function PrintCardsPage() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [dragover, setDragover] = useState(false);
  const nextId = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useSeo({
    title: "Print Cards — FundedYouth",
    description:
      "In-house tool: turn account .txt files into printable login cards for new users created onsite.",
    url: "https://fundedyouth.org/apps/print-cards",
  });

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    [...fileList]
      .filter((f) => /\.txt$/i.test(f.name) || f.type === "text/plain")
      .forEach((f) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = String(e.target?.result ?? "");
          setCards((prev) => [
            ...prev,
            { id: nextId.current++, ...parseAccount(text) },
          ]);
        };
        reader.readAsText(f);
      });
  }, []);

  // Drag & drop anywhere on the page.
  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      setDragover(true);
    };
    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setDragover(false);
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      setDragover(false);
      if (e.dataTransfer) handleFiles(e.dataTransfer.files);
    };
    document.addEventListener("dragover", onDragEnter);
    document.addEventListener("dragenter", onDragEnter);
    document.addEventListener("dragleave", onDragLeave);
    document.addEventListener("drop", onDrop);
    return () => {
      document.removeEventListener("dragover", onDragEnter);
      document.removeEventListener("dragenter", onDragEnter);
      document.removeEventListener("dragleave", onDragLeave);
      document.removeEventListener("drop", onDrop);
    };
  }, [handleFiles]);

  function removeCard(id: number) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function clearAll() {
    setCards([]);
  }

  function handlePrint() {
    const node = sheetRef.current;
    if (!node) return;

    const win = window.open("", "_blank");
    if (!win) {
      alert("Please allow pop-ups for this page to print the cards.");
      return;
    }

    win.document.write(
      '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
        "<title>Account Cards</title>" +
        "<style>" +
        CARDS_CSS +
        PRINT_CSS +
        '</style></head><body><div class="fy-cards-app">' +
        node.outerHTML +
        "</div></body></html>",
    );
    win.document.close();
    win.focus();

    let printed = false;
    const doPrint = () => {
      if (printed) return;
      printed = true;
      win.print();
    };
    win.onload = doPrint;
    setTimeout(doPrint, 500);
  }

  const count = cards.length;

  return (
    <main className="bg-background">
      {/* Scoped styles for this tool. */}
      <style dangerouslySetInnerHTML={{ __html: CARDS_CSS }} />

      <div className="fy-cards-app">
        <div className="toolbar">
          <Link to="/apps" className="back-link">
            ← Apps
          </Link>
          <h1>
            Account Cards{" "}
            <span className="count">{count ? `(${count})` : ""}</span>
          </h1>
          <label className="filebtn" htmlFor="fy-cards-file">
            + Add .txt file(s)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="fy-cards-file"
            accept=".txt,text/plain"
            multiple
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            className="ghost"
            disabled={count === 0}
            onClick={clearAll}
          >
            Clear all
          </button>
          <button
            type="button"
            className="primary"
            disabled={count === 0}
            onClick={handlePrint}
          >
            Print
          </button>
        </div>

        {count === 0 && (
          <div className={`hint${dragover ? " dragover" : ""}`}>
            Click <strong>“+ Add .txt file(s)”</strong> above — or drag account{" "}
            <code>.txt</code> files anywhere onto this page.
            <br />
            Each file becomes a printable card. Repeat to keep adding to the
            list.
          </div>
        )}

        <div className="sheet" ref={sheetRef}>
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <button
                type="button"
                className="remove"
                title="Remove"
                aria-label="Remove card"
                onClick={() => removeCard(card.id)}
              >
                ×
              </button>
              {card.org && <div className="org">{card.org}</div>}
              <h2 className="who">{card.name}</h2>
              <dl>
                {FIELD_ORDER.map((key) => {
                  const val = card.fields[key];
                  if (!val) return null;
                  const mono = MONO_FIELDS.has(key);
                  return (
                    <Fragment key={key}>
                      <dt>{key}</dt>
                      <dd className={mono ? "mono" : undefined}>
                        {!mono && isLink(val) ? (
                          <a href={val} target="_blank" rel="noreferrer">
                            {val}
                          </a>
                        ) : (
                          val
                        )}
                      </dd>
                    </Fragment>
                  );
                })}
              </dl>
              {card.note && <div className="note">{card.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
