Vue.component('planning-component', {
    template: `
    <div>
    
      <v-container grid-list-md text-sm-center>
        <v-layout row wrap>
        
          <getstarted></getstarted>
          <todocomponent></todocomponent>
          <doingcomponent></doingcomponent>
          <donecomponent></donecomponent>

        </v-layout>
      </v-container>
    </div>
    `,
    components: {
      getstarted,
      todocomponent,
      doingcomponent,
      donecomponent
    },
    data: function() {
      return {
      
      }
    }
})