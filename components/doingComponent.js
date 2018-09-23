const doingcomponent = {
  template:
  `
  <v-flex xs3>
    <v-card color="#9E9D24" style="color: #FFFFFF">
      <v-card-text class="px-0">DOING</v-card-text>
    </v-card>

    <v-flex xs12 text-sm-left v-for="(doing, index) in doings" :key="index">
      <v-card color="#9E9D24" class="white--text">
        <v-card-title primary-title>
          <div style="font-size: 18px; font-weight: bold;">{{ doing.task }}</div>

          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">Priority : 1</span></v-card-text>
            </v-card>
          </v-flex>

          Description : 
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0">
                <span style="color: #E0E0E0; margin-left: 10px;">
                {{ doing.description }}
                </span>
              </v-card-text>
            </v-card>
          </v-flex>

          Created at :
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">{{ doing.date.slice(4,25) }}</span></v-card-text>
            </v-card>
          </v-flex>

        </v-card-title>
        <v-card-actions style="justify-content: center; padding-bottom: 20px;">
          <buttonmodaldoing v-bind:doing="doing"></buttonmodaldoing>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-flex>
  `,
  components : {
    buttonmodaldoing
  },
    data: function () {
        return {
            doings: [],
        }
    },
    created: function () {
      
      let self = this
      var starCountRef = firebase.database().ref('doing/');
      starCountRef.on('value', function(snapshot) {
        self.doings = []
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
          self.doings.push({
            id: keys[i],
            task: values[i].task,
            point: values[i].point,
            description: values[i].description,
            date: values[i].date
          })
        }
      })

    }
}