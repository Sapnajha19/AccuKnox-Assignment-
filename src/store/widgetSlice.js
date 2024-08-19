import { createSlice } from "@reduxjs/toolkit";
import categories from "../utils/dashboard";

const widgetSlice = createSlice({
    name: 'widget',
    initialState: categories,
    reducers: {
        addWidget: (state, action) => {
            const { categoryId, widget } = action.payload;
            return {
                ...state,
                categories: state.categories.map(category =>
                    category.id === categoryId
                        ? { ...category, widgets: [...category.widgets, widget] }
                        : category
                ),
            };
        },
        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            return {
                ...state,
                categories: state.categories.map(category =>
                    category.id === categoryId
                        ? { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) }
                        : category
                ),
            };
        }
    }
});

export const { addWidget, removeWidget } = widgetSlice.actions;

export default widgetSlice.reducer;
