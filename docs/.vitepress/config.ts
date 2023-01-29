export default {
    title: 'Jello\'s Blog',
    description: 'Personal Website',
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ],
    // appearance: 'dark',
    themeConfig: {
      logo: '/logo.svg',
      nav: [
        // { text: "首页", link: "/" },
        // { text: "前端总结", link: "/javascript/" },
        // { text: "生活感悟", link: "/life/" },
        { text: "我的掘金", link: "https://juejin.cn/user/2242659452477016" },
        { text: "关于我", link: "/me/" },
      ],
      socialLinks: [
        // { icon: 'twitter', link: 'https://twitter.com/vite_js' },
        // { icon: 'discord', link: 'https://chat.vitejs.dev' },
        { icon: 'github', link: 'https://github.com/Johnwjl' },
      ],
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2019-present Evan You'
      }
    }
  }