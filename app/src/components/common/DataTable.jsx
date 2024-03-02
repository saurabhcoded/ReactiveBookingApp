import { Card } from "@mui/material";
import { Scrollbar } from "@/components/layout/scrollbar";
import { getInitials } from "@/utils/common";
import { Avatar, Box, Card, Checkbox, Container, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

const DataTable = ({ rows }) => {
  return (
    <Card variant="outlined">
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Signed Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((service) => {
                const isSelected = false;
                const createdAt = moment(service.createdAt).format("dd/MM/yyyy");
                return (
                  <TableRow hover key={service.id} selected={isSelected}>
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
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={service.avatar}>{getInitials(service.name)}</Avatar>
                        <Typography variant="subtitle2">{service.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{service.email}</TableCell>
                    <TableCell>
                      {service.address.city}, {service.address.state}, {service.address.country}
                    </TableCell>
                    <TableCell>{service.phone}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination component="div" count={count} onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange} page={page} rowsPerPage={rowsPerPage} rowsPerPageOptions={[5, 10, 25]} /> */}
    </Card>
  );
};

export default DataTable;
