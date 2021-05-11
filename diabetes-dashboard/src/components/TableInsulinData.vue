<template>
  <div class="table">
    <v-data-table
      :headers="headers"
      :items="getInsulinData"
      item-key="name"
      class="elevation-1"
      :search="search"
      :hide-default-footer="true"
    >
      <template v-slot:top>
        <v-container>
          <v-row>
            <v-col xs="11" sm="11" md="11" lg="11">
              <v-text-field v-model="search" label="Search"></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                >
                New Insulin Input
                </v-btn>
            </template>
          <v-card>
            <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.userId"
                      label="User Id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this insulin input?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item.id)"> mdi-minus </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TableInsulinData",
  components: {
  },
  // must match data values from json
  data() {
    return {
    // must be modified when we use real data
      headers: [
        {
          text: "Value",
          value: "userId",
        },
        {
          text: "Type",
          value: "id",
        },
        {
          text: "Date",
          value: "title",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      editing: false,
      dialog: false,
      dialogDelete: false,
      editedItem: {
        originalId: 0,
        userId: 0,
        id: 0,
        title: "",
      },
      defaultItem: {
        originalId: 0,
        userId: 0,
        id: 0,
        title: "",
      },
      search: "",
    };
  },
  methods: {
    ...mapActions(["fetchInsulinData", "addInsulinInput", "deleteInsulinInput", "updateInsulinInput"]),

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedItem.originalId = item.id;
      this.dialog = true;
      this.editing = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editing = false;
      });
    },
    save() {
      if(this.editing){
          this.updateInsulinInput(
              {
              originalId: this.editedItem.originalId, 
              userId: this.editedItem.userId, 
              id: this.editedItem.id, 
              title: this.editedItem.title
          }
      );
      } else{
      this.addInsulinInput(
          {
              id: this.editedItem.id, 
              title: this.editedItem.title,
              userId: this.editedItem.userId
          }
      );
      }
      this.close();
    },
    deleteItem(id) {
        this.editedItem.originalId = id;
        this.dialogDelete = true;
    },
    deleteItemConfirm() {
        this.deleteInsulinInput(this.editedItem.originalId);
        this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
  },
  // state getters you need to use
  computed: {
    ...mapGetters(["getInsulinData"]),

    formTitle () {
        return this.editing === false ? 'New Insulin Input' : 'Edit Insulin Input'
        },
  },
  // when a component is created call actions
  created() {
    this.fetchInsulinData();
  },
};
</script>

<style scoped>
.table {
  padding: 3%;
  height: auto;
  min-height: 40vh;
  width: 100%;
  overflow: auto;
}
.mdi-minus {
  border-radius: 50%;
  padding: 0.2rem;
  background: rgba(0, 0, 0, 0.15);
}
</style>