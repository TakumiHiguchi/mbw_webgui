import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function SimpleTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.label.map((data) => 
                            <TableCell>{data}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.rows.map((row) => (
                    <TableRow key={row[0]}>
                        <TableCell component="th" >{row.title}</TableCell>
                        <TableCell align="left">{row.typeString}</TableCell>
                        <TableCell align="left">{row.statusString}</TableCell>
                        <TableCell align="right">
                            {row.status === 1 &&
                                <Button variant="contained" color="primary" style={{margin:'0 10px'}} onClick={() => props.action.click(row.status,row.key)}>
                                    編集する
                                </Button>
                            }
                            {row.status === 3 &&
                                <Button variant="contained" color="primary" style={{margin:'0 10px'}} onClick={() => props.action.click(row.status,row.key)}>
                                    編集する
                                </Button>
                            }
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}