import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/login'),
    },
    {
      path: '/blank',
      name: '正在开发',
      component: () => import('../views/blank'),
    },
    {
      path: '/sign-up',
      name: '账号注册',
      component: () => import('../views/signup'),
    },
    {
      path: '/sign-up-student',
      name: '学生账号注册',
      component: () => import('../views/signup/student'),
    },
    {
      path: '/sign-up-parent',
      name: '家长账号注册',
      component: () => import('../views/signup/parent'),
    },
    {
      path: '/sign-up-teacher',
      name: '教师账号注册',
      component: () => import('../views/signup/teacher'),
    },
    {
      path: '/home-teacher-centre',
      name: '教务中心',
      component: () => import('../views/teach/centre'),
    },
    {
      path: '/home-teacher-account',
      name: '账号中心',
      component: () => import('../views/teach/account'),
    },
    {
      path: '/home-teacher-today',
      name: '今日工作',
      component: () => import('../views/teach/today'),
    },
    {
      path: '/teacher-calendar',
      name: '日历',
      component: () => import('../views/teach/calendar'),
    },
    {
      path: '/teacher-course',
      name: '课表',
      component: () => import('../views/teach/course'),
    },
    {
      path: '/teacher-check',
      name: '课程详情',
      component: () => import('../views/teach/check'),
    },
    {
      path: '/teacher-homework',
      name: '作业',
      component: () => import('../views/teach/homework'),
    },
    {
      path: '/teacher-change',
      name: '改课',
      component: () => import('../views/teach/change'),
    },
    {
      path: '/teacher-students',
      name: '学生列表',
      component: () => import('../views/teach/students'),
    },
    {
      path: '/teacher-exercises',
      name: '习题',
      component: () => import('../views/teach/exercises'),
    },
    {
      path: '/teacher-demo',
      name: 'Demo',
      component: () => import('../views/teach/demo'),
    },
    {
      path: '/home-student-centre',
      name: '学习中心',
      component: () => import('../views/student/centre'),
    },
    {
      path: '/home-student-account',
      name: '账号中心',
      component: () => import('../views/student/account'),
    },
    {
      path: '/home-student-today',
      name: '今日任务',
      component: () => import('../views/student/today'),
    },
    {
      path: '/student-plan',
      name: '规划',
      component: () => import('../views/student/plan'),
    },
    {
      path: '/student-sign',
      name: '签课',
      component: () => import('../views/student/sign'),
    },
    {
      path: '/student-calendar',
      name: '日历',
      component: () => import('../views/student/calendar'),
    },
    {
      path: '/student-course',
      name: '课表',
      component: () => import('../views/student/course'),
    },
    {
      path: '/student-check',
      name: '课程信息',
      component: () => import('../views/student/check'),
    },
    {
      path: '/student-homework',
      name: '作业',
      component: () => import('../views/student/homework'),
    },
    {
      path: '/student-word',
      name: '单词',
      component: () => import('../views/student/word'),
    },
    {
      path: '/student-change',
      name: '改课',
      component: () => import('../views/student/change'),
    },
    {
      path: '/student-personal',
      name: '个人信息',
      component: () => import('../views/student/personal'),
    },
    {
      path: '/student-accountinfo',
      name: '账号信息',
      component: () => import('../views/student/accountinfo'),
    },
    {
      path: '/student-parent',
      name: '监护人信息',
      component: () => import('../views/student/parent'),
    },
    {
      path: '/home-supervisor-today',
      name: '今日工作',
      component: () => import('../views/supervisor/today'),
    },
    {
      path: '/home-supervisor-centre',
      name: '课后监管',
      component: () => import('../views/supervisor/centre'),
    },
    {
      path: '/supervisor-students',
      name: '学员列表',
      component: () => import('../views/supervisor/students'),
    },
    {
      path: '/supervisor-course-check',
      name: '今日工作',
      component: () => import('../views/supervisor/check'),
    },
    {
      path: '/homework-check',
      name: '作业详情',
      component: () => import('../views/homework/check'),
    },
    {
      path: '/homework-arrange',
      name: '作业布置',
      component: () => import('../views/homework/arrange'),
    },
    {
      path: '/safe',
      name: '安全设置',
      component: () => import('../views/safe/safe'),
    },
    {
      path: '/safe-password',
      name: '修改密码',
      component: () => import('../views/safe/password'),
    },
  ]
})
