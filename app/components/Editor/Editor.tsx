"use client"

import { useRef, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import {
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote, 
  Undo, Redo, ImagePlus, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight,
} from "lucide-react"
import { uploadReviewImage } from "@/lib/uploadImages"
import ToolbarButton from "@/components/Editor/ToolbarButton"
import ToolbarDivider from "@/components/Editor/ToolbarDivider"

type EditorProps = {
  value?: string
  onChange?: (html: string) => void
}

export default function Editor({
  value = "",
  onChange,
}: EditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { 
          class: "review-image rounded-lg my-6 max-w-full h-auto" 
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { 
          class: "text-primary underline underline-offset-4" 
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: [
          "prose", "prose-neutral", "dark:prose-invert", "max-w-none", 
          "min-h-[350px]", "p-5", "focus:outline-none",
        ].join(" "),
      },
    },
    onUpdate({ editor }) {
      console.log(editor.getHTML())
      if (onChange) onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    /*
     * 8MB example limit.
     */

    if (file.size > 8 * 1024 * 1024) {
      alert("Images must be smaller than 8MB.")
      return
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    try {
      setUploading(true)

      const image = await uploadReviewImage(file)

      editor?.chain().focus().setImage({
        src: image.url, 
        alt: file.name, 
        title: file.name
      }).run()
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Unable to upload image.")
    } finally {
      setUploading(false)

      /*
       * Allows the same image to be
       * selected again if needed.
       */

      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }
    }
  }

  const addLink = () => {
    const previousUrl = editor?.getAttributes("link").href
    const url = window.prompt("Enter URL", previousUrl ?? "" )

    if (url === null) return

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange("link").setLink({
      href: url,
    }).run()
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Quote"
        >
          <Quote size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={addLink}
          active={editor.isActive("link")}
          title="Link"
        >
          <LinkIcon size={18} />
        </ToolbarButton>


        {/* IMAGE UPLOAD */}

        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          disabled={uploading}
          title="Upload Image"
        >
          <ImagePlus size={18} />

          {uploading && (
            <span className="ml-1 text-xs">
              Uploading...
            </span>
          )}
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          title="Align Right"
        >
          <AlignRight size={18} />
        </ToolbarButton>

        <div className="flex-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo size={18} />
        </ToolbarButton>
      </div>
      {/* Hidden image input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={handleImage}
      />
      {/* Editor */}
      <EditorContent editor={editor} className={cn("review-editor")} />
    </div>
  )
}
