import Emotion from "@/repositories/Emotion.js";
export const emotionMixin = {
    methods: {
        async postEmotion(parameters) {
            Emotion.post(parameters, this.$cookies.get("JWT")).then(
                () => {
                    this.$toaster.showMessage({
                        message: "Upload is successful",
                        color: "dark",
                        btnColor: "pink",
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
};