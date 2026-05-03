"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useCallback, useRef, useState } from "react";

interface RichTextEditorProps {
    name: string;
    defaultValue?: string;
    placeholder?: string;
}

function ToolbarBtn({ onClick, active, title, disabled, children }: { onClick: () => void; active?: boolean; title: string; disabled?: boolean; children: React.ReactNode }) {
    return (
        <button type="button" onClick={onClick} title={title} disabled={disabled}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${active ? "bg-secondary text-white" : "hover:bg-slate-100 text-slate-600"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
            {children}
        </button>
    );
}

export default function RichTextEditor({ name, defaultValue = "", placeholder = "Tulis isi berita di sini..." }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState(defaultValue);
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            CharacterCount,
            Image.configure({
                inline: true,
                HTMLAttributes: {
                    class: 'rounded-xl shadow-md my-4 max-w-full h-auto',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
            Placeholder.configure({ placeholder }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-blue-600 underline" } }),
        ],
        content: defaultValue,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
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

    const addImage = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editor) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Gagal mengupload gambar");

            const data = await res.json();
            editor.chain().focus().setImage({ src: data.url }).run();
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat mengupload gambar.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
        }
    };

    if (!editor) return null;

    const wordCount = editor.storage.characterCount?.words() ?? 0;

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            {/* Hidden inputs */}
            <input type="hidden" name={name} value={content} />
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
            />

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

                {/* Link & Image */}
                <ToolbarBtn onClick={setLink} active={editor.isActive("link")} title="Insert Link">
                    <span className="material-symbols-outlined text-base">link</span>
                </ToolbarBtn>
                <ToolbarBtn onClick={addImage} title={isUploading ? "Uploading..." : "Insert Image"} disabled={isUploading}>
                    {isUploading ? (
                        <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    ) : (
                        <span className="material-symbols-outlined text-base">image</span>
                    )}
                </ToolbarBtn>

                <div className="w-px bg-slate-200 mx-1" />

                {/* Alignment */}
                <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
                    <span className="material-symbols-outlined text-base">format_align_left</span>
                </ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
                    <span className="material-symbols-outlined text-base">format_align_center</span>
                </ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
                    <span className="material-symbols-outlined text-base">format_align_right</span>
                </ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">
                    <span className="material-symbols-outlined text-base">format_align_justify</span>
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
