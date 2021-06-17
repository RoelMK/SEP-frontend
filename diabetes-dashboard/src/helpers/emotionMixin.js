import Emotion from "@/repositories/Emotion.js";
export const emotionMixin = {
    methods: {
        async postEmotion(parameters) {
            Emotion.post(parameters, this.$cookies.get("JWT")).then(
                (resp) => {
                    this.$toaster.showMessage({
                        message: "Upload is successful",
                        color: "dark",
                        btnColor: "pink",
                    });
                    console.log();
                    return resp;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
};