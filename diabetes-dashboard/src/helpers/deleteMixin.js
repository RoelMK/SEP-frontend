import Delete from "@/repositories/Delete.js";
export const deleteMixin = {
    methods: {
        /**
         * Method to delete emotion/insulin entry
         * @param  { Object }    parameters includes activityId propery
         * @return
         */ 
        async deleteItem(parameters) {
            // obtain proper token
            let token = this.$cookies.get("JWT");
            if (this.$store.state.supervising.token) {
                token = this.$store.state.supervising.token;
            }
            // delete request
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