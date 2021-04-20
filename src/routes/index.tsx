import React from 'react';
import { NavigationContainer, StackRouter } from '@react-navigation/native';

import StackRoutes from './stack.routes'

const Routes = () => (
    <NavigationContainer>
        <StackRoutes />
    </NavigationContainer>
)

export default Routes;