import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, TextField, Typography } from "@mui/material";

const data = {
  id: "root",
  name: "Products",
  children: [
    {
      id: "1",
      name: "Watches",
    },
    {
      id: "3",
      name: "Mobiles",
      children: [
        {
          id: "4",
          name: "Brands",
          children: [
            {
              id: "5",
              name: "Apple",
              children: [
                {
                  id: "7",
                  name: "iPhone-6",
                  children: [
                    {
                      id: "9",
                      name: "128GB",
                    },
                    {
                      id: "10",
                      name: "256GB",
                    },
                    {
                      id: "11",
                      name: "512GB",
                    },
                  ],
                },
                {
                  id: "8",
                  name: "iPhone-7",
                  children: [
                    {
                      id: "12",
                      name: "128GB",
                    },
                    {
                      id: "13",
                      name: "256GB",
                    },
                    {
                      id: "14",
                      name: "512GB",
                    },
                  ],
                },
              ],
            },
            {
              id: "6",
              name: "Samsung",
            },
          ],
        },
      ],
    },
  ],
};

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
