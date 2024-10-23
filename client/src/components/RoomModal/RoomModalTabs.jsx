import { TabListItem, Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs';

export const RoomModalTabs = ({ rooms }) => {
  return (
    <Tabs defaultValue="all" className="max-h-full overflow-hidden px-4">
      <TabsList className="mb-3 mt-4">
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="active">Activas</TabsTrigger>
        <TabsTrigger value="inactive">Inactivas</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <TabListItem items={rooms} isRoom={true} />
      </TabsContent>
      <TabsContent value="active">
        <TabListItem
          items={rooms.filter(
            item => Array.isArray(item.users) && item.users.length > 0
          )}
          isRoom={true}
        />
      </TabsContent>
      <TabsContent value="inactive">
        <TabListItem
          items={rooms.filter(
            item => Array.isArray(item.users) && item.users.length === 0
          )}
          isRoom={true}
        />
      </TabsContent>
    </Tabs>
  );
};
