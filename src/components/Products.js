import { useReducer } from "react";
import { data } from "../Data";
import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Button, Checkbox } from "@mui/material";

const initialState = {
  counter:1000,
  counter1:2000
};
const reducer=(state,action)=>{
  console.log("counter",state.counter)
  console.log("counter1", state.counter1)
switch(action.type){
  case "ADD": 
  return {...state,counter:initialState.counter * action.value}
  case "ADD1":
    return{...state,counter1:initialState.counter1 * action.value}
  // case "SUB":
  // return {counter:initialState.counter - action.value}
  // case "MULTI":
  // return state*2
  // case "DIVI":
  // return state/2 
  default:
  return state
}
  }

export default function Products() {
  
  const [state,dispatch] = useReducer(reducer,initialState)
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
    <h1>{`Price: Rs. ${initialState.counter}`}</h1>
    <h1>{`Price: Rs. ${initialState.counter1}`}</h1>
    {state.counter !==0? <h2>{`Discounted Price: Rs. ${initialState.counter -state.counter}  after ${state.counter/100*10}% discount`}</h2>:""}
    {state.counter1 !==0? <h2>{`Discounted Price: Rs. ${initialState.counter1 -state.counter1}  after ${state.counter1/100*10}% discount`}</h2>:""}

    <Button onClick={()=>dispatch({type:"ADD", value:0.1})}>10% discount</Button>
    <Button onClick={()=>dispatch({type:"ADD", value:0.15})}>15% discount</Button>
    <Button onClick={()=>dispatch({type:"ADD", value:0.20})}>20% discount</Button>
    <Button onClick={()=>dispatch({type:"ADD", value:0.25})}>25% discount</Button>
    <Button onClick={()=>dispatch({type:"ADD1", value:0.1})}>25% discount1</Button>
    <Button onClick={()=>dispatch({type:"ADD1", value:0.15})}>25% discount1</Button>

    {state !== initialState && state.counter !== 0  ? <Button  onClick={()=>dispatch({type:"ADD", value:0})}>Reset</Button>:""}

      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<Checkbox />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<Checkbox />}
        sx={{ height: "auto", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTree(data)}
      </TreeView>
      {/* <Typography variant="h6">Selected Variants</Typography>
      <TextField /> */}
    </>
  );
}
