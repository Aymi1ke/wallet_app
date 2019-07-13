import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/pages/home/Home'
import Login from '@/components/pages/login/Login'
import Notice from '@/components/pages/notice/Notice'
import Nonotice from '@/components/pages/notice/Nonotice'
import Info from '@/components/pages/Info/Info'
import Profile from '@/components/pages/person/Profile'
import MyBankCard from '@/components/pages/person/MyBankCard'
import MyInfo from '@/components/pages/person/MyInfo'
import AlterBank from '@/components/pages/person/AlterBank'
import AlterPhone from '@/components/pages/person/AlterPhone'
import NewPhone from '@/components/pages/person/NewPhone'
import Record from '@/components/pages/record/Record'
import Norecord from '@/components/pages/record/Norecord'
import Orderdetail from '@/components/pages/record/Orderdetail'

import About from '@/components/pages/about/About'
import Caption from '@/components/pages/about/Caption'
import Feedback from '@/components/pages/about/Feedback'
import Callser from '@/components/pages/about/Callser'
import CopyRight from '@/components/pages/about/CopyRight'
import Help from '@/components/pages/about/Help'
import Helpdetail from '@/components/pages/about/Helpdetail'


import Market from '@/components/pages/market/Market'
import Check from '@/components/pages/check/Check'
import IdCard from '@/components/pages/check/IdCard'
import BankCard from '@/components/pages/check/BankCard'
import ReceiveCode from '@/components/pages/check/ReceiveCode'
import Face from '@/components/pages/check/Face'
import Phone from '@/components/pages/check/Phone'
import Zhima  from '@/components/pages/check/Zhima'
import Acqu_zhima from '@/components/pages/check/Acqu_zhima'
import Acqu_carre from '@/components/pages/check/Acqu_carre'
import Repayment from '@/components/pages/repayment/Repayment'
import Online from '@/components/pages/repayment/Online'
import Offline from '@/components/pages/repayment/Offline'
import Upload from '@/components/pages/repayment/Upload'

import Loan from '@/components/pages/Loan/Loan'
import Error from '@/components/common/Error'

Vue.use(Router)
const router = new Router({
		// mode:'history',
  routes: [
  {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
            {
				      path: '/',
				      name: 'Home',
				      component: Home,
				      meta:{
				      	auth:true,
				      }
				    },
				    {
				      path: '/Market',
				      name: 'Market',
				      component: Market
				    },
				    {
				      path: '/profile',
				      name: 'Profile',
				      component: Profile
				    }
          ]
   },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/nonotice',
      name: 'Nonotice',
      component: Nonotice
    },
    {
      path: '/IdCard',
      name: 'IdCard',
      component: IdCard
    },
    {
      path: '/Phone',
      name: 'Phone',
      component: Phone
    },
     {
      path: '/Face',
      name: 'Face',
      component: Face
    },
     {
      path: '/Zhima',
      name: 'Zhima',
      component: Zhima
    },
    {
      path: '/Check',
      name: 'Check',
      component: Check
    },
    {
    	path:'/Acqu_zhima',
    	name:'Acqu_zhima',
    	component:Acqu_zhima
    },
		{
			path:'/Acqu_carre',
			name:'Acqu_carre',
			component:Acqu_carre
		},
    {
      path: '/BankCard',
      name: 'BankCard',
      component: BankCard
    },
    {
      path:'/ReceiveCode',
      name:'ReceiveCode',
      component:ReceiveCode
    },
    {
      path: '/MyBankCard',
      name: 'MyBankCard',
      component: MyBankCard
    },

    {
      path: '/alterBank',
      name: 'AlterBank',
      component: AlterBank
    },
    {
      path: '/AlterPhone',
      name: 'AlterPhone',
      component: AlterPhone
    },
    {
      path: '/NewPhone',
      name: 'NewPhone',
      component: NewPhone
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/caption',
      name: 'Caption',
      component: Caption
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/callser',
      name: 'Callser',
      component: Callser
    },
    {
      path: '/CopyRight',
      name: 'CopyRight',
      component: CopyRight
    },
    {
      path: '/MyInfo',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/Repayment',
      name: 'Repayment',
      component: Repayment
    },
    {
      path: '/Online',
      name: 'Online',
      component: Online
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/Loan',
      name: 'Loan',
      component: Loan
    },
    {
      path: '/Info',
      name: 'Info',
      component: Info
    },
    {
      path: '/Record',
      name: 'Record',
      component: Record
    },
		{
		  path: '/Norecord',
		  name: 'Norecord',
		  component: Norecord
		},
     {
      path: '/Orderdetail',
      name: 'Orderdetail',
      component: Orderdetail
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/helpdetail/:index',
      name: 'Helpdetail',
      component: Helpdetail
    }
  ],

})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
if (to.path === '/Login') {
    next();
} else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/Login');
    } else {
      next();
    }
}
});

export default router;
