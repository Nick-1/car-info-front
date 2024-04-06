import React from 'react';
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import {Avatar} from "@mui/material";

export interface Vehicle {
  id: number,
  photo: string,
  car: string,
  year: number,
  price: number,
  dayPrice: { price: number, discount: number },
  weekPrice: { price: number, discount: number },
  monthPrice: { price: number, discount: number },
  deliveryPrice: number,
  available: number,
  notAvailable: number,
  activeListing: string,
  color: string,
  tripCount: number,
  numberOfFavorites: number,
  numberOfReviews: number,
  url: string,
}

interface vehicleTableProps {
  data: Vehicle[]
}

const VehicleTable: React.FC<vehicleTableProps> = ({ data }) => {
  const columns = [
    { field: 'photo', headerName: 'Фото', width: 90, renderCell: (params: any) => <Avatar src={params.row.photo} />, sortable: false, filterable: false },
    { field: 'car', headerName: 'Машина', },
    { field: 'year', headerName: 'Рік', },
    { field: 'price', headerName: 'Ціна', },
    { field: 'dayPrice', headerName: 'Ціна за 3 дні', renderCell: (params: any) => params.row.dayPrice.price },
    { field: 'weekPrice', headerName: 'Ціна за 7 днів', renderCell: (params: any) => params.row.weekPrice.price},
    { field: 'monthPrice', headerName: 'Ціна за 1 місяць', renderCell: (params: any) => params.row.monthPrice.price},
    { field: 'deliveryPrice', headerName: 'Ціна доставки', },
    { field: 'notAvailable', headerName: 'Була зайнята', },
    { field: 'available', headerName: 'Була вільна', },
    { field: 'color', headerName: 'Колір', },
    { field: 'activeListing', headerName: 'Лістинг активний', },
    { field: 'tripCount', headerName: 'Поїздки', },
    { field: 'numberOfFavorites', headerName: 'Кількість лайків', },
    { field: 'numberOfReviews', headerName: 'Кількість оцінок', },
  ];


  return (
    <Box sx={{
      height: 400,
      width: '100%',
    }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, md: 3 }}
      >
        Статистика хоста
      </Typography>

      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default VehicleTable;
