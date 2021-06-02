<template>
  <div v-if="editor">
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('paragraph')"
      @click="editor.chain().focus().setParagraph().run()"
    >
      <v-icon>mdi-format-paragraph</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('heading', { level: 1 })"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      <v-icon>mdi-format-header-1</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('heading', { level: 2 })"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      <v-icon>mdi-format-header-2</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('heading', { level: 3 })"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      <v-icon>mdi-format-header-3</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('heading', { level: 4 })"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      <v-icon>mdi-format-header-4</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('heading', { level: 5 })"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
    >
      <v-icon>mdi-format-header-5</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('heading', { level: 6 })"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      <v-icon>mdi-format-header-6</v-icon>
    </v-btn>
    <br>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('bold')"
      @click="editor.chain().focus().toggleBold().run()"
    >
      <v-icon>mdi-format-bold</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('italic')"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      <v-icon>mdi-format-italic</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('strike')"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      <v-icon>mdi-format-strikethrough</v-icon>
    </v-btn>

    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('highlight')"
      @click="editor.chain().focus().toggleHighlight().run()"
    >
      <v-icon>mdi-format-color-highlight</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive({ textAlign: 'left' })"
      @click="editor.chain().focus().setTextAlign('left').run()"
    >
      <v-icon>mdi-format-align-left</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive({ textAlign: 'center' })"
      @click="editor.chain().focus().setTextAlign('center').run()"
    >
      <v-icon>mdi-format-align-center</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive({ textAlign: 'right' })"
      @click="editor.chain().focus().setTextAlign('right').run()"
    >
      <v-icon>mdi-format-align-right</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive({ textAlign: 'justify' })"
      @click="editor.chain().focus().setTextAlign('justify').run()"
    >
      <v-icon>mdi-format-align-justify</v-icon>
    </v-btn>


    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('bulletList')"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('orderedList')"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      <v-icon>mdi-format-list-numbered</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('code')"
      @click="editor.chain().focus().toggleCode().run()"
    >
      <v-icon>mdi-code-braces</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('codeBlock')"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      <v-icon>mdi-code-braces-box</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      :outlined="editor.isActive('blockquote')"
      @click="editor.chain().focus().toggleBlockquote().run()"
    >
      <v-icon>mdi-comment-quote-outline</v-icon>
    </v-btn>
    <br>
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().unsetAllMarks().run()"
    >
      <v-icon>mdi-format-clear</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().clearNodes().run()"
    >
      <v-icon>mdi-vector-polyline-remove</v-icon>
    </v-btn>
    <br>
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().setHardBreak().run()"
    >
      <v-icon>mdi-arrow-expand-down</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().setHorizontalRule().run()"
    >
      <v-icon>mdi-arrow-split-horizontal</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
    >
      <v-icon>mdi-table-plus</v-icon>
    </v-btn>
    <!--        <v-btn small tile icon @click="editor.chain().focus().insertContent('<vue-component></vue-component>').run()">-->
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().insertContent('<tiptap-interactive-katex></tiptap-interactive-katex>').run()"
    >
      <v-icon>mdi-sigma</v-icon>
    </v-btn>
    <br>
    <dynamic-table :editor="editor" />
    <br>
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().undo().run()"
    >
      <v-icon>mdi-undo</v-icon>
    </v-btn>
    <v-btn
      small
      tile
      icon
      @click="editor.chain().focus().redo().run()"
    >
      <v-icon>mdi-redo</v-icon>
    </v-btn>
  </div>
</template>

<script>
    import DynamicTable from "@/components/tiptap/toolbar/dynamicTools/DynamicTable"

  export default {
    name: 'Toolbar',
    components: {
      DynamicTable,
    },
    props: ['editor'],
  }
</script>

<style scoped>
    button:not(.v-btn) {
        border: solid 1px gray;
        padding: 5px;
        margin: 2px;
    }
</style>
