import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
} from "@mui/material";
import axios from "axios";
import {
  anarkali,
  kurta,
  blouse,
  bridesmaids,
  lehanga,
  palazzo,
} from "../../../../../../../commonVariables/commonVariables";

const ShowFriends = ({
  setHasFriends,
  hasFriends,
  selected,
  formID,
  friends,
  setFriends,
}) => {
  let id = selected;
  useEffect(() => {
    const getFriends = async () => {
      if (selected)
        await axios.post("/api/friend/get", { id }).then((res) => {
          setHasFriends(true);
          setFriends(res.data);
          res.data.map((friend) => {
            const inches = friend.measurements.height % 12;
            const feet = (friend.measurements.height - inches) / 12;
            const newHeight = `${feet}'${inches}''`;
            friend.measurements.height = newHeight;
          });
        });
    };
    getFriends();
  }, [selected]);

  let formToProcess = "";
  if (formID == "Kurta") formToProcess = kurta;
  if (formID == "Anarkali") formToProcess = anarkali;
  if (formID == "Blouse") formToProcess = blouse;
  if (formID == "Bridesmaids") formToProcess = bridesmaids;
  if (formID == "Palazzo") formToProcess = palazzo;
  if (formID == "Lehanga") formToProcess = lehanga;
  return (
    <>
      {hasFriends ? (
        friends.length ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{
                          fontWeight: "600",
                          fontSize: "15px",
                          textAlign: "center",
                        }}
                      >
                        Name
                      </Typography>
                    </TableCell>
                    {Object.keys(formToProcess) ? (
                      Object.keys(formToProcess).map((measurement) => {
                        return (
                          <>
                            <TableCell variant="head">
                              <Typography
                                variant="p"
                                component="div"
                                sx={{
                                  fontWeight: "600",
                                  fontSize: "15px",
                                  textAlign: "center",
                                }}
                              >
                                {measurement}
                              </Typography>
                            </TableCell>
                          </>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {friends.map((friend) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <Typography
                              variant="p"
                              component="div"
                              sx={{ fontSize: "13px", textAlign: "center" }}
                            >
                              {friend.name}
                            </Typography>
                          </TableCell>
                          {delete friend.measurements["_id"]}
                          {Object.keys(formToProcess).map((key) => {
                            return (
                              <>
                                <TableCell>
                                  <Typography
                                    variant="p"
                                    component="div"
                                    sx={{
                                      fontSize: "13px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {friend.measurements[formToProcess[key].db]}
                                  </Typography>
                                </TableCell>
                              </>
                            );
                          })}
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>Seems like there are no submissions here yet.</>
        )
      ) : (
        <>Nothing to show...</>
      )}
    </>
  );
};

export default ShowFriends;
