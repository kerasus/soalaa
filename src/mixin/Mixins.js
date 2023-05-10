import mixinTree from '../mixin/Tree'
import mixinSEO from '../mixin/SEO.js'
import mixinAuth from '../mixin/Auth'
import mixinQuiz from '../mixin/Quiz'
import mixinTicket from '../mixin/Ticket'
import mixinDrawer from '../mixin/Drawer'
import mixinWidget from 'src/mixin/Widgets'
import mixinGetQuizData from './getExamdata'
import mixinDateOptions from '../mixin/DateOptions'
import mixinPageOptions from '../mixin/PageOptions.js'
import mixinPageBuilder from 'src/mixin/PageBuilder.js'
import AdminActionOnQuestion from '../mixin/AdminActionOnQuestion'
import mixinUserActionOnQuestion from '../mixin/UserActionOnQuestion'
import mixinPrefetchServerData from 'src/mixin/PrefetchServerData.js'
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
