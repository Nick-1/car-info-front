import { useState, useEffect } from 'react';

import {api} from "../api/axios";

export const useVerifyToken = (token: string | null) => {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.post('/auth/validate', { token });
        setIsValid(response.data.isValid);
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsValid(false);
      }
      setIsLoading(false);
    };

    if (token) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  return { isValid, isLoading };
};
