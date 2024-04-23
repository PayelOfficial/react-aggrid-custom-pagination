import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useMemo, useState } from 'react';
import { useEffect } from 'react';

const AgGridTable = () => {
  const [rowData, setRowData] = useState([]);
  const pageSize = 10;

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 200,
    };
  }, [rowData]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Body', field: 'body' },
    { headerName: 'User ID', field: 'userId' },
    {
      field: 'ID',
      minWidth: 100,
      editable: true,
      cellRenderer: function (params) {
        console.log('params', params);
        return params?.data?.id;
      },
    },
  ]);

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    if (gridApi) {
      const dataSource = {
        getRows: (params) => {
          // Use startRow and endRow for sending pagination to Backend
          // params.startRow : Start Page
          // params.endRow : End Page

          const page = params.endRow / pageSize;
          fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`
          )
            .then((resp) => resp.json())
            .then((res) => {
              console.log('res', res);
              params.successCallback(res, res.total);
              setRowData(res);
            })
            .catch((err) => {
              params.successCallback([], 0);
            });
        },
      };

      gridApi.setDatasource(dataSource);
    }
  }, [gridApi]);

  return (
    <div className='ag-theme-alpine' style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowModelType={'infinite'}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={pageSize}
        cacheBlockSize={pageSize}
        rowHeight={60}
      />
    </div>
  );
};

export default AgGridTable;
