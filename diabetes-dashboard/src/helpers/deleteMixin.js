import Delete from "@/repositories/Delete.js";
export const deleteMixin = {
    methods: {
        async deleteItem(parameters) {
            let token = this.$cookies.get("JWT");
            if (this.$store.state.supervising.token) {
                token = this.$store.state.supervising.token;
            }
            Delete.post(parameters, token).then(
                () => {
                    this.$toaster.showMessage({
                        message: "Delete is successful",
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