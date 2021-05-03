export const routes = [
    {
        path: '/',
        component: () =>
               import ('../App.vue'),
               props: { param: "optional" },
               name: "dashboard" 
    }
]