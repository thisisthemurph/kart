import {TextInput, View, StyleSheet, Pressable, Text} from "react-native";
import useTheme, {ShadcnTheme} from "@/hooks/use-theme";
import Button from "@/components/button";
import {useEffect, useState} from "react";
import useLists, {ListModel, ListItemModel} from "@/hooks/use-lists";
import {useLocalSearchParams} from "expo-router";

export default function ManageListPage() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const s = createListSectionStyles(theme);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ListModel | undefined>();
  const [items, setItems] = useState<ListItemModel[]>([]);
  const [listName, setListName] = useState<string>("");

  const { list_id } = useLocalSearchParams();
  const { getList, getListItems, updateListName } = useLists();

  const addItemButtonDisabled = list?.name.length === 0;

  useEffect(() => {
    if (list !== undefined)
      return;

    if (typeof list_id !== "string")
      throw new Error("List id must be a string");

    setLoading(true);
    const listId = parseInt(list_id, 10);
    getList(listId)
      .then((list) => {
        if (!list) {
          return null;
        }

        setList(list);
        setListName(list.name);

        return list.id;
      })
      .then((listId) => {
        if (!listId) {
          return;
        }

        getListItems(listId).then(setItems);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [getList, list, list_id, getListItems]);

  async function handleUpdateListName() {
    if (!list) return;
    const updatedList = await updateListName(list.id, listName);
    setListName(updatedList.name);
    setList(updatedList);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          onChangeText={setListName}
          placeholder="Name this list"
          value={listName}
        />
        {listName.length > 0 && listName !== list?.name && (
          <Pressable onPress={handleUpdateListName}>
            <Text>Save</Text>
          </Pressable>)}
      </View>
      <View style={styles.content}>
        <View style={s.container}>
          <View style={s.header}>
            <Text style={s.heading}>Uncategorized</Text>
          </View>
          {loading && (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
          {!loading && items.length === 0 && (
            <View style={s.body}>
              <Text>There are no items</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <Button title={`Add item to list ${list_id}`} disabled={addItemButtonDisabled} />
      </View>
    </View>
  )
}

function createListSectionStyles(t: ShadcnTheme) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 8,
    },
    header: {
      padding: 8,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      backgroundColor: "#eee",
    },
    heading: {
      padding: 8,
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
    },
    body: {
      padding: 8,
    }
  })
}

function createStyles(t: ShadcnTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.card,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#ddd",
    },
    content: {
      flex: 1,
      padding: 16,
    },
    footer: {
      padding: 16,
      backgroundColor: "#eee",
    },
    input: {
      fontSize: 18,
      fontWeight: "bold",
    },
  })
}
