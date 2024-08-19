import { useState, useEffect } from "react";
import { Icon, Modal, Tab, Checkbox } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { removeWidget } from "../store/widgetSlice";
import PropTypes from "prop-types";

const WidgetCustomization = ({ showCustomization, close, categoryId }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widget.categories);
  const [checkedWidgets, setCheckedWidgets] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (categories.length > 0) {
      const updatedCheckedWidgets = categories.reduce((acc, category) => {
        acc[category.id] = category.widgets.reduce((wAcc, widget) => {
          wAcc[widget.id] = true; // Initialize all widgets as checked
          return wAcc;
        }, {});
        return acc;
      }, {});
      setCheckedWidgets(updatedCheckedWidgets);
    }
  }, [categories]);
  useEffect(() => {
    const defaultCategoryIndex = categories.findIndex(
      (category) => category.id === categoryId
    );
    if (defaultCategoryIndex !== -1) {
      setActiveIndex(defaultCategoryIndex);
    }
  }, [categoryId, categories]);
  const handleToggle = (categoryId, widgetId) => {
    setCheckedWidgets((prevState) => ({
      ...prevState,
      [categoryId]: {
        ...prevState[categoryId],
        [widgetId]: !prevState[categoryId][widgetId],
      },
    }));
  };

  // Handle confirmation to remove unchecked widgets
  const handleConfirm = () => {
    categories.forEach((category) => {
      category.widgets.forEach((widget) => {
        if (!checkedWidgets[category.id][widget.id]) {
          dispatch(
            removeWidget({ categoryId: category.id, widgetId: widget.id })
          );
        }
      });
    });
    close();
  };
  const panes = categories.map((category) => ({
    menuItem: category.name,
    render: () => (
      <div className="p-3 flex flex-col gap-2">
        {category.widgets.map((widget) => (
          <span
            key={widget.id}
            className="flex flex-row items-center gap-2.5 border border-[gray] p-2 rounded-md"
          >
            <Checkbox
              checked={checkedWidgets[category.id][widget.id]}
              onChange={() => handleToggle(category.id, widget.id)}
            />
            <span>{widget.name}</span>
          </span>
        ))}
      </div>
    ),
  }));
  return (
    <Modal
      open={showCustomization}
      onClose={close}
      className="h-full bg-[#fff] absolute right-0 top-[-12px]"
    >
      <div className="flex flex-row justify-between p-3 bg-[#040468]">
        <span className="text-[#fff]">Add Widget</span>
        <button onClick={close}>
          <Icon name="close" className="text-[#fff]" />
        </button>
      </div>
      <p className="p-3 font-semibold">
        Personalize you dashboard by adding the following widget
      </p>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={(_, { activeIndex }) => setActiveIndex(activeIndex)}
      />
      <div className="absolute bottom-2 right-2">
        <button
          className="border border-[#01123d] rounded-md p-2.5"
          onClick={close}
        >
          Cancel
        </button>
        <button
          className="bg-[#01123d] text-[#fff] rounded-md p-2.5 ml-2"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

WidgetCustomization.propTypes = {
  showCustomization: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default WidgetCustomization;
