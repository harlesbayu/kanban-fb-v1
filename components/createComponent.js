const database = firebase.database();

Vue.component('create-component', {
  template: `
    <v-container>
      <v-layout style="position: fixed; bottom: 30px; right: 30px;">
        <v-btn v-on:click="activatorcreate" color="#E91E63" dark>+</v-btn>
        <v-dialog v-model="dialog" persistent max-width="400px">

        <v-card>
          <v-card-text>
            <v-flex sm12>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
              
                <v-text-field
                  label="Task"
                  solo-inverted
                  v-model="task"
                ></v-text-field>
                
                <v-text-field
                  label="Ponit"
                  v-model="point"
                  solo-inverted
                ></v-text-field>
              
                <v-textarea
                solo-inverted
                name="input-7-4"
                label="Description"
                v-model="description"
                ></v-textarea>
              

                </v-card-title>
              </v-card>
            </v-flex>
          </v-card-text>

          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="#455A64" @click.native="dialog = false" style="color: #FFFFFF;">Close</v-btn>
            <v-btn color="#3A4C54" @click.native="dialog = false" style="color: #FFFFFF;" v-on:click="createTask">Save</v-btn>
          </v-card-title>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
    `,
  data: function () {
    return {
      task: '',
      point: '',
      description: '',
      dialog: false
    }
  },
  methods: {
    activatorcreate: function () {
      this.dialog = true
    },
    createTask: function () {

      database.ref('backlog/').push({
        task: this.task,
        point: this.point,
        description: this.description,
        date: Date()
      });

      this.task = ''
      this.point = ''
      this.description = ''

    }
  }

})
