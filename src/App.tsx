import './App.css'
import { useBoundPersistStore, useBoundStore } from './store/slices';

function App() {
  const { bears, addBear, fishes, eatFish, addFish, addFishNum } = useBoundStore();
  const {userId, setUserId} = useBoundPersistStore();

  return (
    <>
      <div style={{display: "flex"}}>
        <div>Bears: {bears}</div>
        <button onClick={addBear}>Add Bear</button>
      </div>
      <div style={{display: "flex"}}>
        <div>Fishes: {fishes}</div>
        <button onClick={addFish}>Add Fish</button>
        <button onClick={() => addFishNum(2)}>Add Fish 2</button>
        <button onClick={eatFish}>Eat Fish</button>
      </div>
      <div style={{display: "flex"}}>
        <div>User Id: {userId}</div>
        <button onClick={() => setUserId(34)}>Set User id 34</button>
      </div>
    </>
  )
}

export default App
