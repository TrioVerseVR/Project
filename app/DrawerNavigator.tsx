import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@/app/(tabs)/index';
import ExploreScreen from '@/app/(tabs)/explore';
import DetailedScreen from '@/app/(tabs)/DetailedScreen';
import CardDetailsPage from './(tabs)/CardDetailsPage';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="DetailedScreen" component={DetailedScreen} />
      <Drawer.Screen name="Explore" component={ExploreScreen} />
    </Drawer.Navigator>
  );
}
