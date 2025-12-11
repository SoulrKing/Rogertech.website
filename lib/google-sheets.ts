import { google } from 'googleapis';

// Configuração do cliente Google Sheets
function getGoogleSheetsClient() {
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
  const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

  if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_SHEET_ID) {
    console.warn('Google Sheets credentials not configured. Using fallback data.');
    return null;
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  return { sheets, GOOGLE_SHEET_ID };
}

// Função genérica para ler dados de uma aba
export async function readSheet(sheetName: string): Promise<any[]> {
  const client = getGoogleSheetsClient();
  
  if (!client) {
    return [];
  }

  try {
    const { sheets, GOOGLE_SHEET_ID } = client;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${sheetName}!A:Z`,
    });

    const rows = response?.data?.values ?? [];
    
    if (rows.length === 0) {
      return [];
    }

    // Primeira linha são os headers
    const headers = rows[0]?.map((h: any) => String(h ?? '').toLowerCase()) ?? [];
    
    // Converter linhas em objetos
    const data = rows.slice(1).map((row: any[]) => {
      const obj: any = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row?.[index] ?? '';
      });
      return obj;
    });

    return data;
  } catch (error) {
    console.error(`Error reading sheet ${sheetName}:`, error);
    return [];
  }
}

// Função para escrever dados em uma aba (append)
export async function appendToSheet(sheetName: string, values: any[][]): Promise<boolean> {
  const client = getGoogleSheetsClient();
  
  if (!client) {
    console.warn('Cannot append to sheet - credentials not configured');
    return false;
  }

  try {
    const { sheets, GOOGLE_SHEET_ID } = client;
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return true;
  } catch (error) {
    console.error(`Error appending to sheet ${sheetName}:`, error);
    return false;
  }
}
