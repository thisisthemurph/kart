import { ThemeProvider } from "@/hooks/use-theme";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite"
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="kart.db" onInit={initializeDatabase} options={{ useNewConnection: false }}>
      <ThemeProvider>
        <Stack>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="list/[list_id]" options={{ headerShown: true, title: "Create a new list" }} />
       </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  )
}

async function initializeDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys=ON;
    
    --DROP TABLE IF EXISTS list_items;
    --DROP TABLE IF EXISTS lists;
    --DROP TABLE IF EXISTS categories;

    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS list_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      list_id INTEGER NOT NULL,
      category_id INTEGER,
      name TEXT NOT NULL,
      purchased BOOLEAN NOT NULL DEFAULT false,
      
      FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE,
      FOREIGN KEY(category_id) REFERENCES categories ON DELETE SET NULL
    );
  `)
}
