import { useEffect, useState } from 'react';
import { parseISO, differenceInSeconds } from 'date-fns';
import { Clock } from 'lucide-react';

interface Props {
  dateFin: string;
}

export function EnchereTimer({ dateFin }: Props) {
  const [secondes, setSecondes] = useState(() =>
    Math.max(0, differenceInSeconds(parseISO(dateFin), new Date()))
  );

  useEffect(() => {
    if (secondes <= 0) return;
    const interval = setInterval(() => {
      setSecondes((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondes]);

  const h = Math.floor(secondes / 3600);
  const m = Math.floor((secondes % 3600) / 60);
  const s = secondes % 60;
  const expired = secondes === 0;

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-bold ${expired ? 'text-red-600' : 'text-blue-700'}`}>
      <Clock size={20} />
      {expired
        ? 'Enchère terminée'
        : `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`}
    </div>
  );
}
