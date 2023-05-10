import mixinSEO from '../mixin/SEO.js'
import mixinTree from '../mixin/Tree.js'
import mixinAuth from '../mixin/Auth.js'
import mixinQuiz from '../mixin/Quiz.js'
import mixinTicket from '../mixin/Ticket.js'
import mixinDrawer from '../mixin/Drawer.js'
import mixinWidget from 'src/mixin/Widgets.js'
import mixinGetQuizData from './getExamdata.js'
import mixinDateOptions from '../mixin/DateOptions.js'
import mixinPageOptions from '../mixin/PageOptions.js'
import mixinPageBuilder from 'src/mixin/PageBuilder.js'
import AdminActionOnQuestion from '../mixin/AdminActionOnQuestion.js'
import mixinPrefetchServerData from 'src/mixin/PrefetchServerData.js'
import mixinUserActionOnQuestion from '../mixin/UserActionOnQuestion.js'
import PageBuilderOptionPanel from 'src/mixin/PageBuilderOptionPanel.js'

export {
  mixinSEO,
  mixinAuth,
  mixinQuiz,
  mixinTree,
  mixinDrawer,
  mixinTicket,
  mixinWidget,
  mixinGetQuizData,
  mixinDateOptions,
  mixinPageBuilder,
  mixinPageOptions,
  AdminActionOnQuestion,
  PageBuilderOptionPanel,
  mixinPrefetchServerData,
  mixinUserActionOnQuestion
}
