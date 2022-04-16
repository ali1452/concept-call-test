import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";

const DeviceVariants = ({ title }) => (
  <Stack sx={{ fontSize: "18px" }}>
    <FormControlLabel
      label={title}
      control={
        <Checkbox value={title} onChange={(e) => console.log(e.target.value)} />
      }
    />
    <Typography variant="subtitle2">200 + devices</Typography>
  </Stack>
);

export const data = {
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
