const getstarted = {
  template:
  `
  <v-flex xs3>
    <v-card color="#455A64" style="color: #FFFFFF">
      <v-card-text class="px-0">BACK LOG</v-card-text>
    </v-card>

    <v-flex xs12 text-sm-left v-for="(backlog, index) in backlogs" :key="index">
      <v-card color="blue-grey darken-2" class="white--text">
        <v-card-title primary-title>
          <div style="font-size: 18px; font-weight: bold;">{{ backlog.task }}</div>

          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">Point: {{ backlog.point }}</span></v-card-text>
            </v-card>
          </v-flex>

          Description : 
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0">
                <span style="color: #E0E0E0; margin-left: 10px;">
                {{ backlog.description }}
                </span>
              </v-card-text>
            </v-card>
          </v-flex>

          Created at :
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">{{ backlog.date.slice(4,25) }}</span></v-card-text>
            </v-card>
          </v-flex>

        </v-card-title>
        <v-card-actions style="justify-content: center; padding-bottom: 20px;">

          <buttonmodalbacklog v-bind:backlog="backlog"></buttonmodalbacklog>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-flex>
  `,
  components: {
    buttonmodalbacklog
  },
  data: function () {
    return {
      backlogs: [],
    }
  },
  created: function () {
      let self = this
      var starCountRef = firebase.database().ref('backlog/');
      starCountRef.on('value', function(snapshot) {
        self.backlogs = []
        let keys 
        let values
        if(snapshot.val()){
          keys  = Object.keys(snapshot.val())
          values = Object.values(snapshot.val())
        } else {
          keys = []
          values = []
        }

        for(let i = 0; i < keys.length; i++){
          self.backlogs.push({
            id: keys[i],
            task: values[i].task,
            point: values[i].point,
            description: values[i].description,
            date: values[i].date,
          })
        }
      })
  }
}