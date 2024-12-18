import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Jello\'s Blog',
    description: 'Personal Website',
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      [
        'script',
        { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-374HL7DXQG' }
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-374HL7DXQG');`
      ],
    ],
    appearance: 'dark',
    lastUpdated: true,
    cleanUrls: true,
    markdown: {
      math: true,
      // theme: 'material-theme-palenight',
      lineNumbers: true // 代码行号
    },
    themeConfig: {
      search: {
        provider: 'local',
        options: {
              // _render(src, env, md) {
              //   debugger
              // console.log('src', src)
              // console.log('env', env)
              // console.log('md', md)
              //   const html = md.render(src, env)
              //   if (env.frontmatter?.search === false) return ''
              //   if (env.relativePath.startsWith('life/book/')) {
              //     debugger
              //     console.log(env.relativePath)
              //     return ''
              //   }
              //   return html
              // }
        }
      },
      // logo: '/logo.svg',
      logo: { light: '/logo-1.svg', dark: '/logo-2.svg'},
      nav: [
        // { text: "home", link: "/" },
        { text: "Web FE", 
          items: [
            { text: 'Vue3', link: '/FE/vue3/Composition-API/start' },
            { text: 'Vue2', link: '/FE/vue2/vue2-note' },
            { text: 'HTML5', link: '/FE/html/usage' },
            { text: 'CSS3', link: '/FE/css/skills' },
            { text: 'JavaScript', link: '/FE/javascript/es6+/promise' },
            { text: 'TypeScript', link: '/FE/typescript/typescript-note' },
            { text: '前端工程化', link: '/FE/front-end_engineering/introduction' },
            { text: '前端部署', link: '/FE/deploy/Prior' },
            { text: 'Other', link: '/FE/other/code-standards/code-standards' },
          ]
        },
        { text: "CS", 
          items: [
            { text: 'C', link: '/cs/C/C_start' },
            { text: 'Python', link: '/cs/python/初识python' },
            { text: '计算机组成', link: '/cs/computer-organization/index' },
          ]
        },
        { text: "Showcases", 
          items: [
            { text: 'Admin ( Vue2 + Vite )', link: 'https://vue2-admin-vite.jellowang.cn/' },
          ]
        },
        { text: "DevelopDocs", 
          items: [
            {text: '通用方案', link: '/DevelopDocs/通用方案/http'},
            {text: '食堂点餐小程序', link: '/DevelopDocs/Canteen-Order-mp/code_structure'},
          ]
        },
        { text: "Thoughts", 
          items: [
            { text: '终身发展', link: '/Thoughts/lifelong-development/Adapt-to-the-future' },
          ]
        },
        { text: "Master", 
          items: [
            { text: 'Math', link: '/Master/Math/Basics-of-Economic-Mathematics(396)' },
          ]
        },
        // { text: "Life", link: '/life/me'},
        // { text: "我的掘金", link: "https://juejin.cn/user/2242659452477016" },
        { text: "Me", link: "/me"},
      ],
      socialLinks: [

        // juejin
        {
          icon: {
            svg: '<svg t="1675497269909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1993" width="200" height="200"><path d="M465.189 161.792c-22.967 18.14-44.325 35.109-47.397 37.742l-5.851 4.68 10.971 8.632c5.998 4.827 11.85 9.508 13.02 10.532 1.17 1.024 17.993 14.336 37.156 29.696l34.962 27.795 5.267-3.95c2.925-2.194 23.259-18.432 45.348-35.986 21.943-17.555 41.253-32.768 42.716-33.646 1.609-1.024 2.779-2.194 2.779-2.78 0-0.438-9.655-8.63-21.504-17.846-11.995-9.363-22.674-17.847-23.845-18.871-15.945-13.02-49.737-39.059-50.76-39.059-0.586 0.147-19.896 14.922-42.862 33.061z m233.325 180.37C507.465 493.275 508.928 492.105 505.417 489.911c-3.072-1.902-11.556-8.485-64.073-50.03-9.07-7.168-18.578-14.775-21.358-16.823-2.78-2.194-8.777-6.875-13.312-10.532-4.68-3.657-10.679-8.339-13.312-10.533-13.165-10.24-71.095-56.027-102.107-80.457-5.852-4.681-11.41-8.485-12.142-8.485-0.731 0-10.971 7.754-22.674 17.116-11.703 9.508-22.674 18.286-24.284 19.456-1.755 1.17-5.12 3.95-7.46 6.144-2.34 2.34-4.828 4.096-5.413 4.096-3.072 0-0.731 3.072 6.437 8.777 4.096 3.218 8.777 6.875 10.094 8.046 1.316 1.024 10.24 8.045 19.748 15.506s23.26 18.286 30.428 23.99c19.31 15.215 31.89 25.308 127.853 101.084 47.836 37.742 88.796 69.779 90.844 71.095 3.657 2.487 3.95 2.487 7.46-0.292a1041.42 1041.42 0 0 0 16.092-12.727c6.875-5.413 14.775-11.703 17.554-13.897 30.135-23.699 80.018-63.05 81.774-64.512 1.17-1.024 12.434-9.802 24.868-19.603s37.888-29.696 56.32-44.324c18.579-14.629 46.227-36.425 61.733-48.567 15.506-12.142 27.794-22.528 27.502-23.26-0.878-1.17-57.637-47.104-59.978-48.274-0.731-0.439-18.578 12.727-39.497 29.257z" fill="#006CFF" p-id="1994"></path><path d="M57.93 489.326c-15.215 12.288-28.527 23.405-29.697 24.576-2.34 2.194-5.412-0.44 80.018 66.852 33.207 26.185 32.622 25.747 57.637 45.495 10.386 8.192 36.279 28.672 57.783 45.495 38.18 30.135 44.91 35.401 52.663 41.545 2.048 1.756 22.967 18.14 46.372 36.572 23.26 18.432 74.167 58.514 112.933 89.088 38.912 30.573 71.095 55.734 71.826 56.027 0.732 0.293 7.46-4.389 14.921-10.386 21.797-16.97 90.259-70.949 101.523-79.872 5.705-4.535 12.873-10.24 15.945-12.58 3.072-2.488 6.436-5.12 7.314-5.852 0.878-0.878 11.85-9.509 24.283-19.31 20.773-16.091 59.1-46.226 64.366-50.615 1.17-1.024 5.12-4.096 8.777-6.875 3.657-2.78 7.9-6.29 9.509-7.607 1.609-1.317 14.775-11.703 29.257-23.113 29.11-22.82 42.277-33.207 88.503-69.632 17.262-13.605 32.475-25.454 33.646-26.478 2.486-2.048 31.451-24.869 44.617-35.255 4.827-3.657 9.07-7.168 9.508-7.607 0.44-0.585 5.998-4.827 12.435-9.8 6.436-4.828 13.165-10.24 15.067-11.85l3.365-2.926-9.948-7.753c-5.412-4.388-10.24-8.192-10.679-8.63-1.17-1.317-22.381-18.433-30.135-24.284-3.95-3.072-7.314-5.998-7.606-6.73-1.317-3.071-6.73 0.147-29.258 17.994-13.458 10.532-25.746 20.187-27.355 21.504-1.61 1.463-10.533 8.338-19.749 15.652-9.216 7.168-17.115 13.459-17.554 13.898-0.439 0.438-6.583 5.412-13.897 10.971-7.168 5.559-15.214 11.703-17.7 13.75-4.974 4.097-5.413 4.39-20.334 16.239-5.56 4.388-11.264 8.777-12.435 9.8-1.17 1.025-20.333 16.092-42.422 33.354-22.09 17.408-41.546 32.768-43.155 34.084-1.609 1.463-14.482 11.557-28.525 22.528s-40.814 32.037-59.539 46.812c-18.578 14.775-42.276 33.353-52.516 41.399s-23.26 18.285-28.965 22.82l-10.386 8.339-4.389-3.072c-2.34-1.756-4.68-3.511-5.12-3.95-0.439-0.439-4.973-4.096-10.24-8.046-11.849-9.216-14.482-11.264-16.676-13.166-0.878-0.877-4.243-3.51-7.46-5.851-3.22-2.487-6.145-4.681-6.584-5.12-0.439-0.439-6.875-5.705-14.482-11.703-7.607-5.851-14.921-11.556-16.091-12.58-1.317-1.17-17.116-13.605-35.255-27.795-17.993-14.19-35.109-27.648-38.035-29.842-5.705-4.681-33.499-26.624-125.074-98.743-34.523-27.209-72.704-57.344-84.846-66.852-49.737-39.498-55.15-43.594-56.905-43.447-0.877 0-14.043 10.24-29.257 22.528z" fill="#006CFF" p-id="1995"></path></svg>'
          },
          link: 'https://juejin.cn/user/4248168658903207'
        },

        // github
        { icon: 'github', link: 'https://github.com/Johnwjl' },
        
        // gitlab
        {
          icon: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="m231.9 169.8l-94.8 65.6a15.7 15.7 0 0 1-18.2 0l-94.8-65.6a16.1 16.1 0 0 1-6.4-17.3L45 50a12 12 0 0 1 22.9-1.1L88.5 104h79l20.6-55.1A12 12 0 0 1 211 50l27.3 102.5a16.1 16.1 0 0 1-6.4 17.3Z"/></svg>'
          },
          link: 'https://gitlab.com/Johnwjl'
        },

        // weibo
        {
          icon: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 30 24"><path fill="currentColor" d="M12.44 22.251c-4.898.482-9.131-1.732-9.449-4.951s3.398-6.216 8.301-6.701s9.13 1.724 9.448 4.949s-3.398 6.219-8.298 6.699zm-1.291-3.818a1.858 1.858 0 0 1-2.265.735l.012.004a1.303 1.303 0 0 1-.497-1.966l-.002.003a1.861 1.861 0 0 1 2.221-.735l-.013-.004a1.306 1.306 0 0 1 .542 1.965l.003-.004zm1.564-2.004a.712.712 0 0 1-.854.31l.005.002a.48.48 0 0 1-.217-.723l-.001.002a.684.684 0 0 1 .832-.294l-.005-.002a.494.494 0 0 1 .221.741l.001-.002zm.217-3.349a5.34 5.34 0 0 0-5.969 2.581l-.014.027a3.641 3.641 0 0 0 2.295 5.173l.025.006a5.295 5.295 0 0 0 6.306-2.653l.014-.03a3.657 3.657 0 0 0-2.634-5.105l-.023-.004zm9.315-1.507c-.426-.123-.702-.222-.499-.757c.233-.428.371-.937.371-1.478s-.137-1.05-.379-1.494l.008.016c-.962-1.37-3.59-1.297-6.607-.037c0 0-.943.408-.703-.334c.463-1.499.388-2.739-.333-3.46c-1.65-1.657-5.999.046-9.718 3.784c-2.774 2.796-4.386 5.756-4.386 8.311c0 4.903 6.281 7.883 12.422 7.883c8.05 0 13.41-4.68 13.41-8.4c0-2.244-1.905-3.515-3.59-4.045v.012zm2.35-6.272a3.812 3.812 0 0 0-3.672-1.18l.025-.005a.965.965 0 1 0 .396 1.889l-.006.001A1.86 1.86 0 0 1 23.5 8.407l.004-.013a.97.97 0 0 0 .622 1.22l.007.002a1.002 1.002 0 0 0 1.22-.624l.002-.007c.118-.352.186-.757.186-1.179c0-.986-.373-1.884-.985-2.563l.003.003l.037.055zm2.978-2.703A7.814 7.814 0 0 0 21.749.002a7.85 7.85 0 0 0-1.684.182l.052-.01a1.126 1.126 0 0 0 .47 2.202l-.007.001a5.556 5.556 0 0 1 6.446 7.183l.011-.039a1.13 1.13 0 0 0 2.145.712l.002-.008c.24-.72.378-1.548.378-2.41a7.84 7.84 0 0 0-2.032-5.277l.006.007l.037.055z"/></svg>'
          },
          link: 'https://weibo.com/jellofrontend'
        },
        
        
        // twitter
        // {
        //   icon: {
        //     svg: '<svg xmlns="http://www.w3.org/2000/svg" width="39.4" height="32" viewBox="0 0 1231.051 1000"><path fill="currentColor" d="M1231.051 118.453q-51.422 76.487-126.173 130.403q.738 14.46.738 32.687q0 101.273-29.53 202.791q-29.53 101.519-90.215 194.343q-60.685 92.824-144.574 164.468q-83.889 71.644-201.677 114.25q-117.788 42.606-252.474 42.606q-210.2 0-387.147-113.493q31.406 3.495 60.242 3.495q175.605 0 313.687-108.177q-81.877-1.501-146.654-50.409q-64.777-48.907-89.156-124.988q24.097 4.59 47.566 4.59q33.782 0 66.482-8.812q-87.378-17.5-144.975-87.04q-57.595-69.539-57.595-160.523v-3.126q53.633 29.696 114.416 31.592q-51.762-34.508-82.079-89.999q-30.319-55.491-30.319-120.102q0-68.143 34.151-126.908q95.022 116.607 230.278 186.392q135.258 69.786 290.212 77.514q-6.609-27.543-6.621-57.485q0-104.546 73.994-178.534Q747.623 0 852.169 0q109.456 0 184.392 79.711q85.618-16.959 160.333-61.349q-28.785 90.59-110.933 139.768q75.502-8.972 145.088-39.677z"/></svg>'
        //   },
        //   link: 'https://twitter.com/Jello2046'
        // },
        
        // douban
        // {
        //   icon: {
        //     svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h16M5 4h14M8 8h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm8 6l-2 6m-6-3l1 3"/></svg>'
        //   },
        //   link: 'https://www.douban.com/people/johnwjl'
        // },
        // bilibili
        // {
        //   icon: {
        //     svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M488.6 104.1c16.7 18.1 24.4 39.7 23.3 65.7v202.4c-.4 26.4-9.2 48.1-26.5 65.1c-17.2 17-39.1 25.9-65.5 26.7H92.02c-26.45-.8-48.21-9.8-65.28-27.2C9.682 419.4.767 396.5 0 368.2V169.8c.767-26 9.682-47.6 26.74-65.7C43.81 87.75 65.57 78.77 92.02 78h29.38L96.05 52.19c-5.75-5.73-8.63-13-8.63-21.79c0-8.8 2.88-16.06 8.63-21.797C101.8 2.868 109.1 0 117.9 0s16.1 2.868 21.9 8.603L213.1 78h88l74.5-69.397C381.7 2.868 389.2 0 398 0c8.8 0 16.1 2.868 21.9 8.603c5.7 5.737 8.6 12.997 8.6 21.797c0 8.79-2.9 16.06-8.6 21.79L394.6 78h29.3c26.4.77 48 9.75 64.7 26.1zm-38.8 69.7c-.4-9.6-3.7-17.4-10.7-23.5c-5.2-6.1-14-9.4-22.7-9.8H96.05c-9.59.4-17.45 3.7-23.58 9.8c-6.14 6.1-9.4 13.9-9.78 23.5v194.4c0 9.2 3.26 17 9.78 23.5s14.38 9.8 23.58 9.8H416.4c9.2 0 17-3.3 23.3-9.8c6.3-6.5 9.7-14.3 10.1-23.5V173.8zm-264.3 42.7c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2c-6.2 6.3-14 9.5-23.6 9.5c-9.6 0-17.5-3.2-23.6-9.5c-6.1-6.3-9.4-14-9.8-23.2v-33.3c.4-9.1 3.8-16.9 10.1-23.2c6.3-6.3 13.2-9.6 23.3-10c9.2.4 17 3.7 23.3 10zm191.5 0c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2c-6.1 6.3-14 9.5-23.6 9.5c-9.6 0-17.4-3.2-23.6-9.5c-7-6.3-9.4-14-9.7-23.2v-33.3c.3-9.1 3.7-16.9 10-23.2c6.3-6.3 14.1-9.6 23.3-10c9.2.4 17 3.7 23.3 10z"/></svg>'
        //   },
        //   link: 'https://space.bilibili.com/26538450'
        // },
        // zhihu
        // {
        //   icon: {
        //     svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73-.5 1.434-.68 2.11h4.587c.545-.006.445 1.168.445 1.171H9.384a58.104 58.104 0 0 1-.112 3.797h2.712c.388.023.393 1.251.393 1.266H9.183a9.223 9.223 0 0 1-.408 2.102l.757-.604c.452.456 1.512 1.712 1.906 2.177c.473.681.063 2.081.063 2.081l-2.794-3.382c-.653 2.518-1.845 3.607-1.845 3.607c-.523.468-1.58.82-2.64.516c2.218-1.73 3.44-3.917 3.667-6.497H4.491c0-.015.197-1.243.806-1.266h2.71c.024-.32.086-3.254.086-3.797H6.598c-.136.406-.158.447-.268.753c-.594 1.095-1.603 1.122-1.907 1.155c.906-1.821 1.416-3.6 1.591-4.064c.425-1.124 1.671-1.125 1.671-1.125zM13.078 6h6.377v11.33h-2.573l-2.184 1.373l-.401-1.373h-1.219zm1.313 1.219v8.86h.623l.263.937l1.455-.938h1.456v-8.86z"/></svg>'
        //   },
        //   link: 'https://www.zhihu.com/people/johnwjl'
        // },
        // RSS
        // {
        //   icon: {
        //     svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0a8 8 0 0 0-8-8a1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6a1 1 0 1 1-2 0a4 4 0 0 0-4-4a1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"/></svg>'
        //   },
        //   link: 'https://www.zhihu.com/people/johnwjl'
        // },
        
      ],
      // footer: {
      //   message: 'Powered by VitePress',
      //   copyright: '© 2024 Jello'
      // },
      sidebar: {
        '/FE/javascript/': [
          {
            text: 'JavaScript',
            // collapsed: false,
            items: [
              {
                text: 'ES5',
                collapsed: true,
                items: [
                  { text: '控制循环', link: '/FE/javascript/es5/control-Loop' },
                  { text: '01. Project Build', link: '/FE/vue2/admin-cli/01-project-build' }, 
                  // { text: '02. Login & Router & Permissions', link: '/FE/vue2/admin-cli/02-login-router-permissions' }, 
                ]
              },
              {
                text: 'ES6+',
                collapsed: true,
                items: [
                  { text: 'Promise', link: '/FE/javascript/es6+/promise' }, 
                ]
              }
            ]
          }
        ],
        '/FE/vue3/': [
          {
            text: 'Vue3',
            items: [
              {
                text: 'Composition API',
                collapsed: true,
                items: [
                  { text: '综述', link: '/FE/vue3/Composition-API/start' }, 
                  { text: 'computed vs watchers', link: '/FE/vue3/Composition-API/computed-vs-watchers' },
                ]
              },
              {
                text: 'English Translation',
                collapsed: true,
                items: [
                  { text: 'Why Vue ?', link: '/FE/vue3/english-translation/why-vue' }, 
                ]
              },
              { text: 'Vue3 vs Vue2', link: '/FE/vue3/vue3-vs-vue2' }
            ]
          }
        ],
        '/FE/vue2/': [
          {
            text: 'Vue2',
            // collapsed: false,
            items: [
              { text: 'Vue2 Note', link: '/FE/vue2/vue2-note' }, 
              {
                text: 'Admin (CLI)',
                collapsed: true,
                items: [
                  { text: '01. Project Build', link: '/FE/vue2/admin-cli/01-project-build' }, 
                  // { text: '02. Login & Router & Permissions', link: '/FE/vue2/admin-cli/02-login-router-permissions' }, 
                ]
              },
              {
                text: 'Admin (Vite)',
                collapsed: true,
                items: [
                  { text: '01. Project Build', link: '/FE/vue2/admin-vite/01-project-build' }, 
                  { text: '02. Login & Router & Permissions', link: '/FE/vue2/admin-vite/02-login-router-permissions' }, 
                ]
              }
            ]
          }
        ],
        '/FE/front-end_engineering/': [
          {
            text: '前端工程化',
            // collapsed: false,
            items: [
              {
                text: '起步',
                collapsed: true,
                items: [
                  { text: '简介', link: '/FE/front-end_engineering/introduction' }, 
                ]
              },
            ]
          }
        ],
        '/FE/deploy/': [
          {
            text: '前端部署',
            // collapsed: false,
            items: [
              { text: '前置篇', link: '/FE/deploy/Prior' }
            ]
          }
        ],
        '/FE/other/': [
          {
            text: 'Other',
            collapsed: true,
            items: [
              {
                text: 'Code Standards',
                collapsed: true,
                items: [
                  { text: 'Code Standards', link: '/FE/other/code-standards/code-standards' }, 
                ]
              },
              {
                text: 'Git',
                collapsed: true,
                items: [
                  { text: 'Git Command', link: '/FE/other/git/git-command' }, 
                  { text: 'Git Branch Operation', link: '/FE/other/git/git-branch-operation' }, 
                ]
              },
              {
                text: 'WebSocket',
                collapsed: true,
                items: [
                  { text: '起步', link: '/FE/other/WebSocket/start' }, 
                ]
              },
              {
                text: 'WebRTC',
                collapsed: true,
                items: [
                  { text: '起步', link: '/FE/other/WebRTC/start' }, 
                ]
              },
              {
                text: 'Interview',
                collapsed: true,
                items: [
                  { text: 'Interview Log', link: '/FE/other/interview/interview-log-2024' }, 
                  {
                    text: 'Interview Detail Log', 
                    collapsed: true,
                    items: [
                      { text: '20230207 才信网络科技', link: '/FE/other/interview/interview-detail-log/20230207-cxwlkj' }, 
                    ]
                  }, 
                  { text: 'Interview Note', link: '/FE/other/interview/interview-note' }, 
                  { text: 'Resume Ask Mock', link: '/FE/other/interview/resume-ask-mock' }, 
                ]
              },
              {
                text: 'Remote Work',
                collapsed: true,
                items: [
                  { text: 'Settlement-Modes', link: '/FE/other/remote-work/Settlement-Modes' }, 
                ]
              },
              {
                text: 'PC',
                collapsed: true,
                items: [
                  { text: 'PC Shortcuts & Command', link: '/FE/other/pc/shortcuts-command' }, 
                ]
              },
              {
                text: 'Blog Upgrade',
                collapsed: true,
                items: [
                  { text: 'Blog Upgrade Log', link: '/FE/other/blog-upgrade/blog-upgrade-log' }, 
                  {
                    text: 'Blog Upgrade Log Note', 
                    collapsed: true,
                    items: [
                      { text: '图片点击放大', link: '/FE/other/blog-upgrade/blog-upgrade-log-note/img-zoom' }, 
                    ]
                  }, 
                ]
              },
            ]
          }
        ],
        // cs
        // C
        '/cs/C': [
          {
            text: 'C语言',
            // collapsed: false,
            items: [
              { text: '00 起步', link: '/cs/C/C_start' }, 
              { text: '01 Hello World', link: '/cs/C/C_01' }, 
              { text: '02 基本数据类型和变量', link: '/cs/C/C_02' }, 
              { text: '03 输入与输出函数', link: '/cs/C/C_03' }, 
              { text: '04 条件语句与逻辑控制', link: '/cs/C/C_04' }, 
              { text: '04 循环结构', link: '/cs/C/C_05' }, 
              { text: '06 数组与字符串', link: '/cs/C/C_06' }, 
            ]
          }
        ],
        // 计算机组成
        '/cs/computer-organization': [
          {
            text: '计算机组成',
            // collapsed: false,
            items: [
              { text: '起步', link: '/cs/computer-organization/index' }, 
            ]
          }
        ],
        '/DevelopDocs/通用方案/': [
          {
            text: '通用方案',
            // collapsed: false,
            items: [
              { text: 'HTTP 层 通用方案', link: '/DevelopDocs/通用方案/http' }, 
            ]
          }
        ],
        '/DevelopDocs/Canteen-Order-mp/': [
          {
            text: '食堂点餐小程序',
            // collapsed: false,
            items: [
              { text: '代码梳理', link: '/DevelopDocs/Canteen-Order-mp/code_structure' }, 
              { text: 'HTTP&API', link: '/DevelopDocs/Canteen-Order-mp/http' }, 
            ]
          }
        ],
        // 考研
        '/Master/': [
          {
            text: 'Math',
            // collapsed: false,
            items: [
                { text: '经济数学基础', link: '/Master/Math/Basics-of-Economic-Mathematics(396)' },
            ]
          }
        ],
        // 当用户在 `Life` 目录页面下将会展示这个侧边栏
        '/life/': [
          {
            text: 'Life',
            items: [
              { text: 'me', link: 'life' }, 
              {
                text: 'Book',
                collapsed: true,
                items: [
                  { text: 'Reading Log', link: '/life/book/reading-log' }, 
                  {
                    text: 'Reading Note', 
                    collapsed: true,
                    items: [
                      { text: '《胜者思维》', link: '/life/book/reading-note/szsw' }, 
                      { text: '《软技能：代码之外的生存指南》', link: '/life/book/reading-note/rjn' }, 
                    ]
                  }, 
                ]
              },
              {
                text: 'Movie',
                collapsed: true,
                items: [
                  { text: 'Watching Log', link: '/life/movie/watching-log' }, 
                  // { 
                  //   text: 'Watching Note',
                  //   collapsed: true,
                  //   items: [
                  //     { text: '《流浪地球2》', link: '/life/movie/watching-note/lldq2' }, 
                  //   ]
                  // }, 
                ]
              },
              // {
              //   text: 'iPhone',
              //   collapsed: true,
              //   items: [
              //     { text: '使用指南', link: '/life/iPhone/basic' }, 
              //     { text: '进阶指南', link: '/life/iPhone/advance' }, 
              //   ]
              // },
              {
                text: 'Daily Review',
                collapsed: true,
                items: [
                  { text: '2023', link: '/life/daily-review/2023/2023-list' }, 
                ]
              }
            ]
          }
        ],
        // Thoughts
        '/Thoughts/': [
          {
            text: '终身发展',
            // collapsed: false,
            items: [
                { text: '面向未来自适应', link: '/Thoughts/lifelong-development/Adapt-to-the-future' },
                { text: '如何成为超级个体', link: '/Thoughts/lifelong-development/How-to-Evolve-into-a-Hyper-Individual' },
            ]
          }
        ],
      },
      lastUpdatedText: 'Updated Date'
    },
    rewrites: {
      'life/me.md': 'life.md',
    },
    async buildEnd(siteConfig) {
      // console.log('siteConfig', siteConfig)
      // ...
    }
})