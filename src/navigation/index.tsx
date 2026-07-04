import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@navigation/stacks/RootStack';

const Route = () => {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
};

export default Route;