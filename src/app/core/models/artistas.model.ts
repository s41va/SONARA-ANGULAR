export interface Artista {
  id: number; // Mapeado de 'id' en SQL
  nombre: string;
  generoId: number | null; // Mapeado de 'genero_id', el signo | null por el 'SET NULL' del SQL
  votosRanking: number; // Mapeado de 'votos_ranking' (default 0)
  
  // Campos de metadatos o API
  ultimaSincronizacion?: Date | string; // Mapeado de 'ultima_sincronizacion'
  
  // Campos opcionales (Transient en tu entidad Java)
  biografia?: string;
  foto?: string;
  web?: string;
}