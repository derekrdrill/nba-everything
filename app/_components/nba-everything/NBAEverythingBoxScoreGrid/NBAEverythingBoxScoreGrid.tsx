'use client';
import { AgGridReact as NBAEverythingStatGrid } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';

import { NBABoxScoreShort } from '@/types';

ModuleRegistry.registerModules([AllCommunityModule]);

const statColumns: ColDef<NBABoxScoreShort>[] = [
  { field: 'player', pinned: 'left', filter: 'agTextColumnFilter' },
  { field: 'min', headerName: 'MIN', sort: 'desc' },
  { field: 'pts', headerName: 'PTS' },
  { field: 'ast', headerName: 'AST' },
  { field: 'reb', headerName: 'REB' },
  { field: 'stl', headerName: 'STL' },
  { field: 'blk', headerName: 'BLK' },
  { field: 'fg%', headerName: 'FG%' },
  { field: '3p%', headerName: '3P%' },
  { field: 'to', headerName: 'TO' },
];

type NBAEverythingBoxScoreGridProps = {
  containerStyles: string;
  rowData?: NBABoxScoreShort[];
};

function NBAEverythingBoxScoreGrid({ containerStyles, rowData }: NBAEverythingBoxScoreGridProps) {
  return (
    <div className={containerStyles}>
      <NBAEverythingStatGrid
        columnDefs={statColumns}
        defaultColDef={{ sortable: true }}
        rowData={rowData}
      />
    </div>
  );
}

export default NBAEverythingBoxScoreGrid;
