import { useState,useRef,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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
  const [color, setColor] = useState(colorConfigs);
  const [auto, setAutos] = useState(false);
  const intervalRef = useRef<number| null>(null);
  const [pcolor,setPcolor] = useState("");
  const totalColorsLeft = Object.values(color).reduce((sum, list) => sum + list.length, 0);
  const isGameOver = totalColorsLeft === 0;

function randomSelection(){
   setColor((currentColor) => {
  
  const group = Object.entries(currentColor); //[Group, [colour]]
  const validGroups = group.filter(([, list]) => list.length > 0);
  console.log(validGroups)
  if (validGroups.length === 0 ){
    console.log("empty")
    setAutos(false);
    return currentColor;
  } 
  let randomGroupNo= Math.floor(Math.random()* validGroups.length); 
  //generate number from the group.length
  const [groupName, groupColors] = validGroups[randomGroupNo]; //pick a random group
  let randomColorNo = Math.floor(Math.random()* groupColors.length); 
  //generate number from the color.length
  let pickedColor = groupColors[randomColorNo]; //pick color from the color array *
  console.log([groupName,groupColors])
  setPcolor(pickedColor)
  //alert(`${pickedColor} is been removed!`);
  console.log(`${pickedColor} is removed`)
  console.log(intervalRef)
    const updatedList = currentColor[groupName]
    const updatedList2 = updatedList.filter((c) => c !== pickedColor);
    console.log (updatedList2)
    if (updatedList2.length === 0) {
        const { [groupName]: _, ...remainingGroups } = currentColor
        return remainingGroups;
    }
    else return {
      ...currentColor, [groupName] : updatedList2 
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
useEffect(() => {
      let intervalId: number | null = null;
    if (auto && !isGameOver) {
      intervalId = window.setInterval(randomSelection, 5000 / multiplier);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [auto, multiplier, isGameOver]);

// function autoRemove(){
//   setAutos(true);
//  randomSelection();
//  intervalRef.current = window.setInterval(()=> {
//   randomSelection();},5000/multiplier);
//  }

//  function stopAutoRemove() {
//     if (intervalRef.current !== null) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     setAutos(false);

//   }

// useEffect(() => {
//     return () => {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const totalColors = Object.values(color).reduce((sum, list) => sum + list.length, 0);
//     if (totalColors === 0 && auto) {
//       stopAutoRemove();
//     }
//   }, [color, auto]);

  // function handleChange(num: number){
  //   setMultiplier(num);
  //    intervalRef.current = window.setInterval(()=> {
  // randomSelection();},5000/multiplier);
  // }

  // 1. Just update state when clicking
function handleChange(num: number) {
  setMultiplier(num); 
}

// 2. Let useEffect handle the timer logic
useEffect(() => {
  // Only start if auto is ON
  if (!auto) return; 

  // Start new timer
  const id = window.setInterval(() => {
    randomSelection();
  }, 5000 / multiplier); // <--- React sees 'multiplier' changed and restarts this

  // CLEANUP: React automatically runs this before the next effect runs
  return () => window.clearInterval(id);

}, [multiplier, auto]); // <--- Dependencies trigger the restart
// function flatten(obj:object) {
//   // 1. Create ONE shared bucket for results
//   const result = {}; //create new container

//   // 2. Create a helper function that accepts the current item and the current path
//   const step = (currentValue:any, currentPath:any) => { //let step = function for
    
//     // Iterate over keys
//     for (const key in currentValue) { //for each key in 
//       const value = currentValue[key]; 
      
//       // Calculate the new path (e.g., "user" -> "user.address")
//       // If we have a path, join with dot; otherwise just use the key.
//       const newKey = currentPath ? `${currentPath}.${key}` : key;

//       // 3. Type Check & Recursion
//       // Check if it's an Object and NOT null (null is technically an object in JS)
//       if (typeof value === 'object' && value !== null) {
        
//         // RECURSION: Dive deeper, passing the new path
//         step(value, newKey);
        
//       } else {
//         // BASE CASE: It's a primitive. Write to the shared bucket.
//         result[newKey] = value;
//       }
//     }
//   };

//   // Start the process with the root object and an empty path
//   step(obj, "");

//   return result;
// };
// function randomScrambler (obj:object){
// }
  // const sample1 : string[] = colorConfigs["Group 1"];
  // const sample2 : string[] = colorConfigs["Group 2"];
  // const sample3 : string[] = colorConfigs["Group 3"];
  // const sample4 : string[] = colorConfigs["Group 4"];

  // let list = sample1.concat(sample2,sample3,sample4);
  // let list = colorConfigs.forEach(element => {
  //   console.log()
  // });
 
  // let updatedList : string[] = [...list];
  //   for (let i :number = list.length -1 ; i > 0; i --){
  //     let j: number = Math.floor(Math.random()*(i + 1));
  //     let temp = updatedList[i];
  //     updatedList[i] = updatedList[j];
  //     updatedList[j] = temp;

// function multiplier(){
  //rate of change of screen color
// }


// function updateMultipler(){ 
//   setMultiplier();

// }
  return (
    <>  
      <div>
        <p className={"text-4xl font-bold ml-1"}>Current available list are</p>
      </div>
        <div id="center" className="border-5 border-dashed border-yellow-400 mb=50">
          <div className=' w-3xl'
          //style={auto?{ backgroundColor: pcolor }:[background-color : transparent] }
          style={{ backgroundColor: pcolor ? pcolor : "transparent" }}
          >
            <br></br>
              <p className='text-transparent'>a</p>
            <br></br>
          </div>
        </div>
      <div>
      <h2>Multiplier speed = {multiplier}</h2>
      </div>
      <div className="left-0">
      <button id="0.5" onClick={() => handleChange(multiplierList[0])}>{multiplierList[0]}</button>
      <button id="1" onClick={() => handleChange(multiplierList[1])}>{multiplierList[1]}</button>
      <button id="2" onClick={() => handleChange(multiplierList[2])}>{multiplierList[2]}</button>
      <button id="5" onClick={() => handleChange(multiplierList[3])}>{multiplierList[3]}</button>
      </div>
        <div>
          {Object.entries(color).map(([groupName, list])=> <p>{groupName}: {list.length > 0 ? list.join(", "):""}</p>)}
        </div>
      <div>
      <button onClick={() => handleMainButtonClick()} disabled={auto}>
        {auto?"Ongoing":(isGameOver?"Reset":"Press to start")}</button>
      </div>
      <div>
        {`is in auto? ${auto}`};
      </div>
    </>
  );
}

export default App

//mp transparent