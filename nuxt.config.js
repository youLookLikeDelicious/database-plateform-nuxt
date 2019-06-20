import pkg from './package'

export default {
    mode: 'spa',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
    ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
    ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#fff'
    },

    /*
     ** Global CSS
     */
    css: [
    		'@/assets/style/base.scss',
    		'@/assets/style/home.base.scss',
            '@/assets/style/icofont.min.css'
      ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {src: '@/plugins/Animate.js', mode: 'client'},
        {src: '@/plugins/filters.js',  ssr: true},
        {src: '@/plugins/registerComponent.js',  ssr: true},
  ],

    /*
     ** Nuxt.js modules
     */
    modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
	'@nuxtjs/style-resources',
//    '@nuxtjs/proxy'
  ],
    styleResources: {
        scss: [
                '@/assets/style/_variable.scss',
                '@/assets/style/_mixin.scss',
                '@/assets/style/_placeholder.scss'
            ]
    },
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },
    // 命名视图
    router: {
        extendRoutes(routes, resolve) {
            const chunkNames = {
                'navigate': 'components/common/navigate',
                'sideBar': 'components/common/sideBar',
                'foot': 'components/common/foot',
                'loginRegistBox': 'components/common/loginRegistBox',
                'userCenterList': 'components/common/userCenterList'
            }
            const commonComponents = {
                'navigate': resolve(__dirname, 'components/common/navigate.vue'),
                'sideBar': resolve(__dirname, 'components/common/sideBar.vue'),
                'loginRegistBox': resolve(__dirname, 'components/common/loginRegistBox.vue'),
                'userCenterList': resolve(__dirname, 'components/common/userCenterList.vue'),
                'foot': resolve(__dirname, 'components/common/foot.vue')
            }
            const routeName = ['index', 'material', 'material-id', 'exam', 'exam-id', 'article', 'article-id']
            
            routes.forEach( (route, index) => {
                if( routeName.indexOf(route.name) !== -1 ){
                    routes[index] =  {
                        ...routes[index],
                        components: {
                            'default': routes[index].component,
                            ...commonComponents
                        },
                        chunkNames: {
                            ...chunkNames
                        }
                    }
                }
            } )
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},

        /*styleResources: {
            scss: './assets/style/_variable.scss'
        }*/
    },
    /*proxy:{
        '/api': {
            target: 'http://www.database.com',
            pathRewrite: {
                '^/api': '/'
            }
        }
    }*/
}
