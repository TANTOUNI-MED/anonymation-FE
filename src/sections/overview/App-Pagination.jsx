// AppPagination.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

const AppPagination = ({ searchResults }) => {
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};



return (
    <TableContainer component={Paper}>
    <Table aria-label="custom pagination table">
        <TableBody>
        {(rowsPerPage > 0
            ? searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : searchResults
        ).map((fileName, index) => (
            <TableRow key={index}>
            <TableCell component="th" scope="row">
            {(page * rowsPerPage) + index + 1}. {fileName}
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
        <TableFooter>
        <TableRow>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={1}
            count={searchResults.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
                inputProps: {
                'aria-label': 'rows per page',
                },
                native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableRow>
        </TableFooter>
    </Table>
    </TableContainer>
);
};

AppPagination.propTypes = {
searchResults: PropTypes.array.isRequired,
};

export default AppPagination;
