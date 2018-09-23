const donecomponent = {
  template:
  `
  <v-flex xs3>
    <v-card color="#0277BD" style="color: #FFFFFF">
      <v-card-text class="px-0">DONE</v-card-text>
    </v-card>

    <v-flex xs12 text-sm-left v-for="(done, index) in dones" :key="index">
      <v-card color="#0277BD" class="white--text">
        <v-card-title primary-title>
          <div style="font-size: 18px; font-weight: bold;">{{ done.task }}</div>

          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">Point : {{ done.point }}</span></v-card-text>
            </v-card>
          </v-flex>

          Description : 
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0">
                <span style="color: #E0E0E0; margin-left: 10px;">
                {{ done.description }}
                </span>
              </v-card-text>
            </v-card>
          </v-flex>

          Created at :
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">{{ done.date.slice(4,25) }}</span></v-card-text>
            </v-card>
          </v-flex>

        </v-card-title>
        <v-card-actions style="justify-content: center; padding-bottom: 20px;">
          <buttonmodaldone v-bind:done="done"></buttonmodaldone>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-flex>
  `,
  components : {
    buttonmodaldone
  },
  data: function () {
    return {
      dones: [],
    }
  },
  created: function () {
    this.documentReady()
  },
  methods: {
    documentReady: function () {
      let self = this
      var starCountRef = firebase.database().ref('done/');
      starCountRef.on('value', function(snapshot) {
        self.dones = []
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
          self.dones.push({
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
}