import { useState } from "react";

interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}


function ListGroup({ items, heading, onSelectItem}: Props) {

   
   
    // Hook
    const [selectedIndex, setSelectedIndex ] = useState(-1);
    // arr[0]        // variable selectedIndex
    // arr[1]        // update function

   const message = items.length === 0 && <p>empty</p>;

    return (
    <>
    <h1>{heading}</h1>
    {message}
    <ul className="list-group">
         {items.map((item, index) => <li 
            className={ selectedIndex === index ? "list-group-item active" : "list-group-item"  }  
            key={item} 
            onClick={ () => { 
               setSelectedIndex(index);
               onSelectItem(item);
             }}
            >{item}</li>)}
    </ul>
    </>
    );
}

export default ListGroup;