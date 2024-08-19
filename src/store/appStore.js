import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "./widgetSlice"

const appStore = configureStore({
    reducer: {
        widget: widgetReducer
    }
})

export default appStore