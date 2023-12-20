export class Fake {
  constructor() {
    this.name = 'Fake Data'
    this.firstName = [
      'پارسا',
      'سوگند',
      'آیلار',
      'آیسودا',
      'یاسمن',
      'آیدین',
      'غزاله',
      'سیاوش',
      'سهراب',
      'دلارام',
      'دنیا',
      'آیدا',
      'سالار',
      'یاشار',
      'مهسا',
      'یاشار',
      'توپراک',
      'سپنتا',
      'بابک',
      'هامان',
      'ویدا'
    ]
    this.lastName = [
      'بایراک دار',
      'پارسا',
      'ایرانی',
      'فردوسی',
      'سامانی',
      'جمشیدی',
      'فرداد',
      'آرام',
      'سپهری',
      'فرمانفرمانیان',
      'پاکان',
      'خرمدین',
      'کیانی',
      'آذری',
      'ایزدیار',
      'پاشایی',
      'الدار',
      'مینایی',
      'پورسینا',
      'دامون',
      'آرکانیان'
    ]
    this.description = 'این یک تست است'
    this.title = [
      'زیست شناسی',
      'شیمی',
      'فیزیک',
      'مشاوره',
      'ریاضی',
      'زمین شناسی',
      'روانشناسی',
      'فناوری اطلاعات',
      'فنی',
      'کامپیوتر',
      'پاکان',
      'حسابان',
      'منطق',
      'جبر',
      'گسسته',
      'پایگاه داده',
      'برق',
      'جانورشناسی',
      'شبکه',
      'مدیریت استراتژیک',
      'مبانی اینترنت اشیا'
    ]

    this.photo = 'https://nodes.alaatv.com/upload/images/product/riazie110_20220831103918.jpg?w=400&h=400'

    this.url = 'http://office.alaa.tv/'

    this.section = [
      'قلب و عروق',
      'مشتق',
      'دینامیک',
      'امنیت',
      'الکترونیک',
      'DNA',
      'فیلان فیلان',
      'بخش اپل',
      'دالتون ها',
      'بازی',
      'کتاب خوانی',
      'بهداشت',
      'فیلان بهمدان',
      'نمیدونم'
    ]
  }

  /**
   * It takes a key as an argument and returns a random value from the corresponding array or string
   * @param key - The name of the field you want to generate data for.
   * @returns the value of the key.
   */
  getData(key) {
    let val
    if (key.toLowerCase() === 'name' || key.toLowerCase() === 'firstname') {
      const randomIndex = Math.floor(Math.random() * (this.firstName.length))
      val = this.firstName[randomIndex]
      return val
    }
    if (key.toLowerCase() === 'lastname') {
      const randomIndex = Math.floor(Math.random() * (this.lastName.length))
      val = this.lastName[randomIndex]
      return val
    }
    if (key.toLowerCase() === 'fullname' || key.toLowerCase() === 'teacher') {
      const randomIndexFirstName = Math.floor(Math.random() * (this.firstName.length))
      const randomIndexLastName = Math.floor(Math.random() * (this.lastName.length))
      val = this.firstName[randomIndexFirstName] + ' ' + this.lastName[randomIndexLastName]
      return val
    }
    if (key.toLowerCase() === 'description' || key.toLowerCase() === 'body') {
      val = this.description
      return val
    }
    if (this[key] === undefined) {
      val = 'این یک داده تست است'
      return val
    }
    if (Array.isArray(this[key])) {
      const randomIndex = Math.floor(Math.random() * (this[key].length))
      val = this[key][randomIndex]
    } else {
      val = this[key]
    }

    return val
  }

  /**
   * It takes an object, and returns a new object with the same keys, but with the values replaced with
   * fake data
   * @param obj - The object that you want to generate fake data for.
   * @returns An object with the same keys as the object passed in, but with the values replaced with
   * fake data.
   */
  generate(obj) {
    const fakeElement = {}
    Object.keys(obj).forEach((key) => {
      if (typeof (obj[key]) === 'object' && obj[key] !== null) {
        fakeElement[key] = this.generate(obj[key])
      } else {
        fakeElement[key] = this.getData(key)
      }
    })
    return fakeElement
  }

  /**
   * It takes an object and a number, and returns an array of objects with the same structure as the
   * input object, but with random data
   * @param obj - The object that you want to generate fake data for.
   * @param number - The number of fake data you want to generate
   * @returns An array of objects with the same structure as the object passed in.
   */
  fakeData(obj, number) {
    if (!obj || (typeof (obj) !== 'object')) {
      return 'Object is not valid'
    }
    const data = []
    for (let index = 0; index < number; index++) {
      data.push(this.generate(obj))
    }

    return data
  }
}
