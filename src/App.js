import { ImCross } from "react-icons/im";
import { useRef, useState } from "react";
import "./App.css";
import useAlphabets from "./Components/Alphabets";

function App() {
  const operators = [
    { _id: 100, operator: "+", value: "+" },
    { _id: 101, operator: "-", value: "-" },
    { _id: 102, operator: "*", value: "*" },
    { _id: 103, operator: "/", value: "/" },
  ];

  const [alphabets] = useAlphabets();

  const [dragData, setDragData] = useState({});
  const [droppedData, setDroppedData] = useState([]);

  const [action, setAction] = useState(null);
  const [rhs, setRHS] = useState(null);

  const dragOverItem = useRef(); 

  const handlerRHS = () => {
    const RhsInteger = window.prompt("What should be the rhs integer ?");
    setRHS(RhsInteger);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, item, value, type) => {
    setDragData({ id: droppedData.length, item, value, type });
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(dragOverItem.current);
  };

  const handleDrop = (e) => {
    const droppedItems = [...droppedData];
    if (dragOverItem.current) {
      droppedItems.splice(dragOverItem.current, 0, dragData);
    } else {
      droppedItems.push(dragData);
    }
    dragOverItem.current = null;
    setDroppedData(droppedItems);
  };

  const removeDroppedItemHandler = (itemId) => {
    const remainingDroppedItems = droppedData.filter(
      (data) => data.id !== itemId
    );
    setDroppedData(remainingDroppedItems);
  };

  const handleEvaluate = () => {
    const rowData = droppedData.map((data) => data.value);
    rowData.push(action);
    rowData.push(rhs);
    const expression = rowData.join(" ");
    console.log(expression);
    try {
      //  eslint-disable-next-line
      const result = eval(expression);
      console.log(result);
      alert(result);
    } catch (error) {
      alert("This is not a valid equation");
    }
  };
  return (
    <div className="App">
      <div className="alphabets-container">
        {alphabets.map((alphabet) => (
          <div
            key={alphabet._id}
            draggable
            className="alphabet"
            onDragStart={(e) =>
              handleDragStart(e, alphabet.alphabet, alphabet.value, "alphabet")
            }
          >
            {alphabet.alphabet}
          </div>
        ))}
      </div>

      <div className="operators-container">
        <div className="operators-box">
          {operators.map((operator) => (
            <div
              key={operator._id}
              draggable
              className="operator"
              onDragStart={(e) =>
                handleDragStart(
                  e,
                  operator.operator,
                  operator.value,
                  "operator"
                )
              }
            >
              {operator.operator}
            </div>
          ))}
        </div>
        <div className="operators-box">
          <div onClick={() => setAction("<")} className="operator">
            {"<"}
          </div>
          <div onClick={() => setAction(">")} className="operator">
            {">"}
          </div>
        </div>
        <div className="operators-box">
          <div onClick={handlerRHS} className="operator">
            RHS Integer
          </div>
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
        className="expression-container"
      >
        {droppedData.map((data, index) => (
          <div
            key={index}
            onDragEnter={(e) => dragEnter(e, index)}
            className={`item ${data.type}`}
          >
            {data.item}
            <button
              onClick={() => removeDroppedItemHandler(data.id)}
              className="btn-delete"
            >
              <ImCross />
            </button>
          </div>
        ))}
        {action && (
          <div className={`item operator`}>
            {action}
            <button onClick={() => setAction(null)} className="btn-delete">
              <ImCross />
            </button>
          </div>
        )}
        {rhs && (
          <div className={`item rsh-integer`}>
            {rhs}
            <button onClick={() => setRHS(null)} className="btn-delete">
              <ImCross />
            </button>
          </div>
        )}
      </div>
      <button onClick={handleEvaluate} id="calculate-button">
        Evaluate
      </button>
    </div>
  );
}

export default App;
