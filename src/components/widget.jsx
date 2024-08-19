import PropTypes from "prop-types";

const Widget = ({ category, open, customize }) => {
  return (
    <div>
      <p className="pb-2 font-bold">{category?.name}</p>
      <div className="flex flex-row gap-5 ">
        {category?.widgets?.map((item) => (
          <div
            key={item?.id}
            className="w-[500px] h-[200px] bg-[#fff] rounded-lg p-5 cursor-pointer hover:border-[gray-200] hover:border-[2px]"
            onClick={customize}
          >
            <p className="font-bold">{item?.name}</p>
            <p className="">{item?.text}</p>
          </div>
        ))}
        <div className="w-[500px] h-[200px] bg-[#fff] rounded-lg flex justify-center items-center">
          <button
            onClick={open}
            className="p-1.5 bg-[#fff] border-[1.5px] border-gray-200 rounded-md"
          >
            Add Widget +
          </button>
        </div>
      </div>
    </div>
  );
};

Widget.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    widgets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  open: PropTypes.func.isRequired,
  customize: PropTypes.func.isRequired,
};

export default Widget;
