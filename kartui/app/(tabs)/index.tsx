import PageContainer from "@/components/page-container";
import P from "@/components/paragraph";
import useLists, {ListModel} from "@/hooks/use-lists";
import {useEffect, useState} from "react";
import Button from "@/components/button";
import {View} from "react-native";
import {Link, useRouter} from "expo-router";

export default function Index() {
  const router = useRouter();
  const { getListByName, getLists, createList } = useLists();
  const [lists, setLists] = useState<ListModel[]>([]);

  useEffect(() => {
      getLists().then(data => setLists(data));
  }, [getLists])

  /**
   * Creates a new list in the database with a blank name and then navigates to that list.
   */
  async function handleCreateList() {
    const existingList = await getListByName("");
    if (existingList) {
      router.navigate({
        pathname: "/list/[list_id]",
        params: { list_id: existingList.id }
      })
      return;
    }

    const newList = await createList("");
    router.navigate({
      pathname: "/list/[list_id]",
      params: { list_id: newList.id }
    })
  }

  return (
    <PageContainer>
      <P>Your shopping lists:</P>
      <P>There are {lists.length} lists in the database!</P>
      <Button title="Create a new list" onPress={handleCreateList} />

      <View>
        {lists.map(list => (
          <Link key={list.id} href={{pathname: "/list/[list_id]", params: {list_id: list.id}}} style={{padding: 8}}>
            <P>{list.name}</P>
          </Link>))}
      </View>
    </PageContainer>
  );
}
