import React from 'react';
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRenderCellParams,
  GridRowSpacingParams,
} from "@mui/x-data-grid";
import {Avatar, Link, Tooltip} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {VehicleGrid} from "./toGridMapper.ts";

interface vehicleTableProps {
  data: VehicleGrid[]
}

const VehicleTable: React.FC<vehicleTableProps> = ({ data }) => {
  const dataGridStyles = () => ({
    [`& .${gridClasses.columnHeader}`]: {
      fontWeight: 'bold',
    },
    [`& .${gridClasses.row}`]: {
      bgcolor: '#eee',
    },
  });

  const rowSpacingStyle = (params: GridRowSpacingParams) => ({
    top: params.isFirstVisible ? 0 : 3,
    bottom: params.isLastVisible ? 0 : 3
  })

  const photoColProps = {
    width: 90,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
          <Avatar src={params.row.photo} />
        </Box>
      )
    },
    sortable: false,
    filterable: false,
  }

  const dayPriceColProps: Partial<GridColDef> = {
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={`${params.row.dayPrice.discount}%`}>
        <span>{params.row.dayPrice.price}</span>
      </Tooltip>
    ),
    valueGetter: (params: any) => {
      return params.price
    },
  }

  const weekPriceColProps = {
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={`${params.row.weekPrice.discount}%`}>
        <span>{params.row.weekPrice.price}</span>
      </Tooltip>
    ),
    valueGetter: (params: any) => {
      return params.price
    },
  }

  const monthPriceColProps = {
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={`${params.row.monthPrice.discount}%`}>
        <span>{params.row.monthPrice.price}</span>
      </Tooltip>
    ),
    valueGetter: (params: any) => {
      return params.price
    },
  }

  const deliveryPriceColProps = {
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row.deliveryPrice.freeIf}>
        <span>{params.row.deliveryPrice.price}</span>
      </Tooltip>
    ),
  }

  const carColProps = {
    renderCell: (params: GridRenderCellParams) => {
      if (params.row.car.url) {
        return (
          <Link href={params.row.car.url} target="_blank" rel="noopener noreferrer">
            {params.row.car.name}
          </Link>
        )
      }

      return <span>{params.row.car.name}</span>
    },
    valueGetter: (params: any) => {
      return params.name
    },
  }

  // const isMyCarColProps = {
  //   renderCell: (params: GridRenderCellParams) => (
  //     params.row.isMyCar ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon />
  //   ),
  // }

  const activeListingColProps = {
    renderCell: (params: GridRenderCellParams) => (
      params.row.activeListing ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon color="error" />
    ),
  }

  const columns: GridColDef[] = [
    { field: 'photo', headerName: 'Photo', ...photoColProps},
    { field: 'car', headerName: 'Model', ...carColProps, },
    { field: 'year', headerName: 'Year', },
    // { field: 'isMyCar', headerName: 'Наша машина', ...isMyCarColProps},
    { field: 'price', headerName: 'Price', },
    { field: 'dayPrice', headerName: '3 days price', ...dayPriceColProps },
    { field: 'weekPrice', headerName: '7 days price', ...weekPriceColProps },
    { field: 'monthPrice', headerName: '1 month price', ...monthPriceColProps },
    { field: 'deliveryPrice', headerName: 'Delivery price', ...deliveryPriceColProps },
    { field: 'notAvailable', headerName: 'Rented days', },
    { field: 'listingCreatedTime', headerName: 'Listing Created Time', },
    { field: 'color', headerName: 'Color', },
    { field: 'activeListing', headerName: 'Listing Enable', ...activeListingColProps},
    { field: 'tripCount', headerName: 'Trip count', },
    { field: 'numberOfFavorites', headerName: 'Likes count', },
    { field: 'numberOfReviews', headerName: 'Reviews Count', },
    { field: 'state', headerName: 'State', },
  ];
  return (
    <>
      <Box sx={{
        height: 600,
        width: '100%',
        mt: 3,
      }}>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          getRowSpacing={(params) => rowSpacingStyle(params)}
          sx={dataGridStyles()}
        />
      </Box>
    </>
  );
};

export default VehicleTable;
