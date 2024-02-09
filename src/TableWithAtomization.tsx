import { AtomMut } from '@reatom/core'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { reatomComponent } from '@reatom/npm-react'
import { atomizedRows } from './data'

const Cell = reatomComponent<TableCellProps & { atom: AtomMut }>(
  ({ ctx, atom, ...tableCellProps }) => (
    <TableCell {...tableCellProps}>
      <TextField
        value={ctx.spy(atom)}
        onChange={(e) => atom(ctx, e.currentTarget.value)}
        label={tableCellProps.children}
        variant="standard"
      />
    </TableCell>
  ),
  'Cell',
)

export const TableWithAtomization = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {atomizedRows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <Cell atom={row.calories} align="right">
                calories
              </Cell>
              <Cell atom={row.fat} align="right">
                fat
              </Cell>
              <Cell atom={row.carbs} align="right">
                carbs
              </Cell>
              <Cell atom={row.protein} align="right">
                protein
              </Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
