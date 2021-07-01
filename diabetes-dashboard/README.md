# Diabetter Front-end

## General info

This repo contains UI interface for Diabetter dashboard. It is written using Vue.js framework and can be run using Node.js.

### Installation: 
1. Install Node.js
2. Install [Visual Studio Code](https://code.visualstudio.com/) (or any other IDE)
3. Clone this repo
4. Run `yarn install` or `npm install` to install the relavent packages
5. Execute `yarn serve` or `npm run serve` depending on the installed package manager
6. Navigate to https://localhost:8081 to start using Diabetter dashboard. Note: diabetter uses back-end API which uses port 8080. Therefore, front-end must use any other port except for 8080

### Build:
1. Install Node.js
2. Install [Visual Studio Code](https://code.visualstudio.com/) (or any other IDE)
3. Clone this repo
4. Run `yarn install` or `npm install` to install the relavent packages
5. Execute `yarn build` or `npm run build` depending on the installed package manager
6. Place built `/dist` folder in HTTP server of your preference. In case you want to preview production build locally use Node.js static file server [serve](https://github.com/zeit/serve) by running `npm install -g serve` and `serve -s dist`. Make sure that back-end server is running in the background before navigating to the Diabetter dashboard.

## Property configuration
Currently overview visualization supports several properties such as: glucose level, insulin amount, amount of carbs, exercises and emotional status. In order to add another property several files must be modified.

Option 1 (Add new property in a new grid) <br>
1. Navigate to `/src/components/configurations/grid.js` and add another grid object to an existing array. In order to fit all grids in one chart object grid height must be adjusted. Namely `top` and `height` property should be adjusted. Sum of `height` properties must be 50% in order to keep charts readable. `top` property in turn must be adjusted based on the selected `height` value. Note: order of the appended element matters since index of the grid object in the array will be used as grid id.
2. Now once we have created a new grid object we need to assign x and y axis to it. These files can be found in `/src/components/configurations` directory with the respective name. A newly created xAxis object must contain at least `gridIndex` with the respective id of the grid (see previous step to check how to get the id of the grid) and `type` property. For more information check eCharts [documentation.](https://echarts.apache.org/en/option.html#xAxis). Similar object must be added to the [yAxis](https://echarts.apache.org/en/option.html#yAxis) array. However, `name` property must also be added with the name of the grid.
3. In order to add data slider support to a new grid `dataZoom` property in the `options(data : any)` method in `/src/components/OverviewChart.vue` must be adjusted such that the `xAxisIndex` property contains the newly created grid id. 
4. To add a new property to an existing/newly added grid it must be registered in `series` property of the `options(data : any)` method in `/src/components/OverviewChart.vue`. Refer to the eCharts [documentation](https://echarts.apache.org/en/option.html#series) to add a new property.
5. To include a newly added property to legend `/src/components/configurations/legend.js` must be adjusted as well. Check respective file for an example.

Option 2 (add a new property to an already existing grid) <br>

Refer to steps 3-5 in the Option 1 description.

## Query menu configurations
In case you want to add a new query field several files must be modified.
Currently query menu supports following field types: `date`, `icon`, `multiple`, `searchable` and `number`.

1. In `/src/components/queryProperties.js` add a new object to a `properties` array. An example of such object could be found in the file.
2. Add respective key to the `properties` variable in `/src/components/QueryMenu.vue` and adjust `applyFiltering()` method to include another check for newly added key.
3. Finally, filtering functionality must be added to the `/src/helpers/filter.js`.

## Code quality Check

All files in ./src directory except ./src/components/Cards.vue as it only contains HTML.

App.vue										: ./src/App.vue
i18n.js										: ./src/i18n.js
main.js										: ./src/main.js
CumulativeStatistics.vue	: ./src/components/CumulativeStatistics.vue
DatePicker.vue						: ./src/components/DatePicker.vue
EmotionSettings.vue				: ./src/components/EmotionSettings.vue
EmotionTable.vue					: ./src/components/EmotionTable.vue
Emotions.vue							: ./src/components/Emotions.vue
FoodSettings.vue					: ./src/components/FoodSettings.vue
GlucoseSettings.vue				: ./src/components/GlucoseSettings.vue
HistoryDatePicker.vue			: ./src/components/HistoryDatePicker.vue
HistoryTimePicker.vue			: ./src/components/HistoryTimePicker.vue
Legend.vue								: ./src/components/Legend.vue
Navbar.vue								: ./src/components/Navbar.vue
OverviewChart.vue					: ./src/components/OverviewChart.vue
ProfileInfo.vue						: ./src/components/ProfileInfo.vue
Query.vue									: ./src/components/Query.vue
QueryMenu.vue							: ./src/components/QueryMenu.vue
StackedBarChart.vue				: ./src/components/StackedBarChart.vue
Statistics.vue						: ./src/components/Statistics.vue
SupervisorSettings.vue		: ./src/components/SupervisorSettings.vue
TableActivitiesData.vue		: ./src/components/TableActivitiesData.vue
TableFoodData.vue					: ./src/components/TableFoodData.vue
TableInsulinData.vue			: ./src/components/TableInsulinData.vue
Toast.vue									: ./src/components/Toast.vue
UnitsSettings.vue					: ./src/components/UnitsSettings.vue
UploadData.vue						: ./src/components/UploadData.vue
grid.js										: ./src/components/configurations/grid.js
legend.js									: ./src/components/configurations/legend.js
queryProperties.js				: ./src/components/configurations/queryProperties.js
visualMap.js							: ./src/components/configurations/visualMap.js
xAxis.js									: ./src/components/configurations/xAxis.js
yAxis.js									: ./src/components/configurations/yAxis.js
deleteMixin.js						: ./src/helpers/deleteMixin.js
filter.js									: ./src/helpers/filter.js
toaster.js								: ./src/plugins/toaster.js
Auth.js										: ./src/repositories/Auth.js
Client.js									: ./src/repositories/Client.js
Data.js										: ./src/repositories/Data.js
Supervisor.js							: ./src/repositories/Supervisor.js
Upload.js									: ./src/repositories/Upload.js
router.js									: ./src/router/router.js
store.js									: ./src/store/store.js
Dashboard.vue							: ./src/views/Dashboard.vue
History.vue								: ./src/views/History.vue
Login.vue									: ./src/views/Login.vue
UserProfile.vue						: ./src/views/UserProfile.vue

## Improvements to be added (by others)

### Filtering

Due to the requirements established in the URD we had to comply with performance requirement (`When a visualization request for a specified time frame of 1 day is received, the application shall grant it within 5 seconds.`). Since GameBus platform is not suited for retrieving big amount of data we had to move most of the filtering functionality to the client side which might affect user experience when working with wide date ranges. Another which arises from filtering being implemented on the client side is that filters are reset on the page refresh.
