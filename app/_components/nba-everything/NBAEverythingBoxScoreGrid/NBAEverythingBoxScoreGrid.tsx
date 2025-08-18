'use client';
import { AgGridReact as NBAEverythingStatGrid } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';

import { NBABoxScoreShort } from '@/types';

ModuleRegistry.registerModules([AllCommunityModule]);

const statColumns: ColDef<NBABoxScoreShort>[] = [
  { field: 'player', pinned: 'left', filter: 'agTextColumnFilter' },
  { field: 'min', headerName: 'MIN', sort: 'desc', width: 85 },
  { field: 'pts', headerName: 'PTS', width: 85 },
  { field: 'ast', headerName: 'AST', width: 85 },
  { field: 'reb', headerName: 'REB', width: 85 },
  { field: 'stl', headerName: 'STL', width: 85 },
  { field: 'blk', headerName: 'BLK', width: 85 },
  { field: 'fg%', headerName: 'FG%', width: 85 },
  { field: '3p%', headerName: '3P%', width: 85 },
  { field: 'to', headerName: 'TO', width: 85 },
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
