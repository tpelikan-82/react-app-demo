// import ListGroup from './components/ListGroup';
import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

 

function App() {

 const items = [ 'Prague', 'Brno', 'Olomouc' ];

const handleSelectedItem = (item: string) => { console.log(item); };

  // return  <div><Alert >children test <span>with complex structure</span></Alert></div>

  // return <div>
  //   <ListGroup heading='Cities' items={items} onSelectItem={handleSelectedItem} /></div>;

  const [visibleALert, isVisibleAlert] = useState(false);

  return <div>
    {visibleALert && <Alert onClose={()=> isVisibleAlert(false)}>baf</Alert>}
    <Button color="primary" onClick={()=> isVisibleAlert(true)} >My Button</Button> 
    </div>

}

export default App;

