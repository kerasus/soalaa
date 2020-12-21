<template>
    <div class="mt-4">
        <textarea class="md-text" rows="10" v-model="content"/>
        <MarkdownitVue
                ref="myMarkdownItVue"
                class="md-body"
                :content="content"
                :options="options"
        />
        <div dir="ltr">
            <div id="mathfield" locale="fa">x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</div>
            <div class="latexData" v-html="latexData"></div>
        </div>
    </div>
</template>

<script>

    import MarkdownitVue from 'markdown-it-vue'
    import MathLive from 'mathlive';
    import 'mathlive/dist/mathlive-fonts.css'
    import 'mathlive/dist/mathlive-static.css'
    import MarkdownItKatex from 'markdown-it-katex'

    export default {
        name: "TinymceEditor",
        components: {
            MarkdownitVue
        },
        data () {
            return {
                initObj: {
                    toolbar: 'bold markdown numlist bullist',
                    height: 600,
                    plugins: 'image table markdown lists advlist faketable',
                    icons: 'markdown-labs-demo',
                    // height: 500,
                    // menubar: false,
                    // plugin: 'textpattern',
                    // plugins: [
                    //     'advlist autolink lists link image charmap print preview anchor',
                    //     'searchreplace visualblocks code fullscreen',
                    //     'insertdatetime media table paste code help wordcount'
                    // ],
                    // toolbar:
                    //     'undo redo | formatselect | bold italic backcolor | \
                    //     alignleft aligncenter alignright alignjustify | \
                    //     bullist numlist outdent indent | removeformat | help | addFormula',
                    // directionality : 'rtl',
                    // auto_focus: 'editor',
                    // branding: false,
                    that: this,
                    setup:function(editor){
                        // You can do what you want here
                        // like adding custom buttons
                        editor.ui.registry.addButton('addFormula', {
                            text: 'Add Formula',
                            icon: 'character-count',
                            onAction: () => { this.that.addTextToEditor('$' + this.that.latexData + '$') }
                        });
                    }
                },
                formula: '',
                latexData: null,
                options: {
                    markdownIt: {
                        linkify: true
                    },
                    linkAttributes: {
                        attrs: {
                            target: '_self',
                            rel: 'noopener'
                        }
                    }
                },
                content:
                    '## AsciiMath\n' +
                    'Inline AsciiMath: \\`@(1/2[1-(1/2)^n])/(1-(1/2))=s_n@\\`\n' +
                    '\\x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}a \\n'+
                    '\\`\\`\\`AsciiMath\n' +
                    'oint_Cx^3 dx+4y^2 dy\n' +
                    '2=(((3-x)xx2)/(3-x))\n' +
                    'sum_(m=1)^oosum_(n=1)^oo(m^2 n)/(3^m(m3^n+n3^m)\n' +
                    '\\`\\`\\`\n' +
                    '\\`\\`\\`ASCIIMath\n' +
                    'phi_n(kappa) = 1/(4pi^2 kappa^2)\n' +
                    ' int_0^oo (sin(kappa R))/(kappa R)\n' +
                    ' del/(del R)\n' +
                    '[R^2 (del D_n (R))/(del R)] del R\n' +
                    '\\`\\`\\`\n' +
                    '[AsciiMath Documentation](http://asciimath.org/)\n' +
                    '        {\n' +
                    '          "value": 274,\n' +
                    '          "name": "联盟广告"\n' +
                    '        },\n' +
                    '        {\n' +
                    '          "value": 310,\n' +
                    '          "name": "邮件营销"\n' +
                    '        },\n' +
                    '        {\n' +
                    '          "value": 335,\n' +
                    '          "name": "直接访问"\n' +
                    '        },\n' +
                    '        {\n' +
                    '          "value": 400,\n' +
                    '          "name": "搜索引擎"\n' +
                    '        }\n' +
                    '      ]\n' +
                    '    }\n' +
                    '  ]\n' +
                    '}\n' +
                    '\\`\\`\\`\n' +
                    '## code\n' +
                    '### c\n' +
                    '\\`\\`\\`c\n' +
                    '#include <stdio.h>\n' +
                    'int main(int argc char* argv[]) {\n' +
                    '  printf("Hello, World!");\n' +
                    '  return 0;\n' +
                    '}\n' +
                    '\\`\\`\\`\n' +
                    '### json\n' +
                    '\\`\\`\\`json\n' +
                    '{\n' +
                    '  "name": "markdown-it-vue"\n' +
                    '}\n' +
                    '\\`\\`\\`\n' +
                    '### javascript\n' +
                    '\\`\\`\\`json\n' +
                    'import MarkdownItVue from \'markdown-it-vue\'\n' +
                    'export default {\n' +
                    '  components: {\n' +
                    '    MarkdownItVue\n' +
                    '  }\n' +
                    '}\n' +
                    '\\`\\`\\`\n' +
                    '### bash\n' +
                    '\\`\\`\\`bash\n' +
                    'npm install markdown-it-vue\n' +
                    '\\`\\`\\`\n' +
                    '## table\n' +
                    '| First Header  | Second Header |\n' +
                    '| ------------- | ------------- |\n' +
                    '| Content Cell  | Content Cell  |\n' +
                    '| Content Cell  | Content Cell  |\n' +
                    '## flowchart.js\n' +
                    '\\`\\`\\`flowchart.js\n' +
                    'st=>start: Start|past:>http://www.google.com[blank]\n' +
                    'e=>end: End:>http://www.google.com\n' +
                    'op1=>operation: My Operation|past\n' +
                    'op2=>operation: Stuff|current\n' +
                    'sub1=>subroutine: My Subroutine|invalid\n' +
                    'cond=>condition: Yes\n' +
                    'or No?|approved:>http://www.google.com\n' +
                    'c2=>condition: Good idea|rejected\n' +
                    'io=>inputoutput: catch something...|request\n' +
                    'para=>parallel: parallel tasks\n' +
                    'st->op1(right)->cond\n' +
                    'cond(yes, right)->c2\n' +
                    'cond(no)->para\n' +
                    'c2(true)->io->e\n' +
                    'c2(false)->e\n' +
                    'para(path1, bottom)->sub1(left)->op1\n' +
                    'para(path2, right)->op2->e\n' +
                    'st@>op1({"stroke":"Red"})@>cond({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})@>c2({"stroke":"Red"})@>op2({"stroke":"Red"})@>e({"stroke":"Red"})\n' +
                    '\\`\\`\\`'
            }
        },
        methods: {
            addTextToEditor (text = '') {
                tinymce.activeEditor.execCommand('mceInsertContent', false, text) // eslint-disable-line
            }
        },
        mounted() {
            let that = this
            const mf = MathLive.makeMathField(
                document.getElementById('mathfield'),
                {
                    virtualKeyboardMode: 'manual',
                    onContentDidChange: (mf) => {
                        console.log(mf.getValue());
                        that.latexData = mf.getValue()
                    },
                });
            mf.$setConfig(
                //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
            );
            that.latexData = mf.getValue()
        },
        created() {
            this.$refs.myMarkdownItVue.use(MarkdownItKatex)
        }
    }
</script>

<style>
    .md-text {
        width: 47%;
    }

    .md-body {
        width: 50%;
        margin-left: 20px;
    }

    .tox.tox-silver-sink.tox-tinymce-aux {
        display: none;
    }

    .ML__virtual-keyboard-toggle {
        color: gray !important;
    }

    #mathfield, .latexData {
        font-size: 32px;
        margin: 3em;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, .3);
        box-shadow: 0 0 8px rgba(0, 0, 0, .2)
    }

    .tox.tox-tinymce {
        margin: 0 100px;
    }
</style>

