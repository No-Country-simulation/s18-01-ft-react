import { RoomList } from './RoomList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs';

export const RoomModalTabs = ({ rooms }) => {
  return (
    <Tabs defaultValue="all" className="max-h-full overflow-hidden px-4">
      <TabsList className="mb-3 mt-4">
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="active">Activas</TabsTrigger>
        <TabsTrigger value="inactive">Inactivas</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <RoomList rooms={rooms} />
      </TabsContent>
      <TabsContent value="active">
        <RoomList rooms={rooms} />
      </TabsContent>
      <TabsContent value="inactive">
        <RoomList rooms={[]} />
      </TabsContent>
    </Tabs>
  );
};
