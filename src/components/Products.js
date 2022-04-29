import { data } from "../Data";
import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox } from "@mui/material";


export default function Products() {
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
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
