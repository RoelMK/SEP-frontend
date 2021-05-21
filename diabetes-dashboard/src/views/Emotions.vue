<template>
    <div class="main">
        <v-row class="col">
            <v-col class="">
                <v-container>
                    <h1 class="title">Hey __user__!</h1>
                    <p>The way you feel is highly affected by your blood sugar, and can contribute
                        to mood swings. It is therefore very important that you manage your blood
                        glucose well, which can lead to more positive moods and a higher
                        quality of life.
                    </p>
                    <p>
                        Your emotions are thus a decent measure of how well you manage your
                        glucose, and therefore very important to do! This does not necessarily
                        mean that feeling bad is always caused by your blood glucose, but bad
                        glucose values might make your mood even worse.
                    </p>
                    <p>
                        We know that tracking your emotions is not always easy and never a
                        trivial task. To make this easier, we like to keep it simple: just
                        click the emoji that best describes your mood at this moment!
                    </p>
                    <vue-feedback-reaction
                        :labels="['angry', 'moody', 'neutral', 'happy', 'excellent']"
                    />

                </v-container>
            </v-col>
        </v-row>
        <v-row class="clearfix"></v-row>
        <v-row>
            <v-col class="" cols="12" md="6">
                <v-container>
                    <div class="col">
                        <v-data-table
                            :headers="headers"
                            :items="emotions"
                            item-key="name"
                            class="elevation-1"
                            :search="search"
                            :hide-default-footer="true"
                        >
                            <template v-slot:top>
                                <v-container>
                                    <v-row>
                                        <v-col xs="10" sm="10" md="10" lg="10">
                                            <v-text-field
                                                v-model="search"
                                                label="Search"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>
                            <template v-slot:item=" { item }">
                                <tr>
                                    <td>
                                        <vue-reaction-emoji
                                            class="table-emotion"
                                            :reaction="item.emotion"
                                            :is-active="isActive"
                                            :is-disabled="isDisabled"
                                            :height="height"
                                        />
                                    </td>
                                    <td>
                                        {{ item.timestamp }}
                                    </td>
                                </tr>

                            </template>
                        </v-data-table>
                    </div>
                </v-container>
            </v-col>
            <v-col class="" cols="12" md="6">
                <v-container>
                    <div class="col" style="min-height: 30vh;">
                        This will be a pie chart, when that component is finished and merged
                    </div>
                </v-container>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import { VueFeedbackReaction, VueReactionEmoji } from 'vue-feedback-reaction';
export default {
    name: "Login",
    components: {
        VueFeedbackReaction,
        VueReactionEmoji
    },
    data () {
        return {
            reaction: 'excellent',
            isActive: false,
            isDisabled: false,
            search: "",
            headers: [
                {
                    text: "Emotion",
                    value: "emotion"
                },
                {
                    text: "Time",
                    value: "timestamp"
                }
            ],
            emotions: [
                {
                    emotion: "good",
                    timestamp: "24 Jan 2021"
                },
                {
                    // reaction is either hate, disappointed, natural,
                    // good or excellent
                    emotion: "hate",
                    timestamp: "25 Jan 2021"
                }
            ]
        };
    },
};
</script>

<style scoped>
.table-emotion {
  text-align: center;
}
.col {
  left: 3%;
  right: 3%;
  background-color: white;
}
p {
  margin-top: 10px;
}
.title {
  margin-bottom: 20px;
}
.main {
  min-height: 92vh;
  padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 10px;
  background-color: #f2f2f2;
}
.content {
  left: 3%;
  right: 3%;
  background-color: white;
}
.content1 {
  margin-left: 100px;
}
</style>
