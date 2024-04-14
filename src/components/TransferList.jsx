import { useState } from "react";
import { Data } from "../data";

const TransferList = () => {
  const [leftItem, setLeftItem] = useState(Data);
  const [rightItem, setRightItem] = useState([]);

  const toggleChecked = (id, list) => {
    return list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
  };

  const handleTransfer = (id, direction) => {
    if (direction === "LEFT") {
      setLeftItem(toggleChecked(id, leftItem));
    } else {
      setRightItem(toggleChecked(id, rightItem));
    }
  };

  const resetItem = (list) => {
    return list.map((item) => ({
      ...item,
      checked: false,
    }));
  };

  const handleOnClickTransfer = (direction) => {
    if (direction === "Transfer to Right") {
      const checkedList = leftItem.filter((item) => item.checked);
      setRightItem((prev) => resetItem([...prev, ...checkedList]));
      setLeftItem((prev) => prev.filter((item) => !item.checked));
    } else {
      const checkedList = rightItem.filter((item) => item.checked);
      setLeftItem((prev) => resetItem([...prev, ...checkedList]));
      setRightItem((prev) => prev.filter((item) => !item.checked));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-mono my-6">Transfer List</h1>

      <div className="flex justify-center items-center gap-8">
        {/* Left section */}
        <div className="border border-black rounded-xl w-96 h-[414px] text-center">
          {leftItem.map(({ title, id, checked }) => (
            <div key={id} className="flex flex-col px-4 py-3">
              <div
                onClick={() => handleTransfer(id, "LEFT")}
                className={`p-4 rounded-xl font-bold text-white bg-slate-400 border cursor-pointer ${
                  checked ? "bg-slate-800" : ""
                }`}
              >
                {title}
              </div>
            </div>
          ))}
        </div>

        {/* Middle section */}
        <div className="flex flex-col items-center gap-5">
          <button
            onClick={() => handleOnClickTransfer("Transfer to Right")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 uppercase rounded"
          >
            Transfer to Right
          </button>
          <button
            onClick={() => handleOnClickTransfer("Transfer to Left")}
            className="bg-blue-500 hover:bg-blue-700 uppercase text-white font-bold py-2 px-4 rounded"
          >
            Transfer to Left
          </button>
        </div>

        {/* Right section */}
        <div className="border border-black rounded-xl w-96 h-[414px] text-center">
          {rightItem.map(({ title, id, checked }) => (
            <div key={id} className="flex flex-col px-4 py-3">
              <div
                onClick={() => handleTransfer(id, "RIGHT")}
                className={`p-4 rounded-xl font-bold text-white bg-slate-400 border cursor-pointer ${
                  checked ? "bg-slate-800" : ""
                }`}
              >
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferList;
