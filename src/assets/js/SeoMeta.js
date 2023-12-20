class SeoMeta {
  static getMixin ({
    title,
    description,
    robots,
    ogTitle,
    ogUrl,
    ogDescription,
    ogImage
  }) {
    return {
      title,
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      // titleTemplate: title => `${title} ` + title2,

      // meta tags
      meta: {
        description: { name: 'description', content: description },
        robots: {
          name: 'robots',
          content: robots
        },
        ogTitle: {
          property: 'og:title',
          content: ogTitle
          // optional; similar to titleTemplate, but allows templating with other meta properties
          // template: ogTitle => `${ogTitle} ` + title2
        },
        ogUrl: {
          property: 'og:url',
          content: ogUrl
        },
        ogDescription: {
          property: 'og:description',
          content: ogDescription
        },
        ogImage: {
          property: 'og:image',
          content: ogImage
        },
        twitterTitle: {
          property: 'twitter:title',
          content: title
        },
        twitterDescription: {
          property: 'twitter:description',
          content: description
        },
        twitterSite: {
          property: 'twitter:site',
          content: title
        }
      }
    }
  }
}

export default SeoMeta
