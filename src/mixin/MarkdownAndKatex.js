import '@/assets/scss/markdownKatex.scss'
import md from '@/plugins/Markdown'

const mixinMarkdownAndKatex = {
    computed: {
        markdown () {
            return md
        }
    }
}

export default mixinMarkdownAndKatex
