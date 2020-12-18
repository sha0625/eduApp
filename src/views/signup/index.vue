<template>
  <div>
   <x-button text="我是学生"  @click.native="routerToStudent" type="primary"></x-button>
   <x-button text="我是家长"  @click.native="routerToParent" type="primary"></x-button>
   <x-button text="我是教师"  @click.native="routerToTeacher" type="primary"></x-button>
   <!-- <x-button text="我是督导"  @click.native="routerToSupervisor" type="primary"></x-button> -->
   </div>
</template>
<script>
import {XButton} from 'vux';
export default {
  components: {XButton},
  methods:{
    routerToStudent(){
      this.$router.push({
                // path: '/home'
                path: '/sign-up-student',
                query: ''
          });
    },
    routerToParent(){
      this.$router.push({
                // path: '/home'
                path: '/sign-up-parent',
                query: ''
          });
    },
    routerToTeacher(){
      this.$router.push({
                // path: '/home'
                path: '/sign-up-teacher',
                query: ''
          });
    },
    // routerToSupervisor(){
    //   this.$router.push({
    //             // path: '/home'
    //             path: '/sign-up',
    //             query: ''
    //       });
    // }
  }
}
</script>