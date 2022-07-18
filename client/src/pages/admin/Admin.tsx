import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";

import AdminLayout from "components/AdminLayout/AdminLayout";
import { useNavigate } from "react-router";
import usePageViews from "hooks/usePageViews";
import axios from "axios";
import { AdminContainer } from "./AdminStyles";

const Admin = () => {
  const navigate = useNavigate();
  const pathname = usePageViews();

  // const handleGetRegistrants = async () => {
  //   await axios.post(
  //     `${process.env.API_URL}/api/zoom/webinar/registrants/86713732649/fetch`,
  //     {
  //       email: "eric.kim@parksystems.com",
  //       nation: "famt",
  //     },
  //   );
  // };
  return (
    <AdminContainer>
      <AdminLayout title={`${pathname.toUpperCase()} admin`}>
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            startIcon={<EventNoteTwoToneIcon />}
            sx={{ color: "#fff" }}
            onClick={() => {
              navigate(`program`);
            }}
          >
            program
          </Button>
          <Button
            variant="contained"
            startIcon={<CampaignTwoToneIcon />}
            sx={{ color: "#fff" }}
            onClick={() => {
              navigate("speakers");
            }}
          >
            speakers
          </Button>
          <Button
            variant="contained"
            startIcon={<PeopleAltTwoToneIcon />}
            sx={{ color: "#fff" }}
            onClick={() => {
              navigate("users");
            }}
          >
            users
          </Button>
          {/* <Button
            variant="contained"
            sx={{ color: "#fff" }}
            onClick={handleGetRegistrants}
          >
            getRegistrants
          </Button> */}
        </Stack>

        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </AdminLayout>
    </AdminContainer>
  );
};

export default Admin;
