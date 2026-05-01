"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useCallback } from "react";

interface RichTextEditorProps {
    name: string;
    defaultValue?: string;
    placeholder?: string;
}

function ToolbarBtn({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) {
    return (
        <button type="button" onClick={onClick} title={title}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${active ? "bg-secondary text-white" : "hover:bg-slate-100 text-slate-600"}`}>
            {children}
        </button>
    );
}

export default function RichTextEditor({ name, defaultValue = "", placeholder = "Tulis isi berita di sini..." }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            CharacterCount,
            Placeholder.configure({ placeholder }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-blue-600 underline" } }),
        ],
        content: defaultValue,
        editorProps: {
            attributes: {
                class: "prose prose-slate max-w-none min-h-[300px] p-4 focus:outline-none text-sm leading-relaxed",
            }
        },
        immediatelyRender: false,
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const url = window.prompt("Masukkan URL:");
        if (url === null) return;
        if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    if (!editor) return null;

    const content = editor.getHTML();
    const wordCount = editor.storage.characterCount?.words() ?? 0;

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={editor.getHTML()} />

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 bg-slate-50">
                {/* Text style */}
                <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><strong>B</strong></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><em>I</em></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><span className="underline">U</span></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight"><span className="bg-yellow-200 px-0.5">H</span></ToolbarBtn>

                <div className="w-px bg-slate-200 mx-1" />

                {/* Headings */}
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><span className="text-xs">H2</span></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><span className="text-xs">H3</span></ToolbarBtn>

                <div className="w-px bg-slate-200 mx-1" />

                {/* Lists */}
                <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
                    <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                </ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
                    <span className="material-symbols-outlined text-base">format_list_numbered</span>
                </ToolbarBtn>

                <div className="w-px bg-slate-200 mx-1" />

                {/* Blockquote */}
                <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
                    <span className="material-symbols-outlined text-base">format_quote</span>
                </ToolbarBtn>

                {/* Link */}
                <ToolbarBtn onClick={setLink} active={editor.isActive("link")} title="Insert Link">
                    <span className="material-symbols-outlined text-base">link</span>
                </ToolbarBtn>

                <div className="w-px bg-slate-200 mx-1" />

                {/* Undo/Redo */}
                <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
                    <span className="material-symbols-outlined text-base">undo</span>
                </ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
                    <span className="material-symbols-outlined text-base">redo</span>
                </ToolbarBtn>

                <div className="flex-1" />
                <span className="text-xs text-slate-400 self-center pr-2">{wordCount} kata</span>
            </div>

            {/* Editor Area */}
            <EditorContent editor={editor} />
        </div>
    );
}
