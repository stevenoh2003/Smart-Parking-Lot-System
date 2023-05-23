import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./api";

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data);
}

export function useParkingspaces() {
  const [parkingspaces, setParkingspaces] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAPIData().then((items) => {
      if (mounted) {
        setParkingspaces(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return [parkingspaces, setParkingspaces];
}
