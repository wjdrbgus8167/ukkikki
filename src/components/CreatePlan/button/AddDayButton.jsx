// + 추가 버튼

const AddDayButton = ({onClick}) => {
    return (
        <button onClick={onClick} className="add-button  bg-white text-black text-x  font-semibold  py-2 px-4 border-2 border-gray-300 rounded-lg w-24 h-16">
            +
        </button>
    );
}; export default AddDayButton;