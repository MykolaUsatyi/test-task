import Table from './Table/Table';

function App() {
  const data = {
    columns: [
      {
        type: "string",
        filtering: true,
        sorting: true,
        style: { color: 'red' }
      },
      {
        type: "number",
        filtering: true,
        sorting: true,
        style: {}
      },
      {
        type: "string",
        filtering: false,
        sorting: true,
        style: { fontSize: '14px' }
      }
    ],
    cells: [
      {
        value: 'John',
        style: { fontWeight: 'bold' }
      },
      {
        value: 44,
        style: {}
      },
      {
        value: 'Cell 3',
        style: {}
      },
      {
        value: 'Jack',
        style: {}
      },
      {
        value: 55,
        style: {}
      },
      {
        value: 'Cell 6',
        style: { fontSize: '16px' }
      }
    ]
  };

  return (
    <Table data={data} />
  );
}

export default App;
