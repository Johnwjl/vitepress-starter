export default {
    title: 'Jello\'s Blog',
    description: 'Personal Website',
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ],
    // appearance: 'dark',
    lastUpdated: true,
    themeConfig: {
      logo: '/logo.svg',
      nav: [
        // { text: "home", link: "/" },
        { text: "Web FE", 
          items: [
            { text: 'Vue2', link: '/web-fe/vue2/admin-vite/01-project-build' },
            { text: 'Vue3', link: '/web-fe/vue3' },
            { text: 'Js', link: '/web-fe/js' },
            { text: 'Other', link: '/web-fe/other' },
          ]
        },
        { text: "Works", 
          items: [
            { text: 'Admin ( Vue2 + Vite )', link: '/vue2-admin-vite' },
          ]
        },
        { text: "Life", 
          items: [
            { text: 'Books', link: '/life/books/reading-log' },
          ]
        },
        // { text: "我的掘金", link: "https://juejin.cn/user/2242659452477016" },
        { text: "About me", link: "/me"},
      ],
      socialLinks: [
        // { icon: 'twitter', link: 'https://twitter.com/vite_js' },
        // { icon: 'discord', link: 'https://chat.vitejs.dev' },
        { icon: 'github', link: 'https://github.com/Johnwjl' },
      ],
      // footer: {
      //   message: 'Powered by VitePress',
      //   copyright: '© 2023 Jello'
      // },
      sidebar: {
        // 当用户在 `Life` 目录页面下将会展示这个侧边栏
        '/life/books/': [
          {
            text: 'Books',
            items: [
              { text: 'Reading Log', link: '/life/books/reading-log' }, 
              { text: 'Reading Note', link: '/life/books/reading-note' }, 
            ]
          }
        ],
        '/web-fe/vue2/': [
          {
            text: 'Vue2',
            items: [
              {
                text: 'Admin (CLI)',
                items: [
                  { text: '01. Project Build', link: '/web-fe/vue2/admin-cli/01-project-build' }, 
                  // { text: '02. Login & Router & Permissions', link: '/web-fe/vue2/admin-cli/02-login-router-permissions' }, 
                ]
              },
              {
                text: 'Admin (Vite)',
                items: [
                  { text: '01. Project Build', link: '/web-fe/vue2/admin-vite/01-project-build' }, 
                  { text: '02. Login & Router & Permissions', link: '/web-fe/vue2/admin-vite/02-login-router-permissions' }, 
                ]
              }
            ]
          }
        ],
      },
      lastUpdatedText: 'Updated Date'
    }
  }