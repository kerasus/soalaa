// import SetAPI from 'src/api/models/set.js'
import CartAPI from 'src/api/models/cart.js'
import AuthAPI from 'src/api/models/Auth.js'
// import UserAPI from 'src/api/models/user.js'
import TreeAPI from 'src/api/models/tree.js'
// import PlanAPI from 'src/api/models/Plan.js'
// import OrderAPI from 'src/api/models/order.js'
// import PagesAPI from 'src/api/models/pages.js'
// import TicketAPI from 'src/api/models/ticket.js'
// import CouponAPI from 'src/api/models/coupon.js'
// import EventsAPI from 'src/api/models/Events.js'
// import ContentAPI from 'src/api/models/content.js'
// import ProductAPI from 'src/api/models/product.js'
// import ForrestAPI from 'src/api/models/Forrest.js'
// import CommentAPI from 'src/api/models/comment.js'
// import AbrishamAPI from 'src/api/models/Abrisham.js'
// import AttributeAPI from 'src/api/models/attribute.js'
// import StudyPlanAPI from 'src/api/models/studyPlan.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'
// import ReferralCodeAPI from 'src/api/models/ReferralCode.js'
// import ContentTimepointAPI from 'src/api/models/ContentTimepoint.js'
// import LiveDescriptionAPI from 'src/api/models/LiveDescription.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  // set: new SetAPI(),
  auth: new AuthAPI(),
  // user: new UserAPI(),
  cart: new CartAPI(),
  tree: new TreeAPI(),
  // pages: new PagesAPI(),
  // plan: new PlanAPI(),
  // order: new OrderAPI(),
  // events: new EventsAPI(),
  // coupon: new CouponAPI(),
  // ticket: new TicketAPI(),
  // forrest: new ForrestAPI(),
  // comment: new CommentAPI(),
  // content: new ContentAPI(),
  // product: new ProductAPI(),
  // abrisham: new AbrishamAPI(),
  // attribute: new AttributeAPI(),
  // studyPlan: new StudyPlanAPI(),
  pageSetting: new PageSettingAPI()
  // referralCode: new ReferralCodeAPI(),
  // liveDescription: new LiveDescriptionAPI(),
  // contentTimepoint: new ContentTimepointAPI()
}
