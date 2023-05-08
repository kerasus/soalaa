<template>
  <div>
    <q-btn v-for="network in networks"
           :key="network.name"
           rounded
           dense
           size="sm"
           :icon="network.icon || undefined"
           class="q-mx-xs"
           @click="onClickItem(network)">

      <div v-if="network.name === 'whatsapp'"
           style="height:20px;">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             shape-rendering="geometricPrecision"
             text-rendering="geometricPrecision"
             image-rendering="optimizeQuality"
             fill-rule="evenodd"
             clip-rule="evenodd"
             viewBox="0 0 640 640"><path d="M546.704 91.89C486.526 31.584 406.482-1.582 321.229-1.582 145.609-1.583 2.67 141.368 2.67 317.118c0 56.139 14.705 111.05 42.567 159.297L.001 641.595l168.959-44.34c46.595 25.382 99.013 38.835 152.222 38.835h.13C496.944 636.09 640 493.14 640 317.401c0-85.182-33.166-165.179-93.344-225.463l.047-.047zM321.323 582.315c-47.599 0-94.218-12.827-134.895-36.957l-9.697-5.788-100.265 26.257 26.776-97.726-6.272-10.04C70.312 415.965 56.4 367.244 56.4 317.13c0-146.082 118.832-264.96 265.066-264.96 70.713 0 137.328 27.65 187.302 77.622 49.996 50.127 77.493 116.588 77.493 187.42-.118 146.187-118.95 265.066-264.96 265.066l.024.036zM466.541 383.85c-7.913-4.028-47.115-23.233-54.39-25.89-7.276-2.658-12.58-4.028-17.977 4.027-5.268 7.914-20.587 25.89-25.252 31.265-4.666 5.28-9.284 6.035-17.197 2.008-7.914-4.028-33.674-12.426-64.064-39.568-23.634-21.095-39.662-47.221-44.328-55.134-4.665-7.914-.52-12.308 3.532-16.193 3.661-3.544 7.925-9.284 11.941-13.95 4.028-4.665 5.28-7.925 7.925-13.31 2.658-5.28 1.359-9.946-.637-13.95-2.008-4.015-17.977-43.217-24.485-59.185-6.39-15.603-13.063-13.43-17.965-13.701-4.665-.237-9.945-.237-15.2-.237-5.257 0-13.95 1.996-21.225 9.933-7.276 7.914-27.898 27.26-27.898 66.45 0 39.201 28.512 77.009 32.516 82.407 4.027 5.267 56.162 85.784 136.029 120.238 18.98 8.161 33.803 13.063 45.355 16.854 19.098 6.024 36.425 5.15 50.126 3.13 15.32-2.256 47.115-19.229 53.788-37.831 6.662-18.615 6.662-34.536 4.666-37.831-1.89-3.544-7.158-5.504-15.201-9.58l-.06.048z" /></svg>
      </div>
      <div v-if="network.name === 'pinterest'"
           style="height:20px;"><svg xmlns="http://www.w3.org/2000/svg"
                                     width="20"
                                     height="20"
                                     fill="currentColor"
                                     class="bi bi-pinterest"
                                     viewBox="0 0 16 16"> <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z" /> </svg></div>
      <div v-if="network.name === 'twitter'"
           style="height:20px;"><svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 3333 3333"
                                     width="20"
                                     height="20"
                                     shape-rendering="geometricPrecision"
                                     text-rendering="geometricPrecision"
                                     image-rendering="optimizeQuality"
                                     fill-rule="evenodd"
                                     clip-rule="evenodd"><path d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm900 1108c-66 30-137 49-212 58 76-46 135-118 162-204-71 42-151 73-234 90-68-72-163-116-270-116-204 0-369 165-369 369 0 29 3 57 9 84-307-16-579-162-761-386-33 56-50 120-50 186 0 128 65 241 164 307-61-2-117-19-167-46v5c0 179 127 328 296 362-31 8-64 13-97 13-24 0-47-2-70-7 47 147 183 253 345 257-127 99-285 158-459 158-30 0-59-2-88-5 164 105 358 166 566 166 679 0 1051-563 1051-1051 0-16 0-32-1-48 72-52 135-117 184-191z" /></svg></div>
      <div v-if="network.name === 'linkedin'"
           style="height:20px;">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             viewBox="0 0 3333 3333"
             shape-rendering="geometricPrecision"
             text-rendering="geometricPrecision"
             image-rendering="optimizeQuality"
             fill-rule="evenodd"
             clip-rule="evenodd"><path d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm-215 1336h342v175h5c48-86 164-175 338-175 361 0 428 225 428 517v596h-357v-528c0-126-3-288-186-288-186 0-214 137-214 279v537h-357V1336zm-247-309c0 102-83 186-186 186-102 0-186-83-186-186 0-102 83-186 186-186 102 0 186 83 186 186zm-371 309h371v1113H834V1336z" /></svg>
      </div>
      <q-tooltip>
        {{ network.tooltip }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'ShareNetwork',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      networks: [
        {
          name: 'whatsapp',
          tooltip: 'whatsapp',
          icon: ''
        },
        {
          name: 'telegram',
          tooltip: 'telegram',
          icon: 'telegram'
        },
        {
          name: 'mail',
          tooltip: 'mail',
          icon: 'mail'
        },
        {
          name: 'linkedin',
          tooltip: 'linkedin',
          icon: ''
        },
        {
          name: 'pinterest',
          tooltip: 'pinterest',
          icon: ''
        },
        {
          name: 'twitter',
          tooltip: 'twitter',
          icon: ''
        },
        {
          name: 'facebook',
          tooltip: 'facebook',
          icon: 'facebook'
        }
      ]
    }
  },
  methods: {
    onClickItem (item) {
      this.$emit('on-select', {
        name: item.name,
        url: this.getShareLink(item.name)
      })
    },
    getShareLink(socialMedia) {
      if (socialMedia === 'telegram') {
        return 'https://telegram.me/share/url?url=' + this.url
      } else if (socialMedia === 'whatsapp') {
        return 'https://web.whatsapp.com/send?l=en&text=' + this.url
      } else if (socialMedia === 'mail') {
        return 'mailto:info@alaatv.com?&subject=' + this.url
      } else if (socialMedia === 'linkedin') {
        return 'https://www.linkedin.com/shareArticle?mini=true&url=' + this.url
      } else if (socialMedia === 'pinterest') {
        return 'https://pinterest.com/pin/create/button/?url=' + this.url
      } else if (socialMedia === 'twitter') {
        return 'https://twitter.com/home?status=' + this.url
      } else if (socialMedia === 'facebook') {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + this.url
      }
    }
  }
}
</script>

<style scoped>

</style>
