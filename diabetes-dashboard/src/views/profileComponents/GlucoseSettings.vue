<template>
  <div>
    <h3 class="center">Modify Glucose Settings:</h3>
    <hr />
    <v-row>
      <v-col> "Very High" Threshold: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="veryHighThreshold"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "High" Maximum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="highRangeMax"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "High" Minimum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="highRangeMin"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Normal" Maximum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="normalRangeMax"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Normal" Minimum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="normalRangeMin"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Low" Maximum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="lowRangeMax"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Low" Minimum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="lowRangeMin"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Very Low" Threshold: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="veryLowThreshold"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Normal" fasting blood glucose Maximum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="fastingRangeMax"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Normal" fasting blood glucose Minimum: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="fastingRangeMin"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> "Normal" glucose PP Threshold: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="ppRangeThreshold"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> A1C goal: </v-col>
      <v-col>
        <form class="center">
          <input
            type="number"
            v-model="goalA1C"
            placeholder="Enter value (int)"
          />
          <input type="submit" value="Submit" class="button" />
        </form>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col> Switch Unit: </v-col>
      <v-col>
        <form class="center">
          <select v-model="unit" style="margin:0 60px 0 60px">
            <option disabled value="">Select unit</option>
            <option>mmol/L</option>
            <option>mg/dL</option>
          </select>
          <input type="submit" value="Submit" class="button"/>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "glucoseSettings",
  // store data from form
  data() {
    return {
      unit: "",
      veryHighThreshold: "",
      highRangeMin: "",
      highRangeMax: "",
      normalRangeMin: "",
      normalRangeMax: "",
      lowRangeMin: "",
      lowRangeMax: "",
      veryLowThreshold: "",
      fastingRangeMin: "",
      fastingRangeMax: "",
      ppRangeThreshold: "",
      goalA1C: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
    },
  },
};
</script>

<style>
.center {
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}
.button {
  background-color: #008cba;
  border-radius: 12px;
  padding: 6px 18px;
  color: white;
}
</style>