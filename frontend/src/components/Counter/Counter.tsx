import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { socket } from "../../lib/utils";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    socket.emit("getOldCounter");

    socket.on("oldCounter", (data) => {
      setCounter(data);
    });

    socket.on("incrementCounterMessage", (data) => {
      console.log("Increment message received", data);
      setCounter(data); // Update counter from server
    });

    // Listen for decrement messages
    socket.on("decrementCounterMessage", (data) => {
      console.log("Decrement message received", data);
      setCounter(data); // Update counter from server
    });

    return () => {
      socket.off("incrementCounterMessage");
      socket.off("decrementCounterMessage");
      socket.off("oldCounter");
    };
  }, []);

  const handleIncrementCounter = () => {
    socket.emit("incrementCounter");
  };

  const handleDecrementCounter = () => {
    socket.emit("decrementCounter");
  };

  return (
    <>
      <h1 className="text-5xl">count is {counter}</h1>
      <div className="flex gap-14 place-content-center vh-100 mt-6">
        <Button variant="outline" onClick={handleIncrementCounter}>
          +
        </Button>
        <Button variant="outline" onClick={handleDecrementCounter}>
          -
        </Button>
      </div>
    </>
  );
};

export default Counter;
