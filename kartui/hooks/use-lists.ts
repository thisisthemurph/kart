import { useSQLiteContext } from "expo-sqlite";

export interface ListModel {
    id: number;
    name: string;
}

export interface ListItemModel {
    id: number;
    list_id: number;
    category_id: string | null;
    name: string;
    purchased: boolean;
}

const useLists = () => {
    const db = useSQLiteContext();

    const getList = async (listId: number) => {
        return await db.getFirstAsync<ListModel>("SELECT * FROM lists WHERE id = ?;", [listId]);
    }

    const getListByName = async (name: string) => {
        return await db.getFirstAsync<ListModel>("SELECT * FROM lists WHERE name = ?;", [name]);
    }

    const getLists = async () => {
        return await db.getAllAsync<ListModel>("SELECT * FROM lists;");
    }

    const getListItems = async (listId: number) => {
        return await db.getAllAsync<ListItemModel>("SELECT * FROM list_items WHERE list_id = ?;", [listId]);
    }

    const createList = async (name: string): Promise<ListModel> => {
        const res = await db.runAsync("INSERT INTO lists (name) VALUES (?);", [name]);
        const createdList = await getList(res.lastInsertRowId);
        if (!createdList) throw new Error("Failed to create list");
        return createdList;
    }

    const updateListName = async (listId: number, name: string): Promise<ListModel> => {
        await db.runAsync("UPDATE lists SET name = ? WHERE id = ?;", [name, listId])
        const list = await getList(listId);
        if (!list) throw new Error("Failed to update list");
        return list;
    }

    return {
        getList,
        getListByName,
        getLists,
        createList,
        getListItems,
        updateListName
    }
}

export default useLists;
