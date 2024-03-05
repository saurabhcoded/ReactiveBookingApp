import { MoreVert, VideoCall } from "@mui/icons-material";
import { Box, Button, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import React from "react";

const DataTable = ({ rows, cols }) => {
  return (
    <>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    /> */}
              </TableCell>
              {cols.map((col) => (
                <TableCell key={col.label}>{col.label}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row) => {
                const isSelected = false;
                return (
                  <TableRow hover key={row.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(service.id);
                            } else {
                              onDeselectOne?.(service.id);
                            }
                          }}
                        /> */}
                    </TableCell>
                    {cols.map((col) => {
                      switch (col.type) {
                        case "datehour":
                          return <TableCell key={col.key}>{moment(row[col.key]).calendar()}</TableCell>;
                        case "eval":
                          return <TableCell key={col.key}>{eval(`row?.${col.key.split(".").join("?.")}`)}</TableCell>;
                        case "conflink":
                          let MetaData = JSON.parse(row?.metadata);
                          return (
                            <TableCell key={col.key}>
                              <Button target="_blank" href={MetaData?.zoomData?.start_url} size="small" variant="contained" color="primary" startIcon={<VideoCall />}>
                                Join&nbsp;Zoom&nbsp;Admin
                              </Button>
                            </TableCell>
                          );
                        default:
                          return <TableCell key={col.key}>{row[col.key]}</TableCell>;
                      }
                    })}
                    <TableCell>
                      <IconButton>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination component="div" count={count} onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange} page={page} rowsPerPage={rowsPerPage} rowsPerPageOptions={[5, 10, 25]} /> */}
    </>
  );
};

export default DataTable;
