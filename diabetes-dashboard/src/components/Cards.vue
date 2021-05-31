<template>
    <v-row>
        <v-col cols="12" sm="6" md="6" lg="3">
            <v-card>
                <v-card-title class="cardTitle">
                    <p><v-icon color="#bb2628">mdi-water</v-icon></p>
                    <p id="cardName">{{ $t('information-cards.glucose') }}</p>
                </v-card-title>
                <v-card-text class="black--text">
                    <v-row class="centered">
                        <v-col>
                            <p id="inlined" class="cardValue">98</p>
                            <p id="inlined" class="cardUnits">mg/dL</p>
                        </v-col>
                        <v-col class="rightAligned">
                            <p id="inlined" class="cardTime">t: 14:00</p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
            <v-card>
                <v-card-title class="cardTitle">
                    <p><v-icon color="#33985a">mdi-diabetes</v-icon></p>
                    <p id="cardName">{{ $t('information-cards.insulin') }}</p>
                </v-card-title>
                <v-card-text class="black--text">
                    <v-row class="centered">
                        <v-col>
                            <p id="inlined" class="cardValue">4</p>
                            <p id="inlined" class="cardUnits">units</p>
                        </v-col>
                        <v-col class="rightAligned">
                            <p id="inlined" class="cardTime">t: 14:00</p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
            <v-card>
                <v-card-title class="cardTitle">
                    <p><v-icon color="#ebbd68">mdi-barley</v-icon></p>
                    <p id="cardName">{{ $t('information-cards.carbohydrates') }}</p>
                </v-card-title>
                <v-card-text class="black--text">
                    <v-row class="centered">
                        <v-col>
                            <p id="inlined" class="cardValue">43</p>
                            <p id="inlined" class="cardUnits">g</p>
                        </v-col>
                        <v-col class="rightAligned">
                            <p id="inlined" class="cardTime">t: 14:00</p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
            <v-card>
                <v-card-title class="cardTitle">
                    <p><v-icon color="black">mdi-run</v-icon></p>
                    <p id="cardName">{{ $t('information-cards.activity-name') }}</p>
                </v-card-title>
                <v-card-text class="black--text">
                    <v-row class="centered">
                        <v-col>
                            <p id="inlined" class="cardValue">365</p>
                            <p id="inlined" class="cardUnits">kcal</p>
                        </v-col>
                        <v-col class="rightAligned">
                            <p id="inlined" class="cardTime">t: 11:30</p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "Cards",
};
</script>

<style>
#inlined {
  display: inline;
}
.rightAligned {
  text-align: right;
}
.centered {
  display: flex;
  align-items: center;
}
.cardTitle {
  font-size: 17px;
}
.cardTitle #cardName {
  padding-left: 7px;
}
.cardValue {
  font-size: 25px;
}
.cardUnits {
  font-size: 15px;
  padding-left: 5px;
}
.cardTime {
  font-size: 12px;
}
</style>
