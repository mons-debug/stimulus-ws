"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapImage from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

function Btn({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title: string }) {
  return (
    <button type="button" onClick={onClick} title={title}
      className={`w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center rounded-md lg:rounded-lg text-xs lg:text-sm font-bold transition-colors ${active ? "bg-coral text-white" : "bg-white text-navy hover:bg-warm-gray"}`}>
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-6 bg-border mx-0.5" />;
}

export function RichEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const imgRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Placeholder.configure({ placeholder: "ابدأ الكتابة هنا..." }),
      TiptapImage.configure({ inline: false, allowBase64: false, HTMLAttributes: { class: "max-w-full rounded-xl" } }),
      Youtube.configure({ width: 640, height: 360, HTMLAttributes: { class: "w-full rounded-xl aspect-video" } }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "prose-arabic min-h-[300px] p-6 focus:outline-none", dir: "rtl" },
    },
  });

  if (!editor) return null;

  function addLink() {
    const url = prompt("أدخل الرابط:");
    if (url) editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }

  function addImageUrl() {
    const url = prompt("أدخل رابط الصورة:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }

  function addVideo() {
    const url = prompt("أدخل رابط الفيديو (YouTube):");
    if (url) editor?.commands.setYoutubeVideo({ src: url });
  }

  function resizeImage(size: string) {
    const html = `<img src="" style="max-width:${size};display:block;margin:0 auto" />`;
    const selected = editor?.state.selection;
    if (selected) {
      const node = editor?.state.doc.nodeAt(selected.from);
      if (node?.type.name === "image") {
        editor?.chain().focus().updateAttributes("image", { style: `max-width:${size};display:block;margin:0 auto` }).run();
      }
    }
  }

  function insertHtml() {
    const html = prompt("أدخل كود HTML:");
    if (html) editor?.chain().focus().insertContent(html).run();
  }

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white">
      <input type="file" ref={imgRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
      <div className="flex flex-wrap items-center gap-0.5 lg:gap-1 p-2 lg:p-3 bg-[#F8F8F8] border-b border-border sticky top-14 lg:top-0 z-10">
        <Btn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="عنوان رئيسي">H2</Btn>
        <Btn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="عنوان فرعي">H3</Btn>
        <Sep />
        <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="غامق"><b>B</b></Btn>
        <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="مائل"><i>I</i></Btn>
        <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="تحته خط"><u>U</u></Btn>
        <Sep />
        <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="قائمة نقطية">•</Btn>
        <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="قائمة مرقمة">1.</Btn>
        <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="اقتباس">&ldquo;</Btn>
        <Sep />
        <Btn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="يمين">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
        </Btn>
        <Btn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="وسط">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="7" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
        </Btn>
        <Sep />
        <Btn active={editor.isActive("link")} onClick={addLink} title="رابط">🔗</Btn>
        <Btn onClick={() => imgRef.current?.click()} title="رفع صورة">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </Btn>
        <Btn onClick={addImageUrl} title="صورة من رابط">🌐</Btn>
        <Sep />
        <Btn onClick={addVideo} title="فيديو يوتيوب">▶</Btn>
        <Sep />
        <Btn onClick={() => resizeImage("50%")} title="حجم صغير">S</Btn>
        <Btn onClick={() => resizeImage("75%")} title="حجم متوسط">M</Btn>
        <Btn onClick={() => resizeImage("100%")} title="حجم كامل">L</Btn>
        <Sep />
        <Btn onClick={insertHtml} title="إدراج HTML">&lt;/&gt;</Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().undo().run()} title="تراجع">↩</Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="إعادة">↪</Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
