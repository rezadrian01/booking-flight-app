import { FlighSeat, TypeSeat } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSeatPerClass = (flightId: string) => {
  const SEAT_CLASS: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { seatNumber: string, type: TypeSeat, flightId: string }[] = [];

  for (const className of SEAT_CLASS) {
    for (const seat of SEAT_CODE) {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seatNumber: seat + i,
          type: className as TypeSeat,
          flightId
        })
      }
    }
  }

  return seats;
}

export const dateFormat = (date: Date | string, format: string = 'DD MMM YYYY HH:mm') => {
  if (!date) return '';

  const dateformat = dayjs(date).format(format);

  return dateformat;
}

export const rupiahFormat = (value: number) => {
  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);
}

export const mappingSeats = (seats: FlighSeat[]) => {
  const totalSeatEconomy = seats.filter(seat => seat.type === 'ECONOMY').length;
  const totalSeatBusiness = seats.filter(seat => seat.type === 'BUSINESS').length;
  const totalSeatFirst = seats.filter(seat => seat.type === 'FIRST').length;

  const totalBookedEconomy = seats.filter(seat => seat.type === 'ECONOMY' && seat.isBooked).length;
  const totalBookedBusiness = seats.filter(seat => seat.type === 'BUSINESS' && seat.isBooked).length;
  const totalBookedFirst = seats.filter(seat => seat.type === 'FIRST' && seat.isBooked).length;

  return {
    totalBookedEconomy,
    totalBookedBusiness,
    totalBookedFirst,
    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst
  }
}