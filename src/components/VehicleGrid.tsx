import React from 'react';
import Box from "@mui/material/Box";
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams, GridRowSpacingParams} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import {Avatar, Link, Tooltip} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export interface Vehicle {
  id: number,
  photo: string,
  car: { name: string, url: string | null },
  year: number,
  price: number,
  dayPrice: { price: number, discount: number },
  weekPrice: { price: number, discount: number },
  monthPrice: { price: number, discount: number },
  deliveryPrice: { price: number, freeIf: string },
  available: number,
  notAvailable: number,
  activeListing: boolean,
  color: string,
  tripCount: number,
  numberOfFavorites: number,
  numberOfReviews: number,
  isMyCar: boolean,
}

interface vehicleTableProps {
  data: Vehicle[]
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
  }

  const weekPriceColProps = {
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={`${params.row.weekPrice.discount}%`}>
        <span>{params.row.weekPrice.price}</span>
      </Tooltip>
    ),
  }

  const monthPriceColProps = {
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={`${params.row.monthPrice.discount}%`}>
        <span>{params.row.monthPrice.price}</span>
      </Tooltip>
    ),
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
  }

  const isMyCarColProps = {
    renderCell: (params: GridRenderCellParams) => (
      params.row.isMyCar ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon />
    ),
  }

  const activeListingColProps = {
    renderCell: (params: GridRenderCellParams) => (
      params.row.activeListing ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon color="error" />
    ),
  }

  const columns: GridColDef[] = [
    { field: 'photo', headerName: 'Фото', ...photoColProps, },
    { field: 'car', headerName: 'Модель', ...carColProps },
    { field: 'year', headerName: 'Рік', },
    { field: 'isMyCar', headerName: 'Наша машина', ...isMyCarColProps},
    { field: 'price', headerName: 'Ціна', },
    { field: 'dayPrice', headerName: 'Ціна за 3 дні', ...dayPriceColProps },
    { field: 'weekPrice', headerName: 'Ціна за 7 днів', ...weekPriceColProps },
    { field: 'monthPrice', headerName: 'Ціна за 1 місяць', ...monthPriceColProps },
    { field: 'deliveryPrice', headerName: 'Ціна доставки', ...deliveryPriceColProps },
    { field: 'notAvailable', headerName: 'Була зайнята', },
    { field: 'available', headerName: 'Була вільна', },
    { field: 'color', headerName: 'Колір', },
    { field: 'activeListing', headerName: 'Лістинг активний', ...activeListingColProps},
    { field: 'tripCount', headerName: 'Поїздки', },
    { field: 'numberOfFavorites', headerName: 'Кількість лайків', },
    { field: 'numberOfReviews', headerName: 'Кількість оцінок', },
  ];
  return (
    <>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: 'center', mt: 3, md: 3, mb: 2 }}
      >
        Статистика хоста
      </Typography>

      <Box sx={{
        height: 500,
        width: '90%',
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
