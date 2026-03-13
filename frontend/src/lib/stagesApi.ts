// API client para stages

const API_URL = '/api/stages';

// Función para obtener el token de Supabase
async function getSupabaseToken(): Promise<string | null> {
  const { supabase } = await import('./supabase')
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token || null
}

async function fetchStagesApi<T>(
  options: RequestInit = {}
): Promise<T> {
  const token = await getSupabaseToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error desconocido');
  }

  return data;
}

// Funciones de stages
export const stagesApi = {
  // Obtener todos los stages
  getAll: () =>
    fetchStagesApi<any[]>({
      method: 'GET',
    }),
};
