import axios from 'axios';

const API_BASE = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights';
const HEADERS = {
  'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
  'x-rapidapi-key': 'c469437a04msh85d2cbf128fab0cp181540jsnce54e063c290',
};

export const searchAirports = async (query: string) => {
  const res = await axios.get(`${API_BASE}/searchAirport`, {
    params: { query, locale: 'en-US' },
    headers: HEADERS,
  });
  return res.data.data;
};

export const getNearbyAirports = async (lat: number, lng: number) => {
  const res = await axios.get(`${API_BASE}/getNearByAirports`, {
    params: { lat, lng, locale: 'en-US' },
    headers: HEADERS,
  });
  return res.data.data;
};

export const searchFlights = async (fromEntityId: string, toEntityId: string, date: string) => {
  const res = await axios.get(`${API_BASE}/searchFlights`, {
    params: {
      fromEntityId,
      toEntityId,
      departDate: date,
      returnDate: '',
      cabinClass: 'economy',
      adults: '1',
      currency: 'INR',
      locale: 'en-GB',
    },
    headers: HEADERS,
  });
  return res.data.data.flights;
};

export const getFlightDetails = async (token: string) => {
  const res = await axios.get(`${API_BASE}/getFlightDetails`, {
    params: { token, locale: 'en-GB' },
    headers: HEADERS,
  });
  return res.data.data;
};
