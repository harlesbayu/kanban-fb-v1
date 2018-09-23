const buttonmodalbacklog = {
  template: 
    `
    <v-dialog v-model="dialog" persistent max-width="400px">
    <v-btn slot="activator" color="primary" dark>Show Detail</v-btn>

    <v-card>
      <v-card-text>
        <v-flex sm12>

          <div style= "float: right; margin-bottom:4px;">
            <v-btn @click.native="dialog = false" style="width: 4px; border-radius:3px; background:#455A64; color: #FFFFFF;"> CLOSE </v-btn>
          </div>

          <v-card color="blue-grey darken-2" class="white--text" style="clear:both;">
            <v-card-title primary-title>
            <v-text-field
              label="Task"
              solo-inverted
              v-model="backlog.task"
              readonly
            ></v-text-field>
            
            <v-text-field
              label="Priority"
              solo-inverted
              v-model="backlog.point"
              readonly
            ></v-text-field>
          
            <v-textarea
            solo-inverted
            name="input-7-4"
            label="Description"
            v-model="backlog.description"
            readonly
            ></v-textarea>
          

            </v-card-title>
          </v-card>
        </v-flex>
      </v-card-text>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn color="#455A64" @click.native="dialog = false" style="color: #FFFFFF;" v-on:click="remove(backlog)">DELETE</v-btn>
        <v-btn color="#3A4C54" @click.native="dialog = false" style="color: #FFFFFF;" v-on:click="todo(backlog)">TODO</v-btn>
      </v-card-title>
    </v-card>
  </v-dialog>
    `,
    props: ['backlog'],
    data: function () {
      return {
        dialog: false
      }
    },
    methods: {
      todo: function (value) {
        firebase.database().ref('backlog/' + value.id).set({})
        .then(function () {
          firebase.database().ref('todo/').push({
            task: value.task,
            point: value.point,
            description: value.description,
            date: Date()
          })
        })       
      },
      remove: function (value) {
        firebase.database().ref('backlog/' + value.id).set({})
      }
    }
}