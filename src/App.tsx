import { useState, useEffect, useRef } from 'react'
import './App.css'


interface config {
  [key: string]: string[];
}

const multiplierList :number[] = [0.5,1,2,5]

const colorConfigs : config = {
    "Group 1": ["yellow","red","orange","pink"],
    "Group 2": ["black","brown","grey","purple"],
    "Group 3": ["blue","aqua","violet","navy"],
    "Group 4": ["green","skyblue","lime","chocolate"],
  };

function App() {
  const [multiplier, setMultiplier] = useState<number>(multiplierList[1]);
  // const [active,setActive] = useState(multiplierList[1]);
  const [color, setColor] = useState(colorConfigs);
  const [auto, setAutos] = useState(false);
  const [pcolor,setPcolor] = useState("");
  const multiplierRef = useRef(multiplier);

  const totalColorsLeft = Object.values(color).reduce((sum, list) => sum + list.length, 0);
  //parse thoght the key of the object and pass a reducer to calculate the list of every color
  const isGameOver = totalColorsLeft === 0; //state

function randomSelection(){
  setColor((currentColor) => { //set color
  
  const group = Object.entries(currentColor); //[Group, [colour]]

  const validGroups = group.filter(([, list]) => list.length > 0); 
  //filter through every color in the list which list.length >0

  if (validGroups.length === 0 ){ //if = 0
    setAutos(false); //set the auto state to 0

    return currentColor; //return the current color object
  } 
  let randomGroupNo= Math.floor(Math.random()* validGroups.length); 
  //generate number from the group.length

  const [groupName, groupColors] = validGroups[randomGroupNo]; 
  //declare a constant of group name / group color 

  let randomColorNo = Math.floor(Math.random()* groupColors.length); //generate number from the color.length

  let pickedColor = groupColors[randomColorNo]; //pick color from the color array *

  setPcolor(pickedColor) //store value 

  //taking the group x list from the object
  const updatedList = currentColor[groupName]

  const filteredList = updatedList.filter((c) => c !== pickedColor);
  // filter out the color 

  
  if (filteredList.length === 0) {//if the list.length is 0

      const { [groupName]: _, ...remainingGroups } = currentColor
      //remove set key value group from current color

      return remainingGroups;//update 
  }
  else return {
    ...currentColor, [groupName] : filteredList //update all the set color
  };
});  
}

function handleReset (){

  setColor({...colorConfigs});

  setAutos(false);

  setPcolor("");
}

function handleMainButtonClick() {

  if (isGameOver) {

    handleReset();

  } else {

    setAutos(!auto); // Toggle Start/Stop
  }
}

function handleChange(num: number) {
  setMultiplier(num); 
  multiplierRef.current = multiplier;
}

// 2. Let useEffect handle the timer logic
useEffect(() => {

  // Only start if auto is ON

  if (!auto) return; 

  let id : (number|undefined);

  // Start new timer
  const run = () => {

    randomSelection();

    const delay = 5000 / multiplierRef.current;

    id = window.setTimeout(run, delay);
  };

  const firstDelay = 5000 / multiplierRef.current;

  id = window.setTimeout(run, firstDelay);

  console.log(isGameOver);

  // CLEANUP: React automatically runs this before the next effect runs  

  return () => window.clearTimeout(id);
    
}, [auto]); // <--- Dependencies trigger the restart

  return (

    <div className="min-h-screen bg-[#1a1a1a] text-white grid grid-cols-1 lg:grid-cols-3 items-start overflow-hidden">
      <div className="lg:col-span-1 flex flex-col items-start justify-start pt-12 pl-12 space-y-10">
        
        <div>
          <h2 className="text-xl font-medium mb-6 text-gray-100">Current available list are</h2>
          <div className="space-y-2 text-sm text-gray-400 font-sans">
            {Object.entries(color).map(([groupName, list]) => (
              <p key={groupName}>
                <span className="text-gray-500">{groupName}:</span> {list.length > 0 ? list.join(", ") : "Empty"}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-base text-gray-300">Select Your multiplier : {multiplier}</p>
          <div className="flex gap-4">
            {multiplierList.map((m) => (
              <button
                key={m}
                onClick={() => handleChange(m)}
                className={`w-12 h-10 rounded flex items-center justify-center font-bold transition-all ${
                  multiplier === m
                    ? "bg-red-600 text-white" 
                    : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:row-span-2 h-screen flex flex-col items-center justify-center">
        
        <div
          id="box-border"
          className="border-4 border-dashed border-yellow-400 w-72 h-36 flex items-center justify-center transition-all duration-300"
        >
          <div
            id="box"
            className="w-full h-full"
            style={{ backgroundColor: pcolor ? pcolor : "transparent" }}
          ></div>
        </div>

        <button
          id="submit"
          className={`mt-12 px-6 py-3 rounded bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all ${
            auto ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleMainButtonClick()}
          disabled={auto}
        >
          {auto ? "Ongoing" : isGameOver ? "Reset" : "Press to start"}
        </button>
      </div>

    </div>
  );
}
export default App