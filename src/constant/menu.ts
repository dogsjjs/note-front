export const menuItems = [
  {
    name: '文库',
    icon: 'heroicons:book-open',
    children: [
      {
        name: '归档',
        icon: 'heroicons:clipboard-document-list',
        path: '/blog/articles/archives'
      },
      {
        name: '分类',
        icon: 'heroicons:cube',
        path: '/blog/articles/categories'
      }
      ,
      {
        name: '标签',
        icon: 'heroicons:tag',
        path: '/blog/articles/tags'
      }
    ]
  },
  {
    name: '分享',
    icon: 'heroicons:share',
    children: [
      {
        name: '书籍',
        icon: 'heroicons:book-open',
        path: '/blog/share/book'
      },
      {
        name: '电影',
        icon: 'heroicons:film',
        path: '/blog/share/movies'
      },
      {
        name: '收藏',
        icon: 'heroicons:inbox',
        path: '/blog/share/favorites'
      }
    ]
  },
  {
    name: '我的',
    icon: 'heroicons:user',
    children: [
      {
        name: '相册',
        icon: 'heroicons:photo',
        path: '/blog/mine/gallery'
      },
      {
        name: '待办',
        icon: 'heroicons:bell-alert',
        path: '/blog/mine/todo'
      },
      {
        name: '日记',
        icon: 'heroicons:pencil-square',
        path: '/blog/mine/essay'
      }
    ]
  },
  {
    name: '关于',
    icon: 'heroicons:at-symbol',
    children: [
      {
        name: '关于我',
        icon: 'heroicons:information-circle',
        path: '/blog/about/me'
      },
      {
        name: '留言板',
        icon: 'heroicons:chat-bubble-bottom-center-text',
        path: '/blog/about/message'
      },
      {
        name: '随便逛逛',
        icon: 'heroicons:arrow-top-right-on-square',
        path: '/blog/details/-1'
      }
    ]
  },
]