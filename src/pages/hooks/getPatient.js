import { useQuery } from '@tanstack/react-query';
import { getPatient } from '../api/getPatient';

export default function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatient
  });
}
