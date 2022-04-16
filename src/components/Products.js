import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, Stack, TextField, Typography } from "@mui/material";

const DeviceVariants = ({ title }) => (
  <Stack sx={{ fontSize: "18px" }}>
    {title}
    <Typography variant="subtitle2">200 + devices</Typography>
  </Stack>
);

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
                      name: <DeviceVariants title="128" />,
                    },
                    {
                      id: "10",
                      name: <DeviceVariants title="256" />,
                    },
                    {
                      id: "11",
                      name: <DeviceVariants title="512" />,
                    },
                  ],
                },
                {
                  id: "8",
                  name: "iPhone-7",
                  children: [
                    {
                      id: "12",
                      name: <DeviceVariants title="128" />,
                    },
                    {
                      id: "13",
                      name: <DeviceVariants title="256" />,
                    },
                    {
                      id: "14",
                      name: <DeviceVariants title="512" />,
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
