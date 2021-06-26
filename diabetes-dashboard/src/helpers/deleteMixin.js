import Data from "@/repositories/Data.js";

export const deleteMixin = {
    methods: {
        /**
         * Delete item from the table
         * @param  { any }      parameters item object
         * @return { void }
         */
        async deleteItem(parameters) {
            let token = this.$cookies.get("JWT");
            if (this.$store.state.supervising.token) {
                token = this.$store.state.supervising.token;
            }
            Data.deleteItem(parameters, token).then(
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