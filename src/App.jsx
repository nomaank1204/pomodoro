import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [workSecond, setWorkSecond] = useState(1500);  
  const [breakSecond, setBreakSecond] = useState(300); 
  const [type, setType] = useState('work');
  const [flag, setFlag] = useState(false);
  const [resetFlag, setResetFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      if (type === 'work' && workSecond > 0) {
        const timer = setTimeout(() => {
          setWorkSecond((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }

      if (workSecond === 0 && type === 'work') {
        alert('Work time has ended');
        setType('break');
        setWorkSecond(workDuration * 60);
      }

      if (type === 'break' && breakSecond > 0) {
        const timer = setTimeout(() => {
          setBreakSecond((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }

      if (breakSecond === 0 && type === 'break') {
        alert('Break time has ended');
        setType('work');
        setBreakSecond(breakDuration * 60); 
      }
    }
  }, [workSecond, breakSecond, flag, type, workDuration, breakDuration]);

  const formatSpecifier = (seconds) => {
    let minute = Math.floor(seconds / 60).toString();
    let second = (seconds % 60).toString();
    if (second.length === 1) second = "0" + second;
    if (minute.length === 1) minute = "0" + minute;
    return `${minute}:${second}`;
  };

  const handleStart = () => {
    setFlag(true);
    setResetFlag(false);
  };

  const handleStop = () => {
    setFlag(false);
  };

  const handleReset = () => {
    setFlag(false);
    setType('work');
    setWorkSecond(workDuration * 60);
    setBreakSecond(breakDuration * 60);
    setResetFlag(true);
  };

  return (
    <>
      <div>
        <h1>{type === 'work' ? formatSpecifier(workSecond) : formatSpecifier(breakSecond)}</h1>
        <h1>{type === 'work' ? "Work Time" : "Break Time"}</h1>
      </div>

      <button onClick={handleStart} disabled={flag}>Start</button>
      <button onClick={handleStop} disabled={!flag}>Stop</button>
      <button onClick={handleReset} disabled={resetFlag}>Reset</button>

      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="number"
            placeholder="Enter work time"
            value={workDuration}
            onChange={(e) => setWorkDuration(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Enter break time"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
          />
          <input type="submit" value="Set" />
        </form>
      </div>
    </>
  );
}

export default App;
