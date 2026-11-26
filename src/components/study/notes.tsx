import { useState, useRef } from "react";
import { FileText, Search, Plus, Upload, Pencil, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PageHeading, EmptyState, DeleteDialog } from "./common";
import { useDemo } from "./store";
import { dateLabel, subjects, subjectTone, type Note } from "@/lib/study/demo";
export function Notes() {
  const { notes, saveNote, removeNote } = useDemo();
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All subjects");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Note | undefined>();
  const [editing, setEditing] = useState<Note | undefined>();
  const [deleting, setDeleting] = useState<Note | undefined>();
  const [upload, setUpload] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const filtered = notes.filter(
    (n) =>
      (subject === "All subjects" || n.subject === subject) &&
      (n.title + n.content + n.tags.join(" ")).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        title="Notes Library"
        description="Your thoughts, discoveries, and lightbulb moments. All together."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              <Upload />
              Upload
            </Button>
            <Button
              onClick={() => {
                setEditing(undefined);
                setOpen(true);
              }}
            >
              <Plus />
              Create note
            </Button>
          </div>
        }
      />
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept=".txt,.md,.pdf,.doc,.docx"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setUploadError("");
          if (file.size > 10 * 1024 * 1024) {
            setUploadError("Choose a document smaller than 10 MB.");
            e.target.value = "";
            return;
          }
          const text = /\.(txt|md)$/i.test(file.name)
            ? await file.text()
            : `Document: ${file.name}\n\nUploaded document reference (${Math.round(file.size / 1024)} KB). File contents are not retained in this browser demo.`;
          saveNote({
            id: crypto.randomUUID(),
            title: file.name.replace(/\.[^.]+$/, ""),
            subject: "Mathematics",
            content: text,
            tags: ["Uploaded"],
            updated: new Date().toISOString().slice(0, 10),
          });
          setUpload(file.name);
          e.target.value = "";
        }}
      />
      {upload && (
        <p className="mb-5 rounded-lg bg-success-soft p-3 text-xs text-success" role="status">
          “{upload}” added to your library.
          {/\.(pdf|docx?)$/i.test(upload) &&
            " Document reference only; the file itself is not stored in this demo."}
        </p>
      )}
      {uploadError && (
        <p className="mb-5 text-destructive" role="alert">
          {uploadError}
        </p>
      )}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex max-w-full flex-wrap gap-2">
          {["All subjects", ...subjects].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={subject === s ? "soft" : "ghost"}
              onClick={() => setSubject(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <label className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            className="field pl-9"
            aria-label="Search notes"
            placeholder="Search your notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((note) => (
          <article key={note.id} className="panel note-card">
            <div className="mb-4 flex items-center justify-between">
              <span className={`icon-tile ${subjectTone[note.subject]}`}>
                <FileText />
              </span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Edit ${note.title}`}
                  title="Edit note"
                  onClick={() => {
                    setEditing(note);
                    setOpen(true);
                  }}
                >
                  <Pencil size={15} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Delete ${note.title}`}
                  title="Delete note"
                  onClick={() => setDeleting(note)}
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
            <Button
              variant="link"
              className="h-auto whitespace-normal p-0 text-left text-base font-semibold text-foreground"
              onClick={() => setSelected(note)}
            >
              {note.title}
            </Button>
            <span className={`badge mt-3 ${subjectTone[note.subject]}`}>{note.subject}</span>
            <p className="mt-4 line-clamp-3 text-xs leading-6 text-muted-foreground">
              {note.content}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="badge bg-muted text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="text-[10px] text-muted-foreground">
                Updated {dateLabel(note.updated)}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="text-primary"
                onClick={() => setSelected(note)}
              >
                Open note →
              </Button>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <EmptyState title="No notes found.">
          <Button
            variant="outline"
            onClick={() => {
              setSubject("All subjects");
              setQuery("");
            }}
          >
            Clear filters
          </Button>
        </EmptyState>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>{editing ? "Edit note" : "A fresh page"}</DialogTitle>
          <DialogDescription>Capture something worth remembering.</DialogDescription>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              saveNote({
                id: editing?.id ?? crypto.randomUUID(),
                title: String(d.get("title")).trim(),
                subject: String(d.get("subject")) as Note["subject"],
                content: String(d.get("content")),
                tags: String(d.get("tags"))
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
                updated: new Date().toISOString().slice(0, 10),
              });
              setOpen(false);
            }}
          >
            <label className="field-label">
              Title
              <input
                className="field"
                name="title"
                required
                defaultValue={editing?.title}
                placeholder="Give your note a title"
              />
            </label>
            <label className="field-label">
              Subject
              <select className="field" name="subject" defaultValue={editing?.subject}>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Notes
              <textarea
                className="field min-h-40"
                name="content"
                required
                defaultValue={editing?.content}
                placeholder="Start with an idea..."
              />
            </label>
            <label className="field-label">
              Tags (comma separated)
              <input
                className="field"
                name="tags"
                defaultValue={editing?.tags.join(", ")}
                placeholder="Revision, Chapter 1"
              />
            </label>
            <Button type="submit" className="w-full">
              Save note
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(selected)}
        onOpenChange={(v) => {
          if (!v) setSelected(undefined);
        }}
      >
        <DialogContent>
          <DialogTitle>{selected?.title}</DialogTitle>
          <DialogDescription>
            {selected?.subject} · Updated {selected ? dateLabel(selected.updated) : ""}
          </DialogDescription>
          <div className="whitespace-pre-wrap text-sm leading-8">{selected?.content}</div>
          <Button
            variant="outline"
            onClick={() => {
              setEditing(selected);
              setSelected(undefined);
              setOpen(true);
            }}
          >
            <Pencil />
            Edit note
          </Button>
        </DialogContent>
      </Dialog>
      <DeleteDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(undefined)}
        label="note"
        onDelete={() => {
          if (deleting) removeNote(deleting.id);
        }}
      />
    </>
  );
}
