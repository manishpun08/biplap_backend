import { v4 as uuidv4 } from 'uuid';

// Function to generate a 16-character ID
export const generateId = () => {
  return uuidv4().replace(/-/g, '').substring(0, 16);
};

export async function checkValidation(table_name, column_name) {
  try {
    const query = `SELECT * FROM ${table_name} WHERE ${column_name} = ?`;
    const [rows, fields] = await connection.query(query, [column_name]);
    return rows.length > 0; // Returns true if rows are found (charity exists), otherwise false
  } catch (error) {
    console.error('Error checking charity existence:', error);
    return false; // Return false in case of any error
  }
}
