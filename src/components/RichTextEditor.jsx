import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

// Recebemos a função 'onChange' via props
export default function RichTextEditor({ value, onChange }) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
    ],

    content: value || "",

    // O onUpdate avisa o componente pai sempre que o conteúdo muda
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); // Pega o texto formatado em HTML
      if (onChange) {
        onChange(html);
      }
    },

    editorProps: {
      attributes: {
        class: "outline-none min-h-32 p-4 text-[#78401F] bg-white",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border w-full border-[#E8CDB5] rounded-xl overflow-hidden bg-white">

      {/* Barra de ferramentas */}
      <div className="flex items-center gap-4 p-3 border-b border-[#E8CDB5] bg-orange-50/30">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`cursor-pointer ${editor.isActive("bold") ? "font-bold text-orange-700" : ""}`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`cursor-pointer ${editor.isActive("italic") ? "text-orange-700" : ""}`}
        >
          <i>I</i>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`cursor-pointer ${editor.isActive("underline") ? "text-orange-700" : ""}`}
        >
          <u>U</u>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`cursor-pointer ${editor.isActive("bulletList") ? "text-orange-700" : ""}`}
        >
          <i className="flex fi fi-sr-list"></i>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`cursor-pointer ${editor.isActive("orderedList") ? "text-orange-700" : ""}`}
        >
          <i className="flex fi fi-br-outdent"></i>
        </button>

        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            const url = window.prompt("Digite o link:");

            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <i className="flex fi fi-br-link-alt"></i>
        </button>

      </div>

      {/* Área de edição */}
      <EditorContent editor={editor} />

    </div>
  );
}