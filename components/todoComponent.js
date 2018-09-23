const todocomponent = {
  template:
  `
  <v-flex xs3>
    <v-card color="#00695C" style="color: #FFFFFF">
      <v-card-text class="px-0">TODO</v-card-text>
    </v-card>

    <v-flex xs12 text-sm-left v-for="(todo, index) in todos" :key="index">
      <v-card color="#00695C" class="white--text">
        <v-card-title primary-title>
          <div style="font-size: 18px; font-weight: bold;">{{ todo.task }}</div>

          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">Point: {{ todo.point }}</span></v-card-text>
            </v-card>
          </v-flex>

          Description : 
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0">
                <span style="color: #E0E0E0; margin-left: 10px;">
                {{ todo.description }}
                </span>
              </v-card-text>
            </v-card>
          </v-flex>

          Created at :
          <v-flex xs12>
            <v-card dark color="#3A4C54">
              <v-card-text class="px-0"><span style="color: #E0E0E0; margin-left: 10px;">{{ todo.date.slice(4,25) }}</span></v-card-text>
            </v-card>
          </v-flex>

        </v-card-title>
        <v-card-actions style="justify-content: center; padding-bottom: 20px;">
          <buttonmodaltodo v-bind:todo="todo"></buttonmodaltodo>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-flex>
  `,
  components : {
    buttonmodaltodo
  },
  data: function () {
    return {
      todos: [],
    }
  },
  created: function () {
    this.documentReady()
  },
  methods: {
    documentReady: function () {
      let self = this
      var starCountRef = firebase.database().ref('todo/');
      starCountRef.on('value', function (snapshot) {
        self.todos = []
        let keys
        let values
        if (snapshot.val()) {
          keys = Object.keys(snapshot.val())
          values = Object.values(snapshot.val())
        } else {
          keys = []
          values = []
        }

        for (let i = 0; i < keys.length; i++) {
          self.todos.push({
            id: keys[i],
            point: values[i].point,
            task: values[i].task,
            description: values[i].description,
            date: values[i].date
          })
        }
      })
    }
  }
}