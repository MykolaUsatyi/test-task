import React from 'react';
import { nanoid } from 'nanoid';
import './Table.css';

const ASC = 'asc';
const DESC = 'desc';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    const { columns, cells } = props.data;
    const initialFilters = {};
    const initialSorting = {};

    columns.forEach((column, index) => {
      initialFilters[index] = '';
      initialSorting[index] = ASC;
    });

    this.state = {
      filters: initialFilters,
      sorting: initialSorting
    };

    const result = this.prepareData(cells, columns);
    this.columns = columns;
    this.result = result;
    this.filteredResult = result;
  }

  render() {
    return (
      <div className="table">
        <div className="table-thead">
          {this.columns.map((column, index) => {
              return (
                <div className="table-th" key={index}>
                  {column.filtering &&
                    <input value={this.state.filters[index]} onChange={e => this.updateFilterValue(e, index)} />
                  }

                  {column.sorting &&
                    <span onClick={() => this.updateSortingValue(index)}>
                      {this.state.sorting[index]}
                    </span>
                  }
                </div>
              )
          })}
        </div>
        <div className="table-tbody">
          {this.filteredResult.map((row) => {
              return (
                <div className='table-tr' key={row.id}>
                  {row.data.map((cell, index) => {
                      return (
                        <div className='table-td' key={index} style={cell.style}>
                          {cell.value}
                        </div>
                      )
                  })}
                </div>
              )
          })}
        </div>
      </div>
    );
  }

  prepareData(cells, columns) {
    const result = [];
    let row = [];
    let columnIndex = 0;

    cells.forEach((cell, index) => {
      const columnStyles = columns[columnIndex] && columns[columnIndex].style;
      const cellStyles = cell && cell.style;

      row.push({
        ...cell,
        style: { ...columnStyles, ...cellStyles }
      });

      columnIndex++;

      if ((index + 1) % columns.length === 0) {
        result.push({
          id: nanoid(),
          data: row
        });
        row = [];
        columnIndex = 0;
      }
    });

    return result;
  }

  updateFilterValue(event, columnIndex) {
    const filterValue = event.target.value;

    this.setState({
      filters: { ...this.state.filters, [columnIndex]: event.target.value }
    });

    this.filteredResult = this.result.filter(row => {
      const columnValue = ''+row.data[columnIndex].value;
      return columnValue.toUpperCase().includes(filterValue.toUpperCase());
    });
  }

  updateSortingValue(columnIndex) {
    const currentSorting = this.state.sorting[columnIndex];
    const appliedSorting = currentSorting === ASC ? DESC : ASC;

    this.setState({
      sorting: { ...this.state.sorting, [columnIndex]: appliedSorting }
    });

    this.filteredResult = [...this.filteredResult].sort((a, b) => {
      const aValue = a.data[columnIndex].value;
      const bValue = b.data[columnIndex].value;

      if (this.columns[columnIndex].type === 'number') {
        return currentSorting === ASC ? bValue - aValue : aValue - bValue;
      } else {
        const aString = aValue.toUpperCase();
        const bString = bValue.toUpperCase();

        if (aString < bString) {
          return currentSorting === ASC ? -1 : 1;
        }

        if (aString > bString) {
          return currentSorting === ASC ? 1 : -1;
        }

        return 0;
      }
    });
  }
};
