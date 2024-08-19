import { useState, useEffect } from "react";
import { Modal } from "semantic-ui-react";
import categories from "../utils/dashboard";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/widgetSlice";
import PropTypes from "prop-types";

const AddWidget = ({ showAddWidget, cancel, categoryId }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    setSelectedCategoryId(categoryId); // Update category ID when selectedCategoryId changes
  }, [categoryId]);

  const dispatch = useDispatch();
  const handleWidgetAddition = () => {
    if (selectedCategoryId && widgetName && widgetText) {
      const newWidget = {
        id: `widget${Date.now()}`, // Generate a unique ID
        name: widgetName,
        text: widgetText,
      };
      dispatch(
        addWidget({ categoryId: selectedCategoryId, widget: newWidget })
      );
      cancel();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Modal open={showAddWidget} onClose={cancel} closeIcon>
      <p className="font-bold p-3 bg-[#040468] text-[#fff]">Add Widget</p>
      <div className="h-[250px] flex flex-col gap-5 p-5 border border-[gray]">
        <select
          defaultValue={"Select Category"}
          value={categoryId || "Select Category"}
          onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}
          className="border border-[gray] p-2 rounded-md"
        >
          <option disabled>Select Category</option>
          {categories?.categories?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Enter widget name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          className="border border-[gray] p-2 rounded-md"
        />
        <input
          placeholder="Enter widget text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
          className="border border-[gray] p-2 rounded-md"
        />
      </div>
      <div className="absolute right-2 bottom-2">
        <button
          className="border border-[#01123d] rounded-md p-2.5"
          onClick={cancel}
        >
          cancel
        </button>
        <button
          className="bg-[#01123d] text-[#fff] rounded-md p-2.5 ml-2"
          onClick={() =>
            handleWidgetAddition({ name: widgetName, text: widgetText })
          }
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

AddWidget.propTypes = {
  showAddWidget: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AddWidget;
