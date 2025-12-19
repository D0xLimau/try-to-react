import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const multiplierList = [0.5,1,2,50]

const colorConfigs = {
    "Group 1": ["yellow","red","orange","pink"],
    "Group 2": ["black","brown","grey","purple"],
    "Group 3": ["blue","aqua","violet","navy"],
    "Group 4": ["green","skyblue","lime","chocolate"],
  };

function App() {
  const [multiplier, setMultiplier] = useState()
  
function arrayScrambler (){
  const sample1 : string[] = colorConfigs["Group 1"];
  const sample2 : string[] = colorConfigs["Group 2"];
  const sample3 : string[] = colorConfigs["Group 3"];
  const sample4 : string[] = colorConfigs["Group 4"];

  let list = sample1.concat(sample2,sample3,sample4);

  let updatedList : string[] = [...list];
    for (let i :number = list.length -1 ; i > 0; i --){
      let j: number = Math.floor(Math.random()*(i + 1));
      let temp = updatedList[i];
      updatedList[i] = updatedList[j];
      updatedList[j] = temp;
    }
  return alert(updatedList);
}

// function multiplier(){
  //rate of change of screen color
// }

function updateMultipler(){ 
  //setMultiplier()
}

  
  return (
    <>
      <h1>Sample Text</h1>
      <h2>Multiplier speed = {multiplier}</h2>
      <button id="a" onClick={updateMultipler}>{multiplierList[0]}</button>
      <button id="b" onClick={updateMultipler}>{multiplierList[1]}</button>
      <button id="c" onClick={updateMultipler}>{multiplierList[2]}</button>
      <button id="d" onClick={updateMultipler}>{multiplierList[3]}</button>
      <div>
      <button onClick={arrayScrambler}>Press to Start</button>
      </div>
    </>
  )
}

export default App
