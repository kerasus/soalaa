import { defineAsyncComponent } from 'vue'

export default {
  BottomNavigation: defineAsyncComponent(() => import('src/components/Widgets/BottomNavigation/BottomNavigation.vue')),
  Cart: defineAsyncComponent(() => import('src/components/Widgets/Cart/Cart.vue')),
  Dashboard: defineAsyncComponent(() => import('src/components/Widgets/Dashboard/Dashboard.vue')),
  DownloadExam: defineAsyncComponent(() => import('src/components/Widgets/DownloadExam/DownloadExam.vue')),
  FeatureBox: defineAsyncComponent(() => import('src/components/Widgets/FeatureBox/FeatureBox.vue')),
  Footer: defineAsyncComponent(() => import('src/components/Widgets/Footer/Footer.vue')),
  GoLogin: defineAsyncComponent(() => import('src/components/Widgets/GoLogin/GoLogin.vue')),
  HomePage: defineAsyncComponent(() => import('src/components/Widgets/HomePage/HomePage.vue')),
  Profile: defineAsyncComponent(() => import('src/components/Widgets/Profile/Profile.vue')),
  Quiz: defineAsyncComponent(() => import('src/components/Widgets/Quiz/Quiz.vue')),
  Slider: defineAsyncComponent(() => import('src/components/Widgets/Slider/Slider.vue')),
  FAQ: defineAsyncComponent(() => import('src/components/Widgets/Subscription/FAQ/FAQ.vue')),
  SubscriptionBanner: defineAsyncComponent(() => import('src/components/Widgets/Subscription/SubscriptionBanner/SubscriptionBanner.vue')),
  SubscriptionPackagesSection: defineAsyncComponent(() => import('src/components/Widgets/Subscription/SubscriptionPackagesSection/SubscriptionPackagesSection.vue')),
  TabPanel: defineAsyncComponent(() => import('src/components/Widgets/TabPanel/TabPanel.vue')),
  TestComponent1Widget: defineAsyncComponent(() => import('src/components/Widgets/TestComponent1Widget/TestComponent1Widget.vue')),
  TestComponent2Widget: defineAsyncComponent(() => import('src/components/Widgets/TestComponent2Widget/TestComponent2Widget.vue')),
  TextWidget: defineAsyncComponent(() => import('src/components/Widgets/TextWidget/TextWidget.vue'))
}
