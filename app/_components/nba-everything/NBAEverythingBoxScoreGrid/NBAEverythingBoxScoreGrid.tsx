'use client';
import { AgGridReact as NBAEverythingStatGrid } from 'ag-grid-react';
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  ValueFormatterParams,
  themeQuartz,
} from 'ag-grid-community';
import { useNBAEverythingStore } from '@/app/_store';
import { NBABoxScoreShort, NBAPlayerStat } from '@/types';

ModuleRegistry.registerModules([AllCommunityModule]);

const getFormattedStatValue = ({
  isPercentage,
  statData,
}: {
  isPercentage?: boolean;
  statData: ValueFormatterParams<NBABoxScoreShort | NBAPlayerStat>;
}) => {
  const statValue = isPercentage ? statData.value * 100 : statData.value;
  const percentSymbol = isPercentage ? '%' : '';
  return statData.value === 'DNP' ? 'DNP' : `${statValue.toFixed(1)}${percentSymbol}`;
};

type NBAEverythingBoxScoreGridProps = {
  containerStyles: string;
  isLoading?: boolean;
  isPlayerSeasonStats?: boolean;
  rowData?: NBABoxScoreShort[] | NBAPlayerStat[];
  rowHeight?: number;
};

function NBAEverythingBoxScoreGrid({
  containerStyles,
  rowData,
  isLoading,
  isPlayerSeasonStats,
  rowHeight,
}: NBAEverythingBoxScoreGridProps) {
  const { selectedMode, setSelectedMode } = useNBAEverythingStore();

  const gridHeaderTheme = themeQuartz.withParams({
    headerHeight: '30px',
    headerTextColor: selectedMode !== 'dark' ? '#6b7280' : 'black',
    headerBackgroundColor: selectedMode !== 'dark' ? '#e5e7eb' : '#6b7280',
    headerCellHoverBackgroundColor: 'lightgrey',
    headerCellMovingBackgroundColor: 'rgb(80, 40, 140)',
  });

  const statColumns: ColDef<NBABoxScoreShort | NBAPlayerStat>[] = [
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

  const playerStatColumns: ColDef<NBAPlayerStat | NBABoxScoreShort>[] = [
    {
      field: 'player',
      headerName: 'Player',
      valueGetter: params => {
        const player = params.data?.player;
        if (isPlayerSeasonStats && typeof player !== 'string') {
          return `${player?.last_name}, ${player?.first_name}`;
        }
        return player;
      },
      pinned: 'left',
      filter: 'agTextColumnFilter',
    },
    { field: 'min', headerName: 'MIN', sort: 'desc', width: 85 },
    { field: 'pts', headerName: 'PTS', width: 85 },
    {
      field: 'ppg',
      headerName: 'PPG',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'apg',
      headerName: 'APG',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'rpg',
      headerName: 'RPG',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'orpg',
      headerName: 'ORPG',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'drpg',
      headerName: 'DRPG',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'spg',
      headerName: 'SPG',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'bpg',
      headerName: 'BPG',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'topg',
      headerName: 'TO',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ statData }),
    },
    {
      field: 'fgPct',
      headerName: 'FG%',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ isPercentage: true, statData }),
    },
    {
      field: 'fg3Pct',
      headerName: '3P%',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ isPercentage: true, statData }),
    },
    {
      field: 'ftPct',
      headerName: 'FT%',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ isPercentage: true, statData }),
    },
    {
      field: 'effectiveFgPct',
      headerName: 'eFG%',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ isPercentage: true, statData }),
    },
    {
      field: 'trueFgPct',
      headerName: 'TS%',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ isPercentage: true, statData }),
    },
    {
      field: 'usgRate',
      headerName: 'USG%',
      width: 85,
      valueFormatter: statData => getFormattedStatValue({ isPercentage: true, statData }),
    },
  ];

  return (
    <div className={containerStyles}>
      <NBAEverythingStatGrid
        columnDefs={isPlayerSeasonStats ? playerStatColumns : statColumns}
        defaultColDef={{ sortable: true }}
        loading={isLoading}
        rowData={rowData}
        rowHeight={rowHeight || 36}
        rowStyle={{ backgroundColor: selectedMode !== 'dark' ? '#EDEFF0' : '#868FA3' }}
        suppressMultiSort
        theme={gridHeaderTheme}
      />
    </div>
  );
}

export default NBAEverythingBoxScoreGrid;
