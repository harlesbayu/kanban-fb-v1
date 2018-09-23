const buttonmodaltodo = {
  template: `
      <v-dialog v-model="dialog" persistent max-width="400px">
      <v-btn slot="activator" color="primary" dark>Show Detail</v-btn>
  
      <v-card>
        <v-card-text>
          <v-flex sm12>

            <div style= "float: right; margin-bottom:4px;">
              <v-btn @click.native="dialog = false" style="width: 4px; border-radius:3px; background:#00695C; color: #FFFFFF;"> CLOSE </v-btn>
            </div>

            <v-card color="#00695C" class="white--text" style="clear:both;">
              <v-card-title primary-title>
              <v-text-field
                label="Task"
                solo-inverted
                v-model="todo.task"
                readonly
              ></v-text-field>
              
              <v-text-field
                label="Priority"
                solo-inverted
                v-model="todo.point"
                readonly
              ></v-text-field>
            
              <v-textarea
              solo-inverted
              name="input-7-4"
              label="Description"
              v-model="todo.description"
              readonly
              ></v-textarea>
            
  
              </v-card-title>
            </v-card>
          </v-flex>
        </v-card-text>
  
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="#00695C" @click.native="dialog = false" style="color: #FFFFFF;" v-on:click="backlog(todo)">BACK LOG</v-btn>
          <v-btn color="#00695C" @click.native="dialog = false" style="color: #FFFFFF;" v-on:click="remove(todo)">DELETE</v-btn>
          <v-btn color="#00695C" @click.native="dialog = false" style="color: #FFFFFF;" v-on:click="doing(todo)">DOING</v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
      `,
  props: ['todo'],
  data: function () {
    return {
      dialog: false
    }
  },
  methods: {
    backlog: function (value) {
             
      let self = this
      firebase.database().ref('todo/' + value.id).set({})
        .then(function () {
            firebase.database().ref('backlog/').push({
            task: value.task,
            point: value.point,
            description: value.description,
            date: Date()
          })
        })
    },
    doing: function (value) {
      firebase.database().ref('todo/' + value.id).set({})
        .then(function () {
          firebase.database().ref('doing/').push({
            task: value.task,
            point: value.point,
            description: value.description,
            date: Date()
          })
        })
    },
    remove: function (value) {
      firebase.database().ref('todo/' + value.id).set({})
    }
  }
}