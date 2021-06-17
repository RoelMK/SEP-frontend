import Delete from "@/repositories/Delete.js";
export const deleteMixin = {
    methods: {
        async deleteItem(parameters) {
            Delete.post(parameters, this.$cookies.get("JWT")).then(
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